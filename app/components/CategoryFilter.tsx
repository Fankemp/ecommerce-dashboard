"use client"
import { useRouter, useSearchParams } from 'next/navigation';


export function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category")

    const handleClick = (category: string) => {
        if(category) {
            router.push(`/?category=${category}`);
        } else {
            router.push(`/`);
        }
    }

    return (
        <button onClick={() => handleClick(null)}
         className="`px-4`">
            Все товары
        </button>
    )
}