"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { createSpace } from "@/app/actions";

export default function UploadPage() {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!imageUrl) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            formData.append("imageUrl", imageUrl);

            await createSpace(formData);
        } catch (error) {
            console.error("Failed to create space", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="font-heading text-3xl font-bold mb-8">Upload a New Space</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <label className="font-medium">Space Image</label>
                    {imageUrl ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden border">
                            <img src={imageUrl} alt="Uploaded space" className="w-full h-full object-cover" />
                            <Button
                                variant="secondary"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => setImageUrl(null)}
                                type="button"
                            >
                                Change Image
                            </Button>
                        </div>
                    ) : (
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res && res[0]) {
                                    setImageUrl(res[0].url);
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                            appearance={{
                                container: "border-2 border-dashed border-primary/20 bg-muted/30 rounded-xl p-8",
                                label: "text-primary hover:text-primary/80",
                                button: "bg-primary text-primary-foreground hover:bg-primary/90"
                            }}
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="font-medium">Title</label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="e.g., Modern Minimalist Living Room"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="location" className="font-medium">Location</label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="e.g., New York, NY"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="font-medium">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about this space..."
                            required
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={!imageUrl || isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Space...
                        </>
                    ) : (
                        "Create Space"
                    )}
                </Button>
            </form>
        </div>
    );
}
