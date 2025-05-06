import Gallery from "@/app/components/Gallery";

type Props = {
    params: {
        topic: string;
        page: string;
    };
};

export default function ResultsPage({ params: { topic, page } }: Props) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Gallery topic={topic} page={page} />
        </main>
    );
}

// Simplified static params generation
export function generateStaticParams() {
    return [
        { topic: 'curated', page: '1' },
        { topic: 'curated', page: '2' },
        { topic: 'curated', page: '3' },
    ];
} 