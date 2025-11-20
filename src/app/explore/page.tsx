import prisma from "@/lib/prisma";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
    const spaces = await prisma.space.findMany({
        include: {
            owner: true,
            _count: {
                select: { products: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold">Explore Spaces</h1>
                    <p className="text-muted-foreground mt-2">
                        Discover curated interiors from around the world.
                    </p>
                </div>
                <div className="flex gap-2">
                    {/* Filters could go here */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {spaces.map((space) => (
                    <div
                        key={space.id}
                        className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg"
                    >
                        <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src={space.imageUrl}
                                alt={space.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                    {space.type || "Space"}
                                </span>
                                {/* Placeholder rating */}
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="h-3.5 w-3.5 fill-current" />
                                    <span className="text-sm font-medium">5.0</span>
                                </div>
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                {space.title}
                            </h3>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{space.location || "Unknown Location"}</span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                                        {space.owner.imageUrl ? (
                                            <img src={space.owner.imageUrl} alt={space.owner.firstName || "Owner"} />
                                        ) : (
                                            <div className="w-full h-full bg-primary/20" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {space.owner.firstName} {space.owner.lastName}
                                    </span>
                                </div>
                                <Button size="sm" variant="secondary" asChild>
                                    <Link href={`/spaces/${space.id}`}>
                                        Shop {space._count.products} Items
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
