import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

// User interface
interface User {
  _id: string;
  username: string;
  profileImage?: string;
}

// Reply interface
interface Reply {
  _id: string;
  text: string;
  author: User;
  createdAt: string;
}

// Comment interface
interface Comment {
  _id: string;
  text: string;
  author: User;
  createdAt: string;
  replies: Reply[];
}

// Props interface for Comments component
interface CommentsProps {
  comments: Comment[];
  blogId: string;
  onAddComment: (text: string) => Promise<void>;
  onAddReply: (commentId: string, text: string) => Promise<void>;
}

export default function Comments({ 
  comments, 
  // blogId, 
  onAddComment, 
  onAddReply 
}: CommentsProps) {
  const [newComment, setNewComment] = useState('')
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({})
  const [showReplyForm, setShowReplyForm] = useState<Record<string, boolean>>({})
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<{
    type: 'comment' | 'reply';
    text: string;
    commentId?: string;
  } | null>(null)

  // Handle comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // Show warning modal before submit
    setShowWarningModal(true)
    setPendingAction({
      type: 'comment',
      text: newComment
    })
  }

  // Handle reply submission
  const handleSubmitReply = (commentId: string) => {
    const text = replyText[commentId]
    if (!text || !text.trim()) return

    // Show warning modal before submit
    setShowWarningModal(true)
    setPendingAction({
      type: 'reply',
      text,
      commentId
    })
  }

  // Handle warning modal close
  const handleWarningClose = async () => {
    if (pendingAction) {
      if (pendingAction.type === 'comment') {
        await onAddComment(pendingAction.text)
        setNewComment('')
      } else if (pendingAction.type === 'reply' && pendingAction.commentId) {
        await onAddReply(pendingAction.commentId, pendingAction.text)
        setReplyText(prev => ({ ...prev, [pendingAction.commentId!]: '' }))
        setShowReplyForm(prev => ({ ...prev, [pendingAction.commentId!]: false }))
      }
    }
    setShowWarningModal(false)
    setPendingAction(null)
  }

  return (
    <div className="space-y-6">
      {/* Comment submission form */}
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[100px]"
        />
        <Button type="submit">Post Comment</Button>
      </form>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.author.profileImage} />
                <AvatarFallback>{comment.author.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{comment.author.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-2">{comment.text}</p>
                
                <div className="mt-2 flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyForm(prev => ({
                      ...prev,
                      [comment._id]: !prev[comment._id]
                    }))}
                  >
                    Reply
                  </Button>
                  
                  {comment.replies.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReplies(prev => ({
                        ...prev,
                        [comment._id]: !prev[comment._id]
                      }))}
                    >
                      {showReplies[comment._id] ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {showReplyForm[comment._id] && (
              <div className="ml-12 space-y-4">
                <Textarea
                  value={replyText[comment._id] || ''}
                  onChange={(e) => setReplyText(prev => ({
                    ...prev,
                    [comment._id]: e.target.value
                  }))}
                  placeholder="Write a reply..."
                  className="min-h-[80px]"
                />
                <Button onClick={() => handleSubmitReply(comment._id)}>
                  Post Reply
                </Button>
              </div>
            )}

            {showReplies[comment._id] && (
              <div className="ml-12 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply._id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={reply.author.profileImage} />
                      <AvatarFallback>{reply.author.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{reply.author.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="mt-2">{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <AlertDialog open={showWarningModal} onOpenChange={handleWarningClose}>
        <AlertDialogContent className="bg-slate-50">
          <AlertDialogHeader>
            <AlertDialogTitle>Important Notice</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-2">Dear student, please be aware that your activity is being monitored.</p>
              <p className="text-red-500">Any use of vulgar language or inappropriate content will result in strict disciplinary action.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}