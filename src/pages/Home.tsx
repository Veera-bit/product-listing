import {useState} from 'react'
import ProductList from '@/components/ProductList'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-14">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
                <div className="w-full sm:w-auto">
                    <CategoryFilter onCategoryChange={handleCategoryChange}/>
                </div>
                <div className="flex-grow">
                    <SearchBar onSearch={handleSearch}/>
                </div>
            </div>
            <ProductList searchQuery={searchQuery} selectedCategory={selectedCategory}/>
        </div>
    )
}