import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface BlogCardProps {
  _id: string
  titles: Array<{ text: string; order: number }>
  contents: Array<{ text: string; order: number }>
  images: Array<{ url: string; order: number }>
  tags: string[]
  createdAt: string
}

export default function BlogCard({ _id, titles, images, tags, createdAt }: BlogCardProps) {
  return (
    <div className="group rounded-lg border p-4 transition-all hover:border-primary">
      <Link href={`/blog/${_id}`} className="space-y-4">
        {images.length > 0 && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={images[0].url}
              alt={titles[0]?.text || 'Blog image'}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>

          <h2 className="text-2xl font-semibold" dangerouslySetInnerHTML={{ __html:titles[0]?.text }}
          >
            {/* {titles[0]?.text.replace(/<\/?p>/g, '') || 'Untitled'} */}
          </h2>

          {/* <p className="text-muted-foreground">
            {contents[0]?.text.replace(/<\/?p>/g, '') || 'No content available'}
          </p> */}

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}