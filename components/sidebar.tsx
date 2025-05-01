import Link from "next/link"
import { Home, Image, Bell, BookOpen, Users } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/user" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Home className="h-5 w-5" />
          <span>User Management</span>
        </Link>
        <Link href="/dashboard/gallery" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Image className="h-5 w-5" />
          <span>Gallery</span>
        </Link>
        <Link href="/dashboard/notices" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Bell className="h-5 w-5" />
          <span>Notices</span>
        </Link>
        <Link href="/dashboard/blogs" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <BookOpen className="h-5 w-5" />
          <span>Blogs</span>
        </Link>
        <Link href="/dashboard/team" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Users className="h-5 w-5" />
          <span>Team Members</span>
        </Link>
      </nav>
    </div>
  )
}

