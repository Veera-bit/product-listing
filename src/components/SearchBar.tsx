import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  debounceTime?: number;
}

export default function SearchBar({ onSearch, debounceTime = 100 }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((q: string) => {
      onSearch(q);
    }, debounceTime),
    [onSearch, debounceTime]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10"
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function debounced(...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  }

  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };

  return debounced as T & { cancel: () => void };
}