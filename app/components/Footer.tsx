import Link from "next/link";



type Props = {
    topic: string,
    page: string | undefined,
    prevPage: string | null,
    nextPage: string | null,
}



export default function Footer({ topic, page, prevPage, nextPage }: Props) {

    if (!prevPage && !nextPage) return null;

    const pageNums: number[] = []
    if (prevPage && nextPage) {
        for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
            pageNums.push(i);
        }
    }

    const nextPageArea = nextPage ? (
        <Link
            href={`/results/${topic}/${nextPage}`}
            className={`${!prevPage ? "mx-auto" : ""} hover:text-blue-500 transition-colors`}
        >
            {!prevPage ? "more" : ""} &gt;&gt;&gt;
        </Link>
    ) : null

    const prevPageArea = prevPage ? (
        <>
            <Link
                href={`/results/${topic}/${prevPage}`}
                className={`${!nextPage ? "mx-auto" : ""} hover:text-blue-500 transition-colors`}
            >
                &lt;&lt;&lt; {!nextPage ? "back" : ""}
            </Link>

            {pageNums.map(num => (
                page && num === parseInt(page) ? (
                    <span key={num} className="mx-1">{num}</span>
                ) : (
                    <Link
                        key={num}
                        href={`/results/${topic}/${num}`}
                        className="mx-1 hover:text-blue-500 transition-colors"
                    >
                        {num}
                    </Link>
                )
            ))}
        </>
    ) : null

    return (
        <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto ">
            {prevPageArea}
            {nextPageArea}

        </footer>
    )
}



