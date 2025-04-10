import React, { useEffect } from "react";
import { setDocumentMeta } from "../utils/metaUtils";
import { Link as RouterLink } from "react-router-dom";
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
  useColorModeValue
} from "@chakra-ui/react";

const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setDocumentMeta(
      "Inicio",
      "Tu tienda online de confianza con los mejores productos al mejor precio. Envío gratis en compras mayores a $100."
    );
  }, []);
  return (
    <Box>
      {/* Header */}
      <Box bg={useColorModeValue("blue.500", "blue.800")} py={4} px={8} color="white">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">E-Commerce</Heading>
          <Flex align="center" gap={4}>
            <Button as={RouterLink} to="/products" colorScheme="whiteAlpha">
              Productos
            </Button>
            <Button as={RouterLink} to="/cart" colorScheme="whiteAlpha">
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

      {/* Hero Section */}
      <Box
        bg={useColorModeValue("blue.50", "blue.900")}
        py={20}
        px={8}
      >
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
          >
            <Stack maxW={{ base: "full", md: "50%" }} spacing={6}>
              <Heading
                as="h2"
                size="2xl"
                fontWeight="bold"
                color={useColorModeValue("blue.600", "blue.100")}
              >
                Tu tienda online de confianza
              </Heading>
              <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.300")}>
                Descubre los mejores productos al mejor precio. Envío gratis en compras mayores a $100.
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/products"
                  size="lg"
                  colorScheme="blue"
                  fontWeight="bold"
                >
                  Ver Productos
                </Button>
                {!isAuthenticated && (
                  <Button
                    as={RouterLink}
                    to="/register"
                    size="lg"
                    variant="outline"
                    colorScheme="blue"
                  >
                    Crear Cuenta
                  </Button>
                )}
              </Stack>
            </Stack>
            <Box
              w={{ base: "full", md: "40%" }}
              mt={{ base: 10, md: 0 }}
            >
              <Image
                src="https://placehold.co/600x400/blue/white?text=E-Commerce"
                alt="E-Commerce"
                borderRadius="lg"
                shadow="2xl"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <Heading as="h3" size="xl" mb={10} textAlign="center">
          ¿Por qué elegirnos?
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={8}
        >
          <Box
            p={6}
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg"
            shadow="md"
            flex="1"
            textAlign="center"
          >
            <Text fontSize="5xl" mb={4}>🚚</Text>
            <Heading as="h4" size="md" mb={2}>
              Envío Gratis
            </Heading>
            <Text>En compras mayores a $100</Text>
          </Box>

          <Box
            p={6}
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg"
            shadow="md"
            flex="1"
            textAlign="center"
          >
            <Text fontSize="5xl" mb={4}>🔒</Text>
            <Heading as="h4" size="md" mb={2}>
              Pago Seguro
            </Heading>
            <Text>Transacciones 100% seguras</Text>
          </Box>

          <Box
            p={6}
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg"
            shadow="md"
            flex="1"
            textAlign="center"
          >
            <Text fontSize="5xl" mb={4}>↩️</Text>
            <Heading as="h4" size="md" mb={2}>
              Devoluciones Fáciles
            </Heading>
            <Text>30 días para devoluciones</Text>
          </Box>
        </Flex>
      </Container>

      {/* Footer */}
      <Box bg={useColorModeValue("gray.100", "gray.900")} py={10} px={8}>
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

export default HomePage;
