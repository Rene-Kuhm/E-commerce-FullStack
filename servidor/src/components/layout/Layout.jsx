import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  useColorModeValue,
  Text,
  Stack,
  Icon,
  Badge
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headerBg = useColorModeValue("blue.500", "blue.800");
  const footerBg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      {/* Header */}
      <Box bg={headerBg} py={4} px={8} color="white">
        <Flex justify="space-between" align="center">
          <Heading as={RouterLink} to="/" size="lg" _hover={{ textDecoration: "none" }}>
            E-Commerce
          </Heading>
          <Flex align="center" gap={4}>
            <Button as={RouterLink} to="/products" colorScheme="whiteAlpha" variant="ghost">
              Productos
            </Button>
            <Button 
              as={RouterLink} 
              to="/cart" 
              colorScheme="whiteAlpha" 
              variant="ghost"
              position="relative"
            >
              Carrito
              {itemCount > 0 && (
                <Badge 
                  colorScheme="red" 
                  borderRadius="full" 
                  position="absolute" 
                  top="-2px" 
                  right="-2px"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
            {isAuthenticated ? (
              <>
                <Button as={RouterLink} to="/profile" colorScheme="whiteAlpha" variant="ghost">
                  Mi Perfil
                </Button>
                <Button 
                  colorScheme="whiteAlpha" 
                  variant="outline"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button as={RouterLink} to="/login" colorScheme="whiteAlpha" variant="outline">
                Iniciar Sesión
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box flex="1">
        {children}
      </Box>

      {/* Footer */}
      <Box bg={footerBg} py={10} px={8}>
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

export default Layout;
