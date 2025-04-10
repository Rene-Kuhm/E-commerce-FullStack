import React, { useState, useEffect } from "react";
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
  Grid,
  Image,
  Badge,
  useColorModeValue,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Divider
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useCart } from "../context/CartContext";

// Datos de ejemplo para productos
const mockProducts = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description: "El último modelo con cámara de alta resolución",
    price: 599.99,
    image: "https://placehold.co/300x300/blue/white?text=Smartphone",
    category: "Electrónica",
    stock: 10
  },
  {
    id: "2",
    name: "Laptop Pro",
    description: "Potente laptop para profesionales",
    price: 1299.99,
    image: "https://placehold.co/300x300/blue/white?text=Laptop",
    category: "Electrónica",
    stock: 5
  },
  {
    id: "3",
    name: "Auriculares Inalámbricos",
    description: "Sonido de alta calidad sin cables",
    price: 99.99,
    image: "https://placehold.co/300x300/blue/white?text=Auriculares",
    category: "Accesorios",
    stock: 15
  },
  {
    id: "4",
    name: "Smartwatch",
    description: "Monitorea tu actividad física y recibe notificaciones",
    price: 199.99,
    image: "https://placehold.co/300x300/blue/white?text=Smartwatch",
    category: "Accesorios",
    stock: 8
  },
  {
    id: "5",
    name: "Cámara Digital",
    description: "Captura momentos especiales con alta calidad",
    price: 499.99,
    image: "https://placehold.co/300x300/blue/white?text=Camara",
    category: "Electrónica",
    stock: 3
  },
  {
    id: "6",
    name: "Altavoz Bluetooth",
    description: "Sonido potente y portátil",
    price: 79.99,
    image: "https://placehold.co/300x300/blue/white?text=Altavoz",
    category: "Accesorios",
    stock: 12
  }
];

const ProductsPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    setDocumentMeta(
      "Productos",
      "Explora nuestra amplia selección de productos de alta calidad. Encuentra electrónica, accesorios y mucho más."
    );
  }, []);

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Obtener categorías únicas para el filtro
  const categories = [...new Set(mockProducts.map(product => product.category))];

  return (
    <Box>
      {/* Header */}
      <Box bg={useColorModeValue("blue.500", "blue.800")} py={4} px={8} color="white">
        <Flex justify="space-between" align="center">
          <Heading as={RouterLink} to="/" size="lg" _hover={{ textDecoration: "none" }}>E-Commerce</Heading>
          <Flex align="center" gap={4}>
            <Button as={RouterLink} to="/products" colorScheme="whiteAlpha" variant="solid">
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

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>Nuestros Productos</Heading>

        {/* Filters */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          mb={8}
          align={{ base: "stretch", md: "center" }}
        >
          <InputGroup maxW={{ base: "full", md: "400px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            placeholder="Todas las categorías"
            maxW={{ base: "full", md: "200px" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
        </Flex>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={6}
          >
            {filteredProducts.map(product => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg={useColorModeValue("white", "gray.800")}
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-5px)", shadow: "md" }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />

                <Box p={4}>
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="blue">
                      {product.category}
                    </Badge>
                    <Box
                      color={useColorModeValue("gray.500", "gray.400")}
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {product.stock} disponibles
                    </Box>
                  </Box>

                  <Heading as="h3" size="md" mt={2} height="50px" overflow="hidden">
                    {product.name}
                  </Heading>

                  <Text mt={2} height="80px" overflow="hidden" color={useColorModeValue("gray.600", "gray.400")}>
                    {product.description}
                  </Text>

                  <Divider my={3} />

                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" fontSize="xl">
                      ${product.price.toFixed(2)}
                    </Text>
                    <Button
                      colorScheme="blue"
                      onClick={() => addToCart(product)}
                    >
                      Añadir
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={10}>
            <Heading as="h3" size="lg" mb={3}>No se encontraron productos</Heading>
            <Text>Intenta con otra búsqueda o categoría</Text>
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

export default ProductsPage;
