"use client";

import { useState } from "react";
import { Upload, Loader2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@prisma/client";

interface SearchResult {
    detectedItem: { name: string; description: string };
    matches: Product[];
}

export function VisualSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        setLoading(true);
        setResults([]);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("/api/visual-search", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.results) {
                setResults(data.results);
            }
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-xl z-50"
                size="icon"
            >
                <Search className="h-6 w-6" />
                <span className="sr-only">Visual Search</span>
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" /> Visual Search
                    </h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {!image ? (
                        <div className="h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <Upload className="h-10 w-10 mb-4" />
                            <p className="font-medium">Upload an image to search</p>
                            <p className="text-xs mt-1">Supports JPG, PNG, WEBP</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-1/3 aspect-square rounded-lg overflow-hidden border relative">
                                    <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={() => { setImage(null); setResults([]); }}
                                    >
                                        New Search
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    {loading ? (
                                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                                            <p>Analyzing image with Gemini AI...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {results.length === 0 ? (
                                                <p className="text-muted-foreground">No matching products found in our catalog.</p>
                                            ) : (
                                                results.map((result, idx) => (
                                                    <div key={idx}>
                                                        <h3 className="font-bold mb-3 flex items-center gap-2">
                                                            <span className="h-2 w-2 rounded-full bg-primary" />
                                                            Found: {result.detectedItem.name}
                                                        </h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {result.matches.map(product => (
                                                                <ProductCard key={product.id} product={product} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
