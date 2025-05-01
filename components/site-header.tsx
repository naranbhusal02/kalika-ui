"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const navigationMenuTriggerStyle = cn(
  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:bg-white/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/20 data-[state=open]:bg-white/20"
)

export function SiteHeader() {
  return (
    <header className="sticky bg-slate-500 top-0 z-50 w-full ">
      <div className="container  flex h-16 items-center justify-center">
        {/* <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">KMGSS</span>
        </Link> */}
        <NavigationMenu className="hidden  md:flex">
          <NavigationMenuList className="">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle }>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-white/95 backdrop-blur">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Academic Programs</h4>
                    <p className="text-sm text-muted-foreground">
                      Discover our comprehensive academic offerings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Extra Curricular</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore our diverse range of activities
                    </p>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            {/* <NavigationMenuItem>
              <Link href="/academics" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>
                  Academics
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <Link href="/gallery" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>
                  Gallery
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/notice" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>
                  Notice
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <Link href="/blogs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>
                  Blogs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}

