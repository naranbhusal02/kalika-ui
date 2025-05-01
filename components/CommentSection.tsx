'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from 'lucide-react'
import type { Comment } from '@/lib/blogData'

interface CommentSectionProps {
  comments: Comment[]
}

export function CommentSection({ comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Guest User',
      content: newComment,
      date: new Date().toISOString(),
      likes: 0
    }

    setComments([...comments, comment])
    setNewComment('')
  }

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ))
  }

  return (
    <div className="mt-12 space-y-8">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleAddComment}>Post Comment</Button>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{comment.author}</h3>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
              <button
                onClick={() => handleLike(comment.id)}
                className="mt-2 flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600"
              >
                <Heart className="h-4 w-4" />
                <span>{comment.likes} likes</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

