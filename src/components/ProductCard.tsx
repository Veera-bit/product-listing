import {useState} from 'react'
import {Product} from '../types'
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Edit, Trash2} from "lucide-react"
import EditProductForm from './EditProductForm'
import DeleteProductDialog from './DeleteProductDialog'

export default function ProductCard({product, onEdit, onDelete}: {
    product: Product,
    onEdit: (updatedProduct: Product) => void,
    onDelete: (id: number) => void
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    return (
        <>
            <Card className="flex flex-col justify-between overflow-hidden h-full">
                <CardContent className="p-4 flex flex-col h-full">
                    <div
                        className="w-full h-48 mb-4 bg-center bg-no-repeat bg-contain"
                        style={{backgroundImage: `url(${product.image})`}}
                    />
                    <div className="flex flex-col flex-grow">
                        <h2 className="text-lg font-semibold line-clamp-2 mb-2">{product.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                        <p className="text-sm text-gray-500 mb-4 flex-grow overflow-hidden text-ellipsis" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                        }}>{product.description}</p>
                        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setIsDeleting(true)}>
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                    </Button>
                </CardFooter>
            </Card>

            {isEditing && (
                <EditProductForm
                    product={product}
                    onSave={(updatedProduct) => {
                        onEdit(updatedProduct)
                        setIsEditing(false)
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            )}

            {isDeleting && (
                <DeleteProductDialog
                    productName={product.title}
                    onConfirm={() => {
                        onDelete(product.id)
                        setIsDeleting(false)
                    }}
                    onCancel={() => setIsDeleting(false)}
                />
            )}
        </>
    )
}