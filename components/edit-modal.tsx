import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface TeamMember {
  _id: string
  name: string
  experience: string
  title: string
  image: {
    url: string
    public_id: string
  }
}

interface EditModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
  onSave: (member: TeamMember, file: File | null) => Promise<void>
}

export function EditModal({ member, isOpen, onClose, onSave }: EditModalProps) {
  const [editedMember, setEditedMember] = useState<TeamMember | null>(member)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editedMember) {
      setEditedMember({ ...editedMember, [name]: value })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editedMember) return

    setIsLoading(true)
    try {
      await onSave(editedMember, selectedFile)
      onClose()
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!member) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={editedMember?.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={editedMember?.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="experience">Experience (years)</Label>
            <Input
              id="experience"
              name="experience"
              value={editedMember?.experience || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Profile Image</Label>
            <Input
              id="image"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

