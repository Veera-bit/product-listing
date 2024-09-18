import {useEffect, useState} from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

interface CategoryFilterProps {
    onCategoryChange: (category: string) => void
}

export default function CategoryFilter({onCategoryChange}: CategoryFilterProps) {
    const [categories, setCategories] = useState<string[]>(['All'])

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('https://fakestoreapi.com/products/categories')
                if (res.ok) {
                    const data = await res.json()
                    setCategories(['All', ...data])
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }

        fetchCategories()
    }, [])

    return (
        <Select onValueChange={onCategoryChange} defaultValue="All">
            <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select category"/>
            </SelectTrigger>
            <SelectContent>
                {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                        {category}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
