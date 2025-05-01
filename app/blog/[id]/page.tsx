'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAxios } from '@/app/hooks/useAxios'
import Comments from '@/components/comment-replies'

// Improved type definitions based on actual API response
interface User {
  _id: string;
  username: string;
  profileImage?: string;
}

interface BlogContent {
  _id: string;
  text: string;
  order: number;
}

interface BlogImage {
  _id: string;
  url: string;
  public_id?: string;
  order: number;
}

interface Reply {
  _id: string;
  text: string;
  user: string; // User ID string from API
  createdAt: string;
}

interface Comment {
  _id: string;
  text: string;
  user: string; // User ID string from API
  replies: Reply[];
  createdAt: string;
}

interface Blog {
  _id: string;
  titles: BlogContent[];
  contents: BlogContent[];
  images: BlogImage[];
  tags: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  author: string; // User ID string from API
  status: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Blog;
  success: boolean;
}

interface BlogPostProps {
  params: Promise<{
    id: string;
  }>;
}

interface ContentItem {
  type: 'title' | 'content' | 'image';
  order: number;
  _id: string;
  data: BlogContent | BlogImage;
}

// Simple user cache to store user data
interface UserCache {
  [userId: string]: User;
}

export default function BlogPost({ params }: BlogPostProps) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [users, setUsers] = useState<UserCache>({})
  const [authorData, setAuthorData] = useState<User | null>(null)
  const axios = useAxios()
  
  // Properly unwrap the params using React.use()
  const unwrappedParams = use(params)
  const { id } = unwrappedParams

  // Fetch blog data
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const { data } = await axios.get<ApiResponse>(`/blog/${id}`)
        if (data.success && data.data) {
          setBlog(data.data)
          
          // Check if the current user has liked the blog
          const userId = localStorage.getItem('userId')
          setIsLiked(data.data.likes.includes(userId || ''))
          
          // Fetch author data
          fetchUserById(data.data.author)
          
          // Collect unique user IDs from comments and replies
          const userIds = new Set<string>()
          userIds.add(data.data.author)
          
          data.data.comments.forEach(comment => {
            userIds.add(comment.user)
            comment.replies.forEach(reply => {
              userIds.add(reply.user)
            })
          })
          
          // Fetch user data for all users
          Array.from(userIds).forEach(userId => {
            fetchUserById(userId)
          })
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  })
  
  // Fetch user data by ID
  const fetchUserById = async (userId: string) => {
    // Skip if we already have this user's data
    if (users[userId]) return
    
    try {
      const { data } = await axios.get<{ data: User }>(`/users/${userId}`)
      setUsers(prev => ({
        ...prev,
        [userId]: data.data
      }))
      
      // If this is the author, set author data
      if (blog && userId === blog.author) {
        setAuthorData(data.data)
      }
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error)
      // Set a placeholder user if fetch fails
      setUsers(prev => ({
        ...prev,
        [userId]: { _id: userId, username: 'Unknown User' }
      }))
    }
  }

  // Handle like functionality
  const handleLike = async () => {
    try {
      await axios.post(`/blog/${id}/toggle-like`)
      setIsLiked(!isLiked)
      setBlog(prev => {
        if (!prev) return null
        const userId = localStorage.getItem('userId')
        return {
          ...prev,
          likes: isLiked 
            ? prev.likes.filter(like => like !== userId)
            : userId ? [...prev.likes, userId] : prev.likes
        }
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Handle adding comments
  const handleAddComment = async (text: string) => {
    try {
      const { data } = await axios.post<ApiResponse>(`/blog/${id}/comments`, { text })
      if (data.success && data.data) {
        setBlog(data.data)
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  // Handle adding replies
  const handleAddReply = async (commentId: string, text: string) => {
    try {
      const { data } = await axios.post<ApiResponse>(
        `/blog/${id}/comments/${commentId}/replies`, 
        { text }
      )
      if (data.success && data.data) {
        setBlog(data.data)
      }
    } catch (error) {
      console.error('Error adding reply:', error)
    }
  }

  // Loading state
  if (!blog) return (
    <div className="flex h-[50vh] items-center justify-center">
      <p className="text-lg text-muted-foreground">Loading...</p>
    </div>
  )

  // Combine and order content
  const orderedContent: ContentItem[] = [
    ...blog.titles.map(title => ({
      type: 'title' as const,
      order: title.order,
      _id: title._id,
      data: title
    })),
    ...blog.contents.map(content => ({
      type: 'content' as const,
      order: content.order,
      _id: content._id,
      data: content
    })),
    ...blog.images.map(image => ({
      type: 'image' as const,
      order: image.order,
      _id: image._id,
      data: image
    }))
  ].sort((a, b) => a.order - b.order)

  // Convert comments to the format expected by the Comments component
  const formattedComments = blog.comments.map(comment => {
    const commentAuthor = users[comment.user] || { _id: comment.user, username: 'Loading...' }
    
    return {
      _id: comment._id,
      text: comment.text,
      author: commentAuthor,
      createdAt: comment.createdAt,
      replies: comment.replies.map(reply => {
        const replyAuthor = users[reply.user] || { _id: reply.user, username: 'Loading...' }
        
        return {
          _id: reply._id,
          text: reply.text,
          author: replyAuthor,
          createdAt: reply.createdAt
        }
      })
    }
  })

  return (
    <>
      <article className="container mx-auto max-w-4xl py-8">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={authorData?.profileImage} />
              <AvatarFallback>{authorData?.username?.[0] || '?'}</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{authorData?.username || 'Loading...'}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            {orderedContent.map((item) => {
              switch (item.type) {
                case 'title':
                  return (
                    <div
                      key={item._id}
                      dangerouslySetInnerHTML={{ __html: (item.data as BlogContent).text }}
                      className="mb-6"
                    />
                  )
                case 'content':
                  return (
                    <div
                      key={item._id}
                      dangerouslySetInnerHTML={{ __html: (item.data as BlogContent).text }}
                      className="mb-4"
                    />
                  )
                case 'image':
                  return (
                    <div 
                      key={item._id} 
                      className="relative aspect-video w-full overflow-hidden rounded-lg mb-6"
                    >
                      <Image
                        src={(item.data as BlogImage).url}
                        alt="Blog image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className="gap-2"
            >
              <Heart 
                className={isLiked ? "fill-current text-red-500" : ""} 
                size={16} 
              />
              {blog.likes.length} likes
            </Button>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            <Comments
              comments={formattedComments}
              blogId={blog._id}
              onAddComment={handleAddComment}
              onAddReply={handleAddReply}
            />
          </section>

          <Link href="/blog" className="inline-block">
            <Button variant="ghost" className="gap-2">
              ← Back to Blogs
            </Button>
          </Link>
        </div>
      </article>
    </>
  )
}