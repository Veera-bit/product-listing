import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { CreateProductDialog } from "./CreateProductDialog";
import { Product } from "../types";
import { useToast } from "@/hooks/use-toast";

export default function ProductList({
  searchQuery,
  selectedCategory,
}: {
  searchQuery: string;
  selectedCategory: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err: unknown) {
        console.log(err);
        setError("An error occurred while fetching products");
      } finally {
        setIsLoading(false);
      }
    }
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories([...data]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleEdit = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast({
      title: "Product Updated",
      description: `${updatedProduct.title} has been successfully updated.`,
    });
  };

  const handleDelete = (id: number) => {
    const productToDelete = products.find((p) => p.id === id);
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    toast({
      title: "Product Deleted",
      description: `${productToDelete?.title} has been successfully deleted.`,
      variant: "destructive",
    });
  };

  const handleCreateProduct = (newProduct: Partial<Product>) => {
    const createdProduct: Product = {
      ...newProduct,
      id: Date.now(),
    } as Product;
    setProducts((prevProducts) => [...prevProducts, createdProduct]);
    toast({
      title: "Product Created",
      description: `${createdProduct.title} has been successfully created.`,
    });
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <CreateProductDialog
        onCreateProduct={handleCreateProduct}
        categories={categories}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
