import Link from "next/link"
import { ArrowRight, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-6">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Shop the World's <br /> Most Beautiful Spaces
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Discover and buy furniture, decor, and art directly from the real-world places you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <Link href="/explore">Start Exploring</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm" asChild>
              <Link href="/designers">For Designers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Spaces Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Trending Spaces</h2>
              <p className="text-muted-foreground mt-2">Explore the most popular interiors this week.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex gap-2" asChild>
              <Link href="/explore">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=800&auto=format&fit=crop"
                  alt="Modern Loft"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    Residential
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  The Soho Loft
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium">
                      +12
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/spaces/soho-loft">Shop Items</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop"
                  alt="Minimalist Cafe"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    Commercial
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  Kohi Coffee Bar
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Tokyo, Japan</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex -space-x-2">
                    {[4, 5, 6].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" />
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium">
                      +24
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/spaces/kohi-coffee">Shop Items</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop"
                  alt="Boutique Hotel"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    Hospitality
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  The Azure Hotel
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Santorini, Greece</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex -space-x-2">
                    {[7, 8, 9].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User" />
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium">
                      +8
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/spaces/azure-hotel">Shop Items</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center md:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/explore">
                View all Spaces <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop"
                  alt="Visual Search"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-xl shadow-xl max-w-xs hidden lg:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold">AI Powered</p>
                    <p className="text-xs text-muted-foreground">Visual Recognition</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Instantly identify furniture and decor from any photo.</p>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
                See it. Like it. <br /> <span className="text-primary">Buy it.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                TeriorBuy bridges the gap between inspiration and ownership. Our advanced visual search technology lets you shop the look of any space instantly.
              </p>
              <ul className="space-y-4">
                {[
                  "Upload a photo or scan a room",
                  "Get instant product matches and alternatives",
                  "Shop directly from verified designers and brands"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button size="lg">Try Visual Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of design enthusiasts, homeowners, and professionals discovering unique pieces every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-lg h-12 px-8">
              Sign Up Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              List Your Space
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
