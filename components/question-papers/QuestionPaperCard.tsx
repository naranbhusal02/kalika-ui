import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Paper } from '@/types/paper'

interface QuestionPaperCardProps {
  paper: Paper
  onViewImages: () => void
}

export function QuestionPaperCard({ paper, onViewImages }: QuestionPaperCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        {paper.images && paper.images.length > 0 ? (
          <Image
            src={paper.images[0].url}
            alt={paper.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{paper.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{paper.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">{paper.subject}</span>
            <span className="text-sm text-gray-500 ml-2">Grade {paper.class}</span>
          </div>
          <Button onClick={onViewImages}>View Images</Button>
        </div>
      </div>
    </div>
  )
}

