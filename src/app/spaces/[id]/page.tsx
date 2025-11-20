import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, User, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SpacePage({ params }: PageProps) {
    const { id } = await params;

    const space = await prisma.space.findUnique({
        where: { id },
        include: {
            owner: true,
            products: true,
        },
    });

    if (!space) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-black">
                <img
                    src={space.imageUrl}
                    alt={space.title}
                    className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8 md:pb-12 text-white">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider">
                                    {space.type}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" /> {space.location}
                                </span>
                            </div>
                            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
                                {space.title}
                            </h1>
                            <p className="text-lg text-white/80 max-w-2xl">
                                {space.description}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Share2 className="h-5 w-5" />
                            </Button>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Sidebar / Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-card border rounded-xl p-6 shadow-sm">
                            <h3 className="font-heading text-lg font-bold mb-4">Designed By</h3>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                                    {space.owner.imageUrl ? (
                                        <img src={space.owner.imageUrl} alt={space.owner.firstName || "Owner"} />
                                    ) : (
                                        <User className="h-6 w-6 m-3 text-muted-foreground" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold">{space.owner.firstName} {space.owner.lastName}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{space.owner.role.toLowerCase()}</p>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto">Follow</Button>
                            </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                            <h3 className="font-heading text-lg font-bold mb-2">Shop the Look</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Browse the curated products found in this space. Click on items to view details or purchase.
                            </p>
                            <Button className="w-full">View All {space.products.length} Items</Button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-2">
                        <h2 className="font-heading text-2xl font-bold mb-6">Shoppable Items</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {space.products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
