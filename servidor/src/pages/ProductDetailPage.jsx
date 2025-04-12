import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Stack,
  Badge,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
  Center,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error al cargar el producto. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
      
      toast({
        title: 'Producto añadido',
        description: `${quantity} ${quantity > 1 ? 'unidades' : 'unidad'} de ${product.name} ${quantity > 1 ? 'añadidas' : 'añadida'} al carrito`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <Center h="50vh">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Center>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <Container maxW="container.xl" py={10}>
          <Center>
            <Text color="red.500">{error || 'Producto no encontrado'}</Text>
          </Center>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        {/* Breadcrumbs */}
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
          mb={6}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/products">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="start"
          gap={8}
        >
          {/* Product Image */}
          <Box
            width={{ base: '100%', md: '50%' }}
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={product.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={product.name}
              width="100%"
              height="auto"
              objectFit="cover"
            />
          </Box>

          {/* Product Info */}
          <Box width={{ base: '100%', md: '50%' }}>
            <Stack spacing={4}>
              <Heading as="h1" size="xl">
                {product.name}
              </Heading>

              <Flex align="center">
                {product.is_featured && (
                  <Badge colorScheme="blue" mr={2}>Destacado</Badge>
                )}
                {product.stock <= 0 ? (
                  <Badge colorScheme="red">Agotado</Badge>
                ) : product.stock <= 5 ? (
                  <Badge colorScheme="yellow">¡Últimas unidades!</Badge>
                ) : (
                  <Badge colorScheme="green">En Stock</Badge>
                )}
              </Flex>

              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                ${product.price.toFixed(2)}
              </Text>

              <Divider />

              <Text>{product.description}</Text>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  Disponibilidad: {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                </Text>
                <Text fontWeight="bold" mb={2}>
                  SKU: {product.sku || 'N/A'}
                </Text>
                <Text fontWeight="bold">
                  Categoría: {product.categories?.name || 'Sin categoría'}
                </Text>
              </Box>

              <Divider />

              {product.stock > 0 && (
                <Flex align="center" mt={2}>
                  <Text fontWeight="bold" mr={4}>Cantidad:</Text>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={product.stock}
                    onChange={(_, value) => setQuantity(value)}
                    width="100px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              )}

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleAddToCart}
                isDisabled={product.stock <= 0}
                leftIcon={<span role="img" aria-label="cart">🛒</span>}
                mt={4}
              >
                {product.stock <= 0 ? 'Agotado' : 'Añadir al Carrito'}
              </Button>

              <Text fontSize="sm" color="gray.500">
                Envío gratis en compras mayores a $100
              </Text>
            </Stack>
          </Box>
        </Flex>

        {/* Additional Info */}
        <Box mt={12}>
          <Divider mb={8} />
          
          <Heading as="h2" size="lg" mb={4}>
            Detalles del Producto
          </Heading>
          
          <Text mb={8}>
            {product.description || 'No hay información adicional disponible para este producto.'}
          </Text>
          
          {/* You can add more sections here like reviews, related products, etc. */}
        </Box>
      </Container>
    </Layout>
  );
};

export default ProductDetailPage;
