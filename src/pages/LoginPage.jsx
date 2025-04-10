import React, { useState, useEffect } from "react";
import { setDocumentMeta } from "../utils/metaUtils";
import { Link as RouterLink, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Divider,
  useColorModeValue,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Obtener la ruta de redirección si existe (primero de searchParams, luego de location.state)
  const from = searchParams.get("from") || location.state?.from || "/";

  useEffect(() => {
    setDocumentMeta(
      "Iniciar Sesión",
      "Inicia sesión en tu cuenta para acceder a tus pedidos, favoritos y más."
    );
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado", { email, password });

    if (!validateForm()) {
      console.log("Formulario inválido", errors);
      return;
    }

    setIsSubmitting(true);
    setLoginError("");

    try {
      console.log("Intentando login");
      await login({ email, password });
      console.log("Login exitoso, redirigiendo a", from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error en submit de login:", error);
      setLoginError("Credenciales inválidas. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
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
            <Button as={RouterLink} to="/cart" colorScheme="whiteAlpha">
              Carrito
            </Button>
            <Button as={RouterLink} to="/login" colorScheme="whiteAlpha" variant="solid">
              Iniciar Sesión
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="container.md" py={12}>
        <Box
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Stack spacing={6}>
            <Heading as="h1" size="xl" textAlign="center">
              Iniciar Sesión
            </Heading>

            {loginError && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {loginError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  isLoading={isSubmitting}
                  loadingText="Iniciando sesión"
                >
                  Iniciar Sesión
                </Button>
              </Stack>
            </form>

            <Flex align="center" justify="center">
              <Text>¿Olvidaste tu contraseña?</Text>
              <Button variant="link" colorScheme="blue" ml={2}>
                Recuperar
              </Button>
            </Flex>

            <Divider />

            <Box textAlign="center">
              <Text mb={2}>¿No tienes una cuenta?</Text>
              <Button
                as={RouterLink}
                to="/register"
                colorScheme="blue"
                variant="outline"
              >
                Crear Cuenta
              </Button>
            </Box>
          </Stack>
        </Box>
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

export default LoginPage;
