import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Paper } from "@/types/paper"

interface QuestionPaperCardProps {
  paper: Paper;
  onViewImages: () => void;
}

export function QuestionPaperCard({ paper, onViewImages }: QuestionPaperCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{paper.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-2">{paper.description}</p>
        <div className="space-y-1">
          <p className="text-sm"><strong>Category:</strong> {paper.category}</p>
          <p className="text-sm"><strong>Grade:</strong> {paper.class}</p>
          <p className="text-sm"><strong>Subject:</strong> {paper.subject}</p>
          <p className="text-sm"><strong>Year:</strong> {paper.year}</p>
          <p className="text-sm"><strong>Downloads:</strong> {paper.downloads}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onViewImages}>
          View Images
        </Button>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  )
}

