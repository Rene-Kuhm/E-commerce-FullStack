import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Button,
  Divider,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CartSummary = () => {
  const { cart, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Calcular subtotal, impuestos y envío
  const subtotal = total;
  const tax = subtotal * 0.16; // 16% de impuestos
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0; // Envío gratis para compras mayores a $100
  const finalTotal = subtotal + tax + shipping;

  return (
    <Box
      p={5}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      shadow="sm"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Resumen del Pedido
      </Text>

      <VStack spacing={3} align="stretch">
        <Flex justify="space-between">
          <Text>Subtotal ({cart.items.length} productos)</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text>Impuestos (16%)</Text>
          <Text>${tax.toFixed(2)}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text>Envío</Text>
          <Text>
            {shipping === 0 && subtotal > 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
          </Text>
        </Flex>

        <Divider my={2} />

        <Flex justify="space-between" fontWeight="bold">
          <Text>Total</Text>
          <Text fontSize="xl">${finalTotal.toFixed(2)}</Text>
        </Flex>

        <Button
          colorScheme="blue"
          size="lg"
          mt={4}
          isDisabled={cart.items.length === 0}
          onClick={handleCheckout}
        >
          {isAuthenticated ? 'Proceder al Pago' : 'Iniciar Sesión para Comprar'}
        </Button>

        <Button
          variant="outline"
          mt={2}
          isDisabled={cart.items.length === 0}
          onClick={handleClearCart}
        >
          Vaciar Carrito
        </Button>
      </VStack>
    </Box>
  );
};

export default CartSummary;
