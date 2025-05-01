import Image from "next/image"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRouter } from 'next/navigation' 

interface BlogCardProps {
  _id: string
  titles: Array<{ text: string; order: number }>
  contents: Array<{ text: string; order: number }>
  images: Array<{ url: string; order: number }>
  tags: string[]
  likes: string[]
}

export default function BlogCard({ _id, titles, contents, images, tags, likes }: BlogCardProps) {
  const title = titles[0]?.text.replace(/<[^>]+>/g, "") || "Untitled"
  
  const excerpt = contents[0]?.text.replace(/<[^>]+>/g, "").substring(0, 150) + "..."
  
  const coverImage = images[0]?.url || "/placeholder.svg"
  const router = useRouter()

  return (
    <Card onClick={()=>router.push(`/blog/${_id}`)}  className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image src={coverImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-xl line-clamp-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div  className="flex items-center gap-1 text-muted-foreground">
          <Heart className="w-4 h-4" />
          <span className="text-sm">{likes.length}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

