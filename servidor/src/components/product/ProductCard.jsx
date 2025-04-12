import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  useColorModeValue,
  Button,
  Link,
  Tooltip
} from '@chakra-ui/react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'md' }}
    >
      <Link as={RouterLink} to={`/products/${product.id}`} _hover={{ textDecoration: 'none' }}>
        <Image
          src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={product.name}
          height="200px"
          width="100%"
          objectFit="cover"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {product.is_featured && (
              <Badge borderRadius="full" px="2" colorScheme="blue" mr={2}>
                Destacado
              </Badge>
            )}
            {product.stock <= 0 && (
              <Badge borderRadius="full" px="2" colorScheme="red">
                Agotado
              </Badge>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <Badge borderRadius="full" px="2" colorScheme="yellow">
                ¡Últimas unidades!
              </Badge>
            )}
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            color={textColor}
          >
            {product.name}
          </Box>

          <Box color={textColor} fontSize="sm" noOfLines={2} height="40px" mb={2}>
            {product.description}
          </Box>

          <Flex justify="space-between" align="center" mt={2}>
            <Text fontWeight="bold" fontSize="xl" color={textColor}>
              ${product.price.toFixed(2)}
            </Text>
            <Tooltip label={product.stock <= 0 ? 'Producto agotado' : 'Añadir al carrito'}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={handleAddToCart}
                isLoading={loading}
                isDisabled={product.stock <= 0}
              >
                Añadir
              </Button>
            </Tooltip>
          </Flex>
        </Box>
      </Link>
    </Box>
  );
};

export default ProductCard;
