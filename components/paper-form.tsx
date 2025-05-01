'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useAxios } from '@/hooks/useAxios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload } from 'lucide-react'
// import { useToast }= from "@/components/ui/use-toast"

interface PreviewFile extends File {
  preview: string;
}

export function PaperForm() {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<PreviewFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const axios = useAxios()
  // const { toast } = useToast()

  // Clean up preview URLs when component unmounts
  const cleanup = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }

  // Handle file selection
  const handleFiles = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles)
      .filter(file => file.type.startsWith('image/'))
      .map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))

    setFiles(prev => [...prev, ...newFiles])
  }, [])

  // Handle file removal
  const removeFile = (fileToRemove: PreviewFile) => {
    URL.revokeObjectURL(fileToRemove.preview)
    setFiles(files => files.filter(file => file !== fileToRemove))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      
      // Remove existing files from formData (if any)
      formData.delete('images')
      
      // Append each file to formData
      files.forEach((file) => {
        formData.append('images', file)
      })

      await axios.post('/paper/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
       alert("paper posted successfully")
      // toast({
      //   title: "Success",
      //   description: "Paper posted successfully",
      // })

      // Reset form and files
      e.currentTarget.reset()
      cleanup()
      setFiles([])
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to post paper",
      //   variant: "destructive",
      // })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 scroll-auto h-96  bg-white">
      {/* Image Upload Section */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors
          ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
      >
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center p-6 space-y-2">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB each
          </p>
        </div>

        {/* Image Previews */}
        {files.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4">
            {files.map((file, index) => (
              <div key={index} className="relative group aspect-square">
                <Image
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 
                    shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                  transition-opacity rounded-lg flex items-end p-2">
                  <span className="text-white text-xs truncate w-full">
                    {file.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="mid-term">Mid Term</SelectItem>
              <SelectItem value="final">Final</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="class">Class</Label>
          <Input id="class" name="class" required />
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" required />
        </div>

        <div>
          <Label htmlFor="year">Year</Label>
          <Input 
            id="year" 
            name="year" 
            type="number" 
            min={2000}
            max={new Date().getFullYear() + 1}
            defaultValue={new Date().getFullYear()}
            required 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading || files.length === 0}>
          {loading ? "Posting..." : "Post Paper"}
        </Button>
        {files.length > 0 && (
          <p className="text-sm text-gray-500">
            {files.length} image{files.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    </form>
  )
}

