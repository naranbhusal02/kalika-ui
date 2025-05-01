'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useAxios } from '@/app/hooks/useAxios'

interface Notice {
  _id: string
  title: string
  description: string
  category: string
  createdAt: string
  updatedAt: string
}

export default function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [expandedNotices, setExpandedNotices] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const axios = useAxios()

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const { data } = await axios.get<Notice[]>('/notice')
      setNotices(data)
    } catch (err) {
      setError('Failed to fetch notices: ' + err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleNotice = (id: string) => {
    setExpandedNotices(prev => 
      prev.includes(id) 
        ? prev.filter(noteId => noteId !== id)
        : [...prev, id]
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academics':
        return 'bg-blue-100 text-blue-800'
      case 'Sports':
        return 'bg-green-100 text-green-800'
      case 'Events':
        return 'bg-purple-100 text-purple-800'
      case 'Holidays':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-[#1457d8] text-center mt-8">School Notices</h1>
      
      {notices.map((notice) => {
        const isExpanded = expandedNotices.includes(notice._id)
        const shouldTruncate = notice.description.length > 150

        return (
          <Card key={notice._id} className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src="/only-logo.svg"
                  alt="School Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-[#1457d8]">{notice.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(notice.createdAt)}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className={getCategoryColor(notice.category)}>
                    {notice.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {shouldTruncate && !isExpanded
                    ? `${notice.description.slice(0, 150)}...`
                    : notice.description}
                </p>
                {shouldTruncate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => toggleNotice(notice._id)}
                  >
                    {isExpanded ? (
                      <>
                        Read Less
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read More
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

