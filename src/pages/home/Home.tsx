import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Heading,
  Select,
  Flex,
  Text,
  Image,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { formatPrice } from "../../utils/formatPrice";

import { useItems } from "./useItems";
import React from "react";

export default function Inicio(){
  const {
    searchTerm,
    items,
    isLoading,
    setSearchTerm,
    setCategory,
    setPriceOrder,
    setFloatOrder,
    setSortOrder,
  } = useItems(); // Usando o custom hook

  return (
    <Grid>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box p={5}>
          <Box as="header" bg="teal.500" p={4} borderRadius="md" mb={5}>
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <InputGroup maxW="500px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Pesquisar..."
                  bg="white"
                  borderRadius="md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
                />
              </InputGroup>
              <Flex gap={4}>
                <Select
                  placeholder="Categoria"
                  bg="white"
                  borderRadius="md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="rifles">rifles</option>
                  <option value="pistolas">pistolas</option>
                  <option value="luvas">luvas</option>
                  <option value="facas">facas</option>
                </Select>

                <Select
                  placeholder="Preço"
                  bg="white"
                  borderRadius="md"
                  onChange={(e) => setPriceOrder(e.target.value)}
                >
                  <option value="menor-maior">Menor para Maior</option>
                  <option value="maior-menor">Maior para Menor</option>
                </Select>

                <Select
                  placeholder="Float"
                  bg="white"
                  borderRadius="md"
                  onChange={(e) => setFloatOrder(e.target.value)}
                >
                  <option value="baixo-alto">Baixo para Alto</option>
                  <option value="alto-baixo">Alto para Baixo</option>
                </Select>
              </Flex>

              <Select
                placeholder="Ordenar por"
                bg="white"
                borderRadius="md"
                maxW="200px"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="preco">Preço</option>
                <option value="float">Float</option>
              </Select>
            </Flex>
          </Box>
          <Box as="main">
            <Grid
              templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
              gap={6}
            >
              {items.length > 0 ? (
                items.map((produto) => (
                  <Box
                    key={produto.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    cursor='pointer'
                    p={4}
                    bg="white"
                    shadow="md"
                    _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                  >
                    <Image
                      src={produto.image}
                      alt={`Produto ${produto.name}`}
                      borderRadius="md"
                      mb={3}
                    />

                    <Heading as="h3" size="md" mb={2}>
                      {produto.name}
                    </Heading>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontSize="lg" fontWeight="bold" color="green.500">
                        {formatPrice(produto.price)}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Float: {produto.float}
                      </Text>
                    </Flex>
                    <Badge colorScheme="blue" borderRadius="full" px={2} py={1}>
                      {produto.category.charAt(0).toUpperCase() +
                        produto.category.slice(1)}
                    </Badge>
                  </Box>
                ))
              ) : (
                <Text>Nenhum produto encontrado.</Text>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </Grid>
  );
}