import React, { useEffect } from "react";
import { setDocumentMeta } from "../utils/metaUtils";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Image,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Divider,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useCart } from "../context/CartContext";


const CartPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, updateCartItem, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentMeta(
      "Carrito de Compras",
      "Revisa los productos en tu carrito, actualiza cantidades o procede al pago. Envío gratis en compras mayores a $100."
    );
  }, []);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/cart" } });
    } else {
      // Aquí iría la lógica para procesar el checkout
      alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
      clearCart();
      navigate("/");
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box bg={useColorModeValue("blue.500", "blue.800")} py={4} px={8} color="white">
        <Flex justify="space-between" align="center">
          <Heading as={RouterLink} to="/" size="lg" _hover={{ textDecoration: "none" }}>E-Commerce</Heading>
          <Flex align="center" gap={4}>
            <Button as={RouterLink} to="/products" colorScheme="whiteAlpha">
              Productos
            </Button>
            <Button as={RouterLink} to="/cart" colorScheme="whiteAlpha" variant="solid">
              Carrito
            </Button>
            {isAuthenticated ? (
              <>
                <Button as={RouterLink} to="/profile" colorScheme="whiteAlpha">
                  Mi Perfil
                </Button>
                <Button onClick={logout} colorScheme="whiteAlpha" variant="outline">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button as={RouterLink} to="/login" colorScheme="whiteAlpha">
                Iniciar Sesión
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>Tu Carrito</Heading>

        {cart.items.length > 0 ? (
          <Flex direction={{ base: "column", lg: "row" }} gap={8}>
            {/* Cart Items */}
            <Box flex="3">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Producto</Th>
                    <Th isNumeric>Precio</Th>
                    <Th isNumeric>Cantidad</Th>
                    <Th isNumeric>Subtotal</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.items.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        <Flex align="center" gap={4}>
                          <Image
                            src={item.products?.image || "https://placehold.co/50x50/gray/white?text=No+Image"}
                            alt={item.products?.name || "Producto"}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <Box>
                            <Text fontWeight="bold">{item.products?.name || "Producto sin nombre"}</Text>
                            <Text fontSize="sm" color="gray.500">{item.products?.category || "Sin categoría"}</Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td isNumeric>${(item.products?.price || 0).toFixed(2)}</Td>
                      <Td isNumeric>
                        <NumberInput
                          size="sm"
                          maxW={20}
                          min={1}
                          max={item.products?.stock || 10}
                          value={item.quantity}
                          onChange={(valueString) => {
                            const value = parseInt(valueString);
                            if (!isNaN(value)) {
                              updateCartItem(item.id, value);
                            }
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      <Td isNumeric fontWeight="bold">
                        ${((item.products?.price || 0) * item.quantity).toFixed(2)}
                      </Td>
                      <Td>
                        <IconButton
                          aria-label="Eliminar producto"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Flex justify="flex-end" mt={4}>
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
              </Flex>
            </Box>

            {/* Order Summary */}
            <Box
              flex="1"
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              bg={useColorModeValue("white", "gray.800")}
              height="fit-content"
            >
              <Heading as="h2" size="lg" mb={4}>Resumen del Pedido</Heading>

              <Stack spacing={4}>
                <Flex justify="space-between">
                  <Text>Subtotal</Text>
                  <Text fontWeight="bold">${total.toFixed(2)}</Text>
                </Flex>

                <Flex justify="space-between">
                  <Text>Envío</Text>
                  <Text fontWeight="bold">{total > 100 ? "Gratis" : "$10.00"}</Text>
                </Flex>

                <Divider />

                <Flex justify="space-between" fontWeight="bold" fontSize="lg">
                  <Text>Total</Text>
                  <Text>${(total > 100 ? total : total + 10).toFixed(2)}</Text>
                </Flex>

                <Button
                  colorScheme="blue"
                  size="lg"
                  mt={4}
                  onClick={handleCheckout}
                >
                  Proceder al Pago
                </Button>

                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Envío gratis en compras mayores a $100
                </Text>
              </Stack>
            </Box>
          </Flex>
        ) : (
          <Box textAlign="center" py={10}>
            <Alert status="info" borderRadius="md" mb={6}>
              <AlertIcon />
              Tu carrito está vacío
            </Alert>
            <Button
              as={RouterLink}
              to="/products"
              colorScheme="blue"
              size="lg"
            >
              Ver Productos
            </Button>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box bg={useColorModeValue("gray.100", "gray.900")} py={10} px={8} mt={10}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "flex-start" }}
            gap={8}
          >
            <Box>
              <Heading as="h4" size="md" mb={4}>
                E-Commerce
              </Heading>
              <Text>Tu tienda online de confianza</Text>
            </Box>

            <Box>
              <Heading as="h4" size="md" mb={4}>
                Enlaces
              </Heading>
              <Stack spacing={2}>
                <Button as={RouterLink} to="/" variant="link">
                  Inicio
                </Button>
                <Button as={RouterLink} to="/products" variant="link">
                  Productos
                </Button>
                <Button as={RouterLink} to="/cart" variant="link">
                  Carrito
                </Button>
              </Stack>
            </Box>

            <Box>
              <Heading as="h4" size="md" mb={4}>
                Contacto
              </Heading>
              <Text>info@ecommerce.com</Text>
              <Text>+1 234 567 890</Text>
            </Box>
          </Flex>

          <Text mt={10} textAlign="center">
            © {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default CartPage;
