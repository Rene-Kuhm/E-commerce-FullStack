import React from 'react';
import { SimpleGrid, Text, Center, Spinner } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={10}>
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Center py={10}>
        <Text>No se encontraron productos.</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
