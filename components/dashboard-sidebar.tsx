"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ImageIcon, NewspaperIcon, UsersIcon, BellIcon, LayoutDashboardIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="text-lg">School Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link href="/dashboard">
              <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard" && "bg-gray-200 dark:bg-gray-700")}>
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/gallery">
              <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard/gallery" && "bg-gray-200 dark:bg-gray-700")}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Gallery
              </Button>
            </Link>
            <Link href="/dashboard/blogs">
              <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard/blogs" && "bg-gray-200 dark:bg-gray-700")}>
                <NewspaperIcon className="mr-2 h-4 w-4" />
                Blogs
              </Button>
            </Link>
            <Link href="/dashboard/notices">
              <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard/notices" && "bg-gray-200 dark:bg-gray-700")}>
                <BellIcon className="mr-2 h-4 w-4" />
                Notices
              </Button>
            </Link>
            <Link href="/dashboard/team">
              <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard/team" && "bg-gray-200 dark:bg-gray-700")}>
                <UsersIcon className="mr-2 h-4 w-4" />
                Team
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

