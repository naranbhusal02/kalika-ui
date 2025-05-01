"use client"

import { useState, useEffect, useCallback } from "react"
import BlogCard from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useAxios } from "@/app/hooks/useAxios"
import Image from "next/image"


interface blog{
  _id: string
  titles: Array<{ text: string; order: number }>
  contents: Array<{ text: string; order: number }>
  images: Array<{ url: string; order: number }>
  tags: string[]
  likes: string[]
}
interface pagination{
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}
export default function BlogList() {
  const predefinedTags = [
    "Club_Activity",
    "technology",
    "programming",
    "web development",
    "javascript",
    "react",
    "nextjs",
    "tutorial",
    "coding",
    "software",
    "development",
  ]
  const [blogs, setBlogs] = useState<blog[]>([])
  const [pagination, setPagination] = useState<pagination | null>(null)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  // const [pagination, setPagination] = useState<pagination|null>(null)
  const [loading, setLoading] = useState(true)
  const axios = useAxios()

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      const tagsQuery = selectedTags.length ? `&tags=${selectedTags.join(",")}` : ""
      const searchParam = searchQuery ? `&search=${searchQuery}` : ""
      const { data } = await axios.get(`/blog?page=${page}${tagsQuery}${searchParam}`)
      setBlogs(data.data.blogs)
      setPagination(data.data.pagination)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  },[page,searchQuery,selectedTags])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const toggleTag = (tag:string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    setPage(1)
  }

  return (
    <div className="w-11/12 min-h-screen mx-auto py-8 space-y-8">
      {/* Header with new layout */}
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="w-[70px] flex-shrink-0">
          <Image src="/only-logo.svg" alt="logo" width={70} height={20} />
        </div>

        {/* Search Bar - centered */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPage(1)
              }}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Tags - right side */}
        <div className="flex-1 max-w-xl flex flex-wrap justify-end gap-2">
          {predefinedTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </div>

          {blogs.length === 0 && <div className="text-center text-muted-foreground py-12">No blogs found.</div>}
        </>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center gap-2 mt-8">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Button variant="outline" disabled={!pagination.hasNext} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

