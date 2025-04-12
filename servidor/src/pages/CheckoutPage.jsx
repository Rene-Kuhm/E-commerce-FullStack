import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  Alert,
  AlertIcon,
  Button
} from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart.items.length, navigate]);

  if (cart.items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>
          Finalizar Compra
        </Heading>

        <Alert status="info" mb={6}>
          <AlertIcon />
          Completa la información a continuación para finalizar tu pedido.
        </Alert>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <CheckoutForm />
          </GridItem>

          <GridItem>
            <Box
              p={5}
              bg={useColorModeValue('white', 'gray.800')}
              borderWidth="1px"
              borderRadius="md"
              shadow="sm"
            >
              <Heading as="h2" size="md" mb={4}>
                Resumen del Pedido
              </Heading>

              {cart.items.map(item => (
                <Box
                  key={item.id}
                  p={3}
                  mb={2}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <Heading as="h3" size="sm">
                    {item.products?.name}
                  </Heading>
                  <Text>
                    Cantidad: {item.quantity} x ${item.products?.price?.toFixed(2)}
                  </Text>
                  <Text fontWeight="bold" textAlign="right">
                    ${(item.quantity * item.products?.price).toFixed(2)}
                  </Text>
                </Box>
              ))}

              <Box mt={4} p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                <Text fontWeight="bold">
                  Total: ${total.toFixed(2)}
                </Text>
              </Box>

              <Button
                as="a"
                href="/cart"
                variant="outline"
                mt={4}
                width="100%"
              >
                Volver al Carrito
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
