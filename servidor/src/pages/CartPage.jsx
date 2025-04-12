import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Divider,
  Center,
  Grid,
  GridItem,
  useColorModeValue
} from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, loading, error, clearCart } = useCart();

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>
          Carrito de Compras
        </Heading>

        {loading ? (
          <Center py={10}>
            <Text>Cargando carrito...</Text>
          </Center>
        ) : error ? (
          <Center py={10}>
            <Text color="red.500">{error}</Text>
          </Center>
        ) : cart.items.length === 0 ? (
          <Box
            p={10}
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
            bg={useColorModeValue('white', 'gray.800')}
          >
            <Heading as="h2" size="lg" mb={4}>
              Tu carrito está vacío
            </Heading>
            <Text mb={6}>
              Parece que aún no has añadido productos a tu carrito.
            </Text>
            <Button
              as={RouterLink}
              to="/products"
              colorScheme="blue"
              size="lg"
            >
              Explorar Productos
            </Button>
          </Box>
        ) : (
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            <GridItem>
              <Box
                bg={useColorModeValue('white', 'gray.800')}
                p={5}
                borderWidth="1px"
                borderRadius="lg"
                shadow="sm"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h2" size="md">
                    Productos ({cart.items.length})
                  </Heading>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    size="sm"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </Button>
                </Flex>

                <Divider mb={4} />

                {cart.items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </Box>
            </GridItem>

            <GridItem>
              <CartSummary />
            </GridItem>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default CartPage;
