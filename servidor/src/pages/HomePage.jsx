import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box>
      {/* Header */}
      <Box bg={useColorModeValue('blue.500', 'blue.800')} py={4} px={8} color="white">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">E-Commerce</Heading>
          <Flex align="center" gap={4}>
            <Button as={RouterLink} to="/products" colorScheme="whiteAlpha">
              Productos
            </Button>
            <Button as={RouterLink} to="/cart" colorScheme="whiteAlpha">
              Carrito
            </Button>
            <Button as={RouterLink} to="/login" colorScheme="whiteAlpha">
              Iniciar Sesión
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Hero Section */}
      <Box
        bg={useColorModeValue('blue.50', 'blue.900')}
        py={20}
        px={8}
      >
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
          >
            <Stack maxW={{ base: 'full', md: '50%' }} spacing={6}>
              <Heading
                as="h2"
                size="2xl"
                fontWeight="bold"
                color={useColorModeValue('blue.600', 'blue.100')}
              >
                Tu tienda online de confianza
              </Heading>
              <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')}>
                Descubre los mejores productos al mejor precio. Envío gratis en compras mayores a $100.
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/products"
                  size="lg"
                  colorScheme="blue"
                  fontWeight="bold"
                >
                  Ver Productos
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                >
                  Crear Cuenta
                </Button>
              </Stack>
            </Stack>
            <Box
              w={{ base: 'full', md: '40%' }}
              mt={{ base: 10, md: 0 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
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
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          gap={8}
        >
          <Box
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
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
            bg={useColorModeValue('white', 'gray.800')}
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
            bg={useColorModeValue('white', 'gray.800')}
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

      {/* Products Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={16}>
        <Container maxW="container.xl">
          <Heading as="h3" size="xl" mb={10} textAlign="center">
            Productos Destacados
          </Heading>
          
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            gap={8}
            wrap="wrap"
          >
            {/* Product Card 1 */}
            <Box
              p={6}
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="lg"
              shadow="md"
              flex="1"
              minW={{ base: '100%', md: '30%' }}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                alt="Auriculares"
                borderRadius="md"
                mb={4}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <Heading as="h4" size="md" mb={2}>
                Auriculares Inalámbricos
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
                Auriculares con cancelación de ruido y calidad de sonido premium.
              </Text>
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="xl" color="blue.500">
                  $199.99
                </Text>
                <Button colorScheme="blue" size="sm">
                  Añadir al Carrito
                </Button>
              </Flex>
            </Box>
            
            {/* Product Card 2 */}
            <Box
              p={6}
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="lg"
              shadow="md"
              flex="1"
              minW={{ base: '100%', md: '30%' }}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80"
                alt="Laptop"
                borderRadius="md"
                mb={4}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <Heading as="h4" size="md" mb={2}>
                Laptop Ultradelgada
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
                Potente laptop con procesador de última generación y diseño ultradelgado.
              </Text>
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="xl" color="blue.500">
                  $1299.99
                </Text>
                <Button colorScheme="blue" size="sm">
                  Añadir al Carrito
                </Button>
              </Flex>
            </Box>
            
            {/* Product Card 3 */}
            <Box
              p={6}
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="lg"
              shadow="md"
              flex="1"
              minW={{ base: '100%', md: '30%' }}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80"
                alt="Smartphone"
                borderRadius="md"
                mb={4}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <Heading as="h4" size="md" mb={2}>
                Smartphone Premium
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
                El último smartphone con cámara de alta resolución y batería de larga duración.
              </Text>
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="xl" color="blue.500">
                  $799.99
                </Text>
                <Button colorScheme="blue" size="sm">
                  Añadir al Carrito
                </Button>
              </Flex>
            </Box>
          </Flex>
          
          <Flex justify="center" mt={10}>
            <Button as={RouterLink} to="/products" colorScheme="blue" size="lg">
              Ver Todos los Productos
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} py={10} px={8}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
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
