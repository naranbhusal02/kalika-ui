'use client'

import { useState, useEffect } from 'react'
import { useAxios } from '@/hooks/useAxios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FilterSection } from '@/components/question-papers/FilterSection'
import { QuestionPaperCard } from '@/components/question-papers/QuestionPaperCard'
import { ImageViewerModal } from '@/components/question-papers/ImageViewerModal'
import { Paper, PaperResponse } from '@/types/paper'

export default function QuestionPapersPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const axios = useAxios()

  const fetchPapers = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedGrade && { class: selectedGrade }),
        ...(selectedSubject && { subject: selectedSubject }),
      })
      const response = await axios.get<PaperResponse>(`/paper?${params}`)
      setPapers(response.data.data.papers)
      setTotalPages(response.data.data.totalPages)
    } catch (err) {
      setError('Failed to fetch papers')
      console.error('Failed to fetch papers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPapers()
  }, [currentPage, search, selectedCategory, selectedGrade, selectedSubject])

  const handleViewImages = (images: Array<{ url: string }>) => {
    setSelectedImages(images.map(img => img.url))
    setIsModalOpen(true)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchPapers()
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    switch (filterType) {
      case 'category':
        setSelectedCategory(value)
        break
      case 'grade':
        setSelectedGrade(value)
        break
      case 'subject':
        setSelectedSubject(value)
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-11/12 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Question Papers</h1>
          <p className="text-gray-600">
            Browse, view, and download question papers by category, grade, and subject
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Search question papers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterSection
              title="Category"
              options={['mid-term', 'final', 'assignment']}
              value={selectedCategory}
              onChange={(value) => handleFilterChange('category', value)}
            />
            <FilterSection
              title="Grade"
              options={['10', '11', '12']}
              value={selectedGrade}
              onChange={(value) => handleFilterChange('grade', value)}
            />
            <FilterSection
              title="Subject"
              options={['Mathematics', 'Physics', 'Chemistry', 'Biology']}
              value={selectedSubject}
              onChange={(value) => handleFilterChange('subject', value)}
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl font-semibold text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl font-semibold text-red-600">{error}</p>
          </div>
        ) : papers.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-600">
              No question papers found matching your criteria
            </h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {papers.map((paper) => (
                <QuestionPaperCard 
                  key={paper._id} 
                  paper={paper} 
                  onViewImages={() => handleViewImages(paper.images)}
                />
              ))}
            </div>
            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <Button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Image Viewer Modal */}
      <ImageViewerModal
        images={selectedImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

