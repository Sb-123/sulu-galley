import type { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env"

// Cache for storing API responses
const cache = new Map<string, { data: ImagesResults; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default async function fetchImages(url: string): Promise<ImagesResults | undefined> {
    try {
        // Check cache first
        const cachedData = cache.get(url);
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            return cachedData.data;
        }

        const res = await fetch(url, {
            headers: {
                Authorization: env.PEXELS_API_KEYS
            },
            next: { revalidate: 300 } // Revalidate every 5 minutes
        })

        if (!res.ok) throw new Error("Fetch Images error!\n")
        const imagesResults: ImagesResults = await res.json()

        // Parse data with zod schema
        const parsedData = ImagesSchemaWithPhotos.parse(imagesResults)
        if (parsedData.total_results === 0) return undefined

        // Store in cache
        cache.set(url, { data: parsedData, timestamp: Date.now() });

        return parsedData;
    } catch (e) {
        console.error("Error fetching images:", e);
        return undefined;
    }
}