import React from "react";
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Code,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  const bgColor = useColorModeValue("red.50", "red.900");
  const borderColor = useColorModeValue("red.200", "red.700");
  
  let errorMessage = "Ha ocurrido un error inesperado.";
  let errorDetails = "";
  let status = "";
  
  if (isRouteErrorResponse(error)) {
    // Error from React Router
    status = error.status;
    errorMessage = error.statusText;
    errorDetails = error.data?.message || "";
  } else if (error instanceof Error) {
    // JavaScript error
    errorMessage = error.message;
    errorDetails = error.stack;
  } else if (typeof error === "string") {
    // String error
    errorMessage = error;
  }
  
  return (
    <Box minH="100vh" py={10}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          <Alert 
            status="error" 
            variant="solid" 
            borderRadius="md"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            py={4}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="xl">
              {status ? `Error ${status}` : "Error"}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {errorMessage}
            </AlertDescription>
          </Alert>
          
          <Box 
            p={6} 
            bg={bgColor} 
            borderRadius="md" 
            borderWidth="1px" 
            borderColor={borderColor}
          >
            <Heading as="h3" size="md" mb={4}>
              Detalles del error
            </Heading>
            {errorDetails ? (
              <Code 
                p={4} 
                borderRadius="md" 
                width="100%" 
                overflowX="auto" 
                fontSize="sm"
                whiteSpace="pre-wrap"
              >
                {errorDetails}
              </Code>
            ) : (
              <Text>No hay detalles adicionales disponibles.</Text>
            )}
          </Box>
          
          <Box textAlign="center" mt={6}>
            <Button 
              as={Link} 
              to="/" 
              colorScheme="blue" 
              size="lg"
            >
              Volver al inicio
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ErrorBoundary;
