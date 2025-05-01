'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { Comment } from '@/app/types/blog'

interface CommentsProps {
  comments: Comment[];
  blogId: string;
  onAddComment: (text: string) => Promise<void>;
  onAddReply: (commentId: string, text: string) => Promise<void>;
}

export default function Comments({ comments, blogId, onAddComment, onAddReply }: CommentsProps) {
  const [newComment, setNewComment] = useState('')
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    await onAddComment(newComment)
    setNewComment('')
  }

  const handleReplySubmit = async (commentId: string) => {
    if (!replyText[commentId]?.trim()) return
    await onAddReply(commentId, replyText[commentId])
    setReplyText(prev => ({ ...prev, [commentId]: '' }))
    setReplyingTo(null)
  }

  return (
    <div className="space-y-8">
      {/* New Comment Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Add a Comment</h3>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="min-h-[100px]"
        />
        <Button onClick={handleCommentSubmit}>Post Comment</Button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={comment.user.profileImage} />
                <AvatarFallback>{comment.user?.username?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{comment.user?.username || 'Anonymous'}</h4>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="mt-1">{comment.text}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                  className="mt-2"
                >
                  Reply
                </Button>
              </div>
            </div>

            {/* Reply Form */}
            {replyingTo === comment._id && (
              <div className="ml-12 space-y-4">
                <Textarea
                  value={replyText[comment._id] || ''}
                  onChange={(e) => setReplyText(prev => ({
                    ...prev,
                    [comment._id]: e.target.value
                  }))}
                  placeholder="Write your reply..."
                />
                <Button size="sm" onClick={() => handleReplySubmit(comment._id)}>
                  Post Reply
                </Button>
              </div>
            )}

            {/* Replies */}
            {comment.replies?.length > 0 && (
              <div className="ml-12 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply._id} className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={reply.user?.profileImage} />
                      <AvatarFallback>{reply.user?.username?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{reply.user?.username || 'Anonymous'}</h4>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(reply.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="mt-1">{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
