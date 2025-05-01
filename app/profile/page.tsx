"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAxios } from '@/hooks/useAxios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PaperForm } from '@/components/paper-form'
import { MoreVertical, Trash2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'next/navigation'

// Define interfaces for our data types
interface ImageType {
  _id: string;
  url: string;
}

interface TitleType {
  _id?: string;
  text: string;
}

interface ContentType {
  _id?: string;
  text: string;
}

interface BlogType {
  _id: string;
  titles: TitleType[];
  contents: ContentType[];
  tags: string[];
  images: ImageType[];
  likes: string[];
  comments: string[];
  createdAt: string;
}

interface PaperType {
  _id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  category: string;
  year: string;
  images: ImageType[];
  downloads: number;
}

// Define the User interface to fix the TypeScript error
interface UserType {
  _id?: string;
  username?: string;
  email?: string;
  profileImage?: string;
  // Add other user properties as needed
}

export default function ProfilePage() {
  const router = useRouter()
  const [papers, setPapers] = useState<PaperType[]>([])
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [loading, setLoading] = useState(true)
  const axios = useAxios()
  const { user } = useAuthStore() as { user: UserType | null }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [papersRes, blogsRes] = await Promise.all([
          axios.get('/paper/author/6773b06119464526d7ec27d6'),
          axios.get('/blog/user/6773b06119464526d7ec27d6')
        ])
        setPapers(papersRes.data.data.papers)
        setBlogs(blogsRes.data.data.blogs)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [axios])  // Add axios to dependency array

  const handleDelete = async (type: 'paper' | 'blog', id: string) => {
    try {
      await axios.delete(`/${type}/${id}`)
      if (type === 'paper') {
        setPapers(papers.filter(paper => paper._id !== id))
      } else {
        setBlogs(blogs.filter(blog => blog._id !== id))
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error)
    }
  }

  const BlogCard = ({ blog }: { blog: BlogType }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl" dangerouslySetInnerHTML={{ __html: blog.titles[0]?.text || 'Untitled' }} />
            <CardDescription className="mt-2">
              {blog.tags.map((tag: string) => (
                <span key={tag} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDelete('blog', blog._id)} className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {blog.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {blog.images.slice(0, 2).map((image) => (
              <div key={image._id} className="relative aspect-video">
                <Image
                  src={image.url}
                  alt="Blog image"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}
        {/* <div dangerouslySetInnerHTML={{ __html: blog.contents[0]?.text || '' }} className="line-clamp-3" /> */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span>{blog.likes.length} likes</span>
          <span>•</span>
          <span>{blog.comments.length} comments</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="sm:flex sm:items-end sm:space-x-5">
          <div className="relative">
            <div className="h-24 w-24 rounded-full ring-4 ring-white bg-white sm:h-32 sm:w-32">
              <Image
                src={user?.profileImage || '/default-profile.png'}
                alt="Profile Picture"
                layout="fill"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{user?.username}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Post Paper</Button>
                </DialogTrigger>
                <DialogContent className="w-full scroll-auto bg-white">
                  <DialogHeader>
                    <DialogTitle>Post a New Paper</DialogTitle>
                  </DialogHeader>
                  <PaperForm />
                </DialogContent>
              </Dialog>
              <Button onClick={() => router.push("profile/addblogs")} variant="outline">Post Blog</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="papers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="papers">Papers</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
          <TabsContent value="papers">
            {loading ? (
              <div className="text-center py-4">Loading papers...</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                {papers.map((paper) => (
                  <Card key={paper._id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{paper.title}</CardTitle>
                          <CardDescription>{paper.description}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='bg-white'>
                            <DropdownMenuItem onClick={() => handleDelete('paper', paper._id)} className="text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {paper.images.slice(0, 2).map((image) => (
                          <div key={image._id} className="relative aspect-[4/3]">
                            <Image
                              src={image.url}
                              alt={paper.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-500">Subject: {paper.subject}</p>
                        <p className="text-sm text-gray-500">Class: {paper.class}</p>
                        <p className="text-sm text-gray-500">Category: {paper.category}</p>
                        <p className="text-sm text-gray-500">Year: {paper.year}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Download Paper ({paper.downloads} downloads)
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="blogs">
            {loading ? (
              <div className="text-center py-4">Loading blogs...</div>
            ) : (
              <div className="grid gap-4 mt-4">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}