'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAxios } from '@/app/hooks/useAxios'
import { EditModal } from './edit-modal'

interface TeamMember {
  _id: string
  name: string
  experience: string
  title: string
  image: {
    url: string
    public_id: string
  }
}

export function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [newMember, setNewMember] = useState({
    name: '',
    title: '',
    experience: '',
  })
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const axios = useAxios()

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('/team')
      setTeamMembers(data)
    } catch (err) {
      setError('Failed to fetch team members'+err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData()
      if (selectedFile) {
        formData.append('image', selectedFile)
      }
      Object.entries(newMember).forEach(([key, value]) => {
        formData.append(key, value)
      })

      await axios.post('/team', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      
      fetchTeamMembers()
      setNewMember({ name: '', title: '', experience: '' })
      setSelectedFile(null)
    } catch (err) {
      setError('Failed to save team member'+err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (member: TeamMember, file: File | null) => {
    const formData = new FormData()
    if (file) {
      formData.append('image', file)
    }
    Object.entries(member).forEach(([key, value]) => {
      if (key !== 'image' && key !== '_id') {
        formData.append(key, value)
      }
    })

    await axios.put(`/team/${member._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    fetchTeamMembers()
  }

  const handleDelete = async (_id: string) => {
    setIsLoading(true)
    try {
      await axios.delete(`/team/${_id}`)
      fetchTeamMembers()
    } catch (err) {
      setError('Failed to delete team member'+err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !teamMembers.length) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Tabs defaultValue="view" className="w-full">
        <TabsList>
          <TabsTrigger value="view">View Team Members</TabsTrigger>
          <TabsTrigger value="add">Add New Member</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <Card key={member._id}>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={member.image.url} 
                    alt={member.name} 
                    className="w-full h-48 object-cover mb-2 rounded" 
                  />
                  <p className="text-sm font-semibold mb-1">{member.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.experience} years of experience</p>
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => {
                      setEditingMember(member)
                      setIsModalOpen(true)
                    }}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(member._id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="add">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newMember.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience (years)</Label>
              <Input
                id="experience"
                name="experience"
                value={newMember.experience}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Team Member'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <EditModal
        member={editingMember}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingMember(null)
        }}
        onSave={handleSave}
      />
    </>
  )
}

