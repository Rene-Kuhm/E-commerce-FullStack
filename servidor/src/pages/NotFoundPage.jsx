import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Center,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Box bg={useColorModeValue('blue.500', 'blue.800')} py={4} px={8} color="white">
        <Heading as="h1" size="lg">E-Commerce</Heading>
      </Box>

      <Container maxW="container.xl" py={20} flex="1">
        <Center>
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h1"
              size="4xl"
              bgGradient="linear(to-r, blue.400, blue.600)"
              backgroundClip="text"
            >
              404
            </Heading>
            
            <Heading as="h2" size="xl">
              Página no encontrada
            </Heading>
            
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </Text>
            
            <Button
              as={RouterLink}
              to="/"
              colorScheme="blue"
              size="lg"
              mt={4}
            >
              Volver al Inicio
            </Button>
          </VStack>
        </Center>
      </Container>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} py={6} px={8}>
        <Container maxW="container.xl">
          <Text textAlign="center">
            © {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
