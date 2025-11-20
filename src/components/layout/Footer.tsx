import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="font-heading text-2xl font-bold tracking-tight">
                            Terior<span className="text-primary">Buy</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Discover and shop real-world interiors. Turn your admiration into reality.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/explore" className="hover:text-primary">Explore Spaces</Link></li>
                            <li><Link href="/designers" className="hover:text-primary">For Designers</Link></li>
                            <li><Link href="/venues" className="hover:text-primary">For Venues</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Connect</h3>
                        <div className="flex gap-4 text-muted-foreground">
                            <Link href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} TeriorBuy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
