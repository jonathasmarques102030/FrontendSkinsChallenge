import { useState, useEffect, useMemo } from "react";

import { takeItems } from "@/services/items";

interface Products {
  id: string;
  name: string;
  float: string;
  price: number;
  category: string;
  image: string;
}

export function useItems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [floatOrder, setFloatOrder] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [items, setProducts] = useState<Products[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Products[]>([]); // Armazena os produtos originais
  const [isLoading, setLoading] = useState(true);

  const filteredItems = useMemo(() => {
    // Sempre começa com a lista completa de produtos
    let filtered = [...originalProducts];

    // Filtra por termo de busca
    if (searchTerm) {
      filtered = filtered.filter((produto) =>
        produto.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtra por categoria
    if (category) {
      filtered = filtered.filter((produto) => produto.category === category);
    }

    // Ordena por preço
    if (priceOrder === "menor-maior") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "maior-menor") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    // Ordena por float
    if (floatOrder === "baixo-alto") {
      filtered = filtered.sort(
        (a, b) => parseFloat(a.float) - parseFloat(b.float)
      );
    } else if (floatOrder === "alto-baixo") {
      filtered = filtered.sort(
        (a, b) => parseFloat(b.float) - parseFloat(a.float)
      );
    }

    // Ordena pela seleção geral (preço ou float)
    if (sortOrder === "preco") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "float") {
      filtered = filtered.sort(
        (a, b) => parseFloat(a.float) - parseFloat(b.float)
      );
    }
    return filtered;
  }, [
    searchTerm,
    category,
    priceOrder,
    floatOrder,
    sortOrder,
    originalProducts,
  ]);

  useEffect(() => {
    setProducts(filteredItems);
  }, [filteredItems]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsFromApi = await takeItems();
        setProducts(itemsFromApi);
        setOriginalProducts(itemsFromApi);
      } catch (error) {
        console.error("Erro ao buscar os items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    searchTerm,
    category,
    priceOrder,
    floatOrder,
    sortOrder,
    items,
    isLoading,
    setCategory,
    setSearchTerm,
    setPriceOrder,
    setFloatOrder,
    setSortOrder,
  };
}
