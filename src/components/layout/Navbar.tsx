"use client"

import Link from "next/link"
import { Search, ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-heading text-2xl font-bold tracking-tight">
                        Terior<span className="text-primary">Buy</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/explore" className="transition-colors hover:text-primary">
                        Explore
                    </Link>
                    <Link href="/designers" className="transition-colors hover:text-primary">
                        Designers
                    </Link>
                    <Link href="/venues" className="transition-colors hover:text-primary">
                        Venues
                    </Link>
                </nav>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search interiors, furniture, designers..."
                            className="w-full bg-secondary/50 pl-9 focus-visible:ring-primary"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <SignedIn>
                        <Button variant="ghost" size="sm" asChild className="hidden md:flex mr-2">
                            <Link href="/upload">Upload Space</Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="hidden md:flex">
                            <ShoppingBag className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <Button asChild variant="default" size="sm">
                            <SignInButton />
                        </Button>
                    </SignedOut>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 mt-6">
                                <Link href="/" className="font-heading text-2xl font-bold">
                                    Terior<span className="text-primary">Buy</span>
                                </Link>
                                <div className="relative w-full">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        className="w-full bg-secondary/50 pl-9"
                                    />
                                </div>
                                <nav className="flex flex-col gap-4">
                                    <Link href="/explore" className="text-lg font-medium hover:text-primary">
                                        Explore
                                    </Link>
                                    <Link href="/designers" className="text-lg font-medium hover:text-primary">
                                        Designers
                                    </Link>
                                    <Link href="/venues" className="text-lg font-medium hover:text-primary">
                                        Venues
                                    </Link>
                                </nav>
                                <div className="mt-auto">
                                    <SignedOut>
                                        <Button className="w-full" asChild>
                                            <SignInButton />
                                        </Button>
                                    </SignedOut>
                                    <SignedIn>
                                        <div className="flex items-center gap-4 py-4">
                                            <UserButton afterSignOutUrl="/" showName />
                                        </div>
                                    </SignedIn>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
