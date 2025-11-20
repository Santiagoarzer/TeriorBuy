import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ExternalLink } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                        <ShoppingBag className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="font-medium leading-none mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price)}
                    </span>
                    {product.buyLink && (
                        <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                            <a href={product.buyLink} target="_blank" rel="noopener noreferrer">
                                Buy <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
