'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAxios } from '@/app/hooks/useAxios'
import { Badge } from "@/components/ui/badge"
import { Image } from "lucide-react"

type Notice = {
  _id: string
  title: string
  description: string
  category: string
  image?: {
    url: string
    public_id: string
  }
}

const validCategories = ['Academics', 'Sports', 'Events', 'Holidays', 'Others']

export function NoticesManager() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [newNotice, setNewNotice] = useState<Omit<Notice, '_id'>>({
    title: '',
    description: '',
    category: '',
  })
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const axios = useAxios()

  useEffect(() => {
    fetchNotices()
    registerServiceWorker()
    subscribeToNotifications()
  }, [])

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js')
        console.log('ServiceWorker registered:', registration)
      } catch (err) {
        console.error('ServiceWorker registration failed:', err)
      }
    }
  }

  const subscribeToNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        })
        
        try {
          await axios.post('/notice/subscribe', subscription)
        } catch (err) {
          console.error('Failed to send subscription to server:', err)
        }
      }
    }
  }

  const fetchNotices = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get<Notice[]>('/notice')
      setNotices(data)
    } catch (err) {
      setError('Failed to fetch notices: ' + err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingNotice) {
      setEditingNotice({ ...editingNotice, [name]: value })
    } else {
      setNewNotice(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      if (editingNotice) {
        formData.append('title', editingNotice.title)
        formData.append('description', editingNotice.description)
        formData.append('category', editingNotice.category)
      } else {
        formData.append('title', newNotice.title)
        formData.append('description', newNotice.description)
        formData.append('category', newNotice.category)
      }
      
      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      if (editingNotice) {
        await axios.put(`/notice/${editingNotice._id}`, formData)
      } else {
        await axios.post('/notice', formData)
      }
      
      fetchNotices()
      setNewNotice({ title: '', description: '', category: '' })
      setEditingNotice(null)
      setSelectedImage(null)
    } catch (err) {
      setError('Failed to save notice: ' + err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (_id: string) => {
    setIsLoading(true)
    try {
      await axios.delete(`/notice/${_id}`)
      fetchNotices()
    } catch (err) {
      setError('Failed to delete notice: ' + err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList>
        <TabsTrigger value="view">View Notices</TabsTrigger>
        <TabsTrigger value="add">Add New Notice</TabsTrigger>
      </TabsList>
      <TabsContent value="view">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notices.map(notice => (
            <Card key={notice._id}>
              <CardHeader>
                <CardTitle>{notice.title}</CardTitle>
                <CardDescription>
                  <Badge variant="outline">{notice.category}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notice.image?.url && (
                  <div className="mb-4">
                    <img 
                      src={notice.image.url} 
                      alt={notice.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-2">{notice.description}</p>
                <div className="flex justify-end space-x-2">
                  <Button onClick={() => setEditingNotice(notice)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(notice._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="add">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={editingNotice?.title || newNotice.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={editingNotice?.description || newNotice.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={editingNotice?.category || newNotice.category}
              onValueChange={(value) => handleInputChange({ target: { name: 'category', value } } as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {validCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>
          <Button type="submit">{editingNotice ? 'Update' : 'Add'} Notice</Button>
          {editingNotice && (
            <Button type="button" variant="outline" onClick={() => setEditingNotice(null)}>Cancel Edit</Button>
          )}
        </form>
      </TabsContent>
    </Tabs>
  )
}