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
  VStack,
  useColorModeValue
} from "@chakra-ui/react";

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setDocumentMeta(
      "Página no encontrada",
      "Lo sentimos, la página que estás buscando no existe."
    );
  }, []);
  return (
    <Box minH="100vh" py={10}>
      <Container maxW="container.xl" centerContent>
        <VStack spacing={8} textAlign="center">
          <Heading as="h1" size="4xl" color={useColorModeValue("blue.500", "blue.300")}>
            404
          </Heading>
          <Heading as="h2" size="xl">
            Página no encontrada
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
            Lo sentimos, la página que estás buscando no existe.
          </Text>
          <Button
            as={RouterLink}
            to="/"
            colorScheme="blue"
            size="lg"
          >
            Volver al inicio
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
