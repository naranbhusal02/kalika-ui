'use client'

import { Download, FileText, Search } from 'lucide-react'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Document {
  id: number
  title: string
  titleNp?: string
  detail: string
  category: string
  date: string
  size: string
}

const documents: Document[] = [
  {
    id: 1,
    title: "Kalika Brochure 2081",
    detail: "Kalika School: Kalika Brochure 2081",
    category: "Brochures",
    date: "2024",
    size: "2.4 MB"
  },
  {
    id: 2,
    title: "School Development Plan 2081",
    titleNp: "विज्ञान प्रवर्द्धनका लागि पञ्चवर्षीय विद्यालय विकास योजना २०८१",
    detail: "Kalika School: School Development Plan",
    category: "Plans",
    date: "2024",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Academic Calendar 2081",
    titleNp: "शैक्षिक वर्ष २०८१ वार्षिक क्यालेन्डर कक्षा १० सम्म",
    detail: "Kalika School: Academic Calendar Grade 10",
    category: "Calendars",
    date: "2024",
    size: "956 KB"
  },
  {
    id: 4,
    title: "Academic Calendar 2081/82",
    titleNp: "शैक्षिक वर्ष २०८१/८२ वार्षिक क्यालेन्डर कक्षा ११ र १२",
    detail: "Kalika School: Academic Calendar Grade 11-12",
    category: "Calendars",
    date: "2024",
    size: "1.2 MB"
  },
  {
    id: 5,
    title: "Teacher Performance Evaluation 2081",
    titleNp: "शिक्षक कर्मचारी कार्यसम्पादन मूल्यांकन एवम् पुरस्कार व्यवस्थापन कार्यविधि - २०८१",
    detail: "Kalika School: Teacher Evaluation Guidelines",
    category: "Guidelines",
    date: "2024",
    size: "3.1 MB"
  }
]

export default function DownloadPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.titleNp?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.detail.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = 
      selectedCategory === "" || doc.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(documents.map(doc => doc.category)))

  return (
    <div className="min-h-screen ">
      <div className="w-10/12 mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kalika Documents and Downloads</h1>
          <p className="text-muted-foreground">
            Access and download official documents, brochures, and academic calendars
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start gap-2">
                  <FileText className="h-5 w-5 mt-1 text-primary" />
                  <div>
                    <div>{doc.title}</div>
                    {doc.titleNp && (
                      <div className="text-sm font-normal text-muted-foreground mt-1">
                        {doc.titleNp}
                      </div>
                    )}
                  </div>
                </CardTitle>
                <CardDescription>{doc.detail}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-md mr-2">
                      {doc.category}
                    </span>
                    {doc.date} • {doc.size}
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you&apos;re looking for
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

