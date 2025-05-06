import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import addBlurredDataUrls from "@/lib/getBase64";
import ImageContainer from "./ImgContainer";
import getPrevNextPages from "@/lib/getPreNextPages";
import Footer from "./Footer";
import { Suspense } from "react";

type Props = {
    topic?: string | undefined
    page?: string | undefined
}

function GallerySkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
                ))}
            </div>
        </div>
    );
}

export default async function Gallery({ topic = 'curated', page }: Props) {
    let url: string;
    const currentPage = page ? parseInt(page) : 1;

    if (topic === 'curated') {
        url = currentPage > 1
            ? `https://api.pexels.com/v1/curated?page=${currentPage}`
            : 'https://api.pexels.com/v1/curated';
    } else {
        url = currentPage > 1
            ? `https://api.pexels.com/v1/search?query=${topic}&page=${currentPage}`
            : `https://api.pexels.com/v1/search?query=${topic}`;
    }

    try {
        const images: ImagesResults | undefined = await fetchImages(url);

        if (!images || images.per_page === 0) {
            return <h2 className="m-4 text-2xl font-bold">No Images found</h2>;
        }

        const photosWithBlur = await addBlurredDataUrls(images);
        const { prevPage, nextPage } = getPrevNextPages(images);
        const footerProps = { topic, page: currentPage.toString(), nextPage, prevPage };

        return (
            <>
                <Suspense fallback={<GallerySkeleton />}>
                    <section className="px-1 my-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 auto-rows-[10px]">
                        {photosWithBlur.map(photo => (
                            <ImageContainer key={photo.id} photo={photo} />
                        ))}
                    </section>
                </Suspense>
                <Footer {...footerProps} />
            </>
        );
    } catch (error) {
        console.error('Error fetching images:', error);
        return <h2 className="m-4 text-2xl font-bold">Error loading images. Please try again.</h2>;
    }
}