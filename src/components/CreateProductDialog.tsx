import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateProductDialogProps {
  onCreateProduct: (product: Partial<Product>) => void;
  categories: string[];
}

interface ValidationErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  image?: string;
}

export function CreateProductDialog({
  onCreateProduct,
  categories,
}: CreateProductDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateUrlExists = async (url: string): Promise<boolean> => {
    if (!url.startsWith('https://')) {
      return false;
    }
    try {
      // Make a HEAD request to check if the URL exists
      console.log(url)
      const response = await fetch(url, { method: 'GET' });
      console.log(response.ok)
      // If response status is in the 200 range, the URL exists
      return response.ok;
    } catch (error) {
      // If fetch fails, the URL is likely invalid or unreachable
      return false;
    }
  };

  useEffect(()=> {
    setNewProduct({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",})
  },[isDialogOpen])

  const validateForm = async (): Promise<boolean> => {
    const newErrors: ValidationErrors = {};

    if (newProduct.title!.length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (newProduct.description!.length <= 10 || newProduct.description!.length >= 100) {
      newErrors.description = "Description must be between 10 and 100 characters";
    }

    if (newProduct.price! <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!newProduct.category) {
      newErrors.category = "Please select a category";
    }


    const isValidUrl = newProduct.image ? await validateUrlExists(newProduct.image) : false;

    if (!isValidUrl) {
      newErrors.image = "The URL is invalid or not reachable.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      onCreateProduct(newProduct);
      setNewProduct({
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
      });
      setIsDialogOpen(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct((prev) => ({ ...prev, category: value }));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Create Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              // value={newProduct.price}
              onChange={handleInputChange}
              placeholder="0"
              required
              step="0.1"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={newProduct.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              required
              placeholder="Please a valid image url starting with https://"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>
          <Button type="submit">Create Product</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}