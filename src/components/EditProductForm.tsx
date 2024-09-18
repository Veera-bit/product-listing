import {useState} from 'react'
import {Product} from '../types'
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"

interface EditProductFormProps {
    product: Product
    onSave: (updatedProduct: Product) => void
    onCancel: () => void
}

export default function EditProductForm({product, onSave, onCancel}: EditProductFormProps) {
    const [editedProduct, setEditedProduct] = useState(product)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setEditedProduct(prev => ({...prev, [name]: name === 'price' ? parseFloat(value) : value}))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(editedProduct)
    }

    return (
        <Dialog open={true} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <Input id="title" name="title" value={editedProduct.title} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <Input id="price" name="price" type="number" step="0.01" value={editedProduct.price}
                                   onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="category"
                                   className="block text-sm font-medium text-gray-700">Category</label>
                            <Input id="category" name="category" value={editedProduct.category} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="description"
                                   className="block text-sm font-medium text-gray-700">Description</label>
                            <Textarea id="description" name="description" value={editedProduct.description}
                                      onChange={handleChange} required/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}