"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User, LogOut } from 'lucide-react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/app/store/useAuthStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Add interface for user type
interface UserType {
  username?: string;
  email?: string;
  profileImage?: string;
}

// Add interface for auth store
interface AuthStore {
  user: UserType | null;
  isAuthenticated: boolean;
  logout: () => void;
  googleLogin: () => void;
}

const navigationMenuTriggerStyle = cn(
  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/10 data-[state=open]:bg-white/10"
)

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/question-papers", label: "Papers" },
  { href: "/policy", label: "Policy" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/notice", label: "Notice" },
  { href: "/download", label: "Download" },
  { href: "/contact", label: "Contact Us" },
]

function UserNav() {
  const { user, isAuthenticated, logout, googleLogin } = useAuthStore() as AuthStore

  if (!isAuthenticated) {
    return (
      <Button 
        variant="outline" 
        onClick={() => googleLogin()}
        className="ml-4 bg-white/10 text-white hover:bg-white/20 transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Sign in
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full ml-4 p-0 overflow-hidden bg-white/50 hover:bg-white/20 transition-all duration-200 ease-in-out transform hover:scale-105">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profileImage} alt={user?.username || "User avatar"} />
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white mt-2" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.username || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer focus:bg-purple-100">
          <User className="mr-2 h-4 w-4" />
          <Link href="/profile">
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer focus:bg-purple-100">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gradient-to-br from-purple-700 to-blue-500">
        <div className="flex flex-col space-y-4 mt-4">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                pathname === link.href ? "text-white" : "text-white/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-700 to-blue-500 shadow-lg">
      <div className="container flex h-16 items-center justify-between md:justify-center">
        <div className="md:hidden">
          <MobileNav />
        </div>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-2">
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle,
                      "transition-all duration-200 ease-in-out transform hover:scale-105",
                      pathname === link.href && "bg-white/10 scale-105"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="md:absolute md:right-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}