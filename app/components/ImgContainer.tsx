import type { Photo } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type Props = {
    photo: Photo
}

export default function ImageContainer({ photo }: Props) {
    const widthHeightRatio = photo.height / photo.width;
    const galleryHeight = Math.ceil(250 * widthHeightRatio);
    const photoSpans = Math.ceil(galleryHeight / 10) + 1;

    return (
        <div
            className="w-full max-w-[250px] justify-self-center"
            style={{ gridRow: `span ${photoSpans}` }}
        >
            <Link
                href={photo.url}
                target="_blank"
                className="grid place-content-center"
                rel="noopener noreferrer"
            >
                <div className="rounded-xl overflow-hidden group">
                    <Image
                        src={photo.src.large}
                        alt={photo.alt || "Gallery image"}
                        width={250}
                        height={galleryHeight}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        placeholder="blur"
                        blurDataURL={photo.blurredDataUrl}
                        className="group-hover:opacity-75 transition-opacity duration-300"
                        loading="lazy"
                        quality={75}
                    />
                </div>
            </Link>
        </div>
    )
}