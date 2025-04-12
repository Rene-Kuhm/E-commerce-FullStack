import React, { useState, useEffect } from "react";
import { setDocumentMeta } from "../utils/metaUtils";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  IconButton,
  Checkbox
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentMeta(
      "Crear Cuenta",
      "Regístrate para disfrutar de una experiencia de compra personalizada, seguimiento de pedidos y ofertas exclusivas."
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = "El nombre es requerido";
    }

    if (!formData.last_name) {
      newErrors.last_name = "El apellido es requerido";
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Las contraseñas no coinciden";
    }

    if (!acceptTerms) {
      newErrors.terms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario de registro enviado", formData);

    if (!validateForm()) {
      console.log("Formulario de registro inválido", errors);
      return;
    }

    setIsSubmitting(true);
    setRegisterError("");

    try {
      console.log("Intentando registro");
      await register(formData);
      console.log("Registro exitoso, redirigiendo a inicio");
      navigate("/");
    } catch (error) {
      console.error("Error en submit de registro:", error);
      setRegisterError("Error al registrar usuario. Por favor, intenta de nuevo.");
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
            <Button as={RouterLink} to="/login" colorScheme="whiteAlpha">
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
              Crear Cuenta
            </Heading>

            {registerError && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {registerError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Flex direction={{ base: "column", md: "row" }} gap={4}>
                  <FormControl isInvalid={errors.first_name}>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.last_name}>
                    <FormLabel>Apellido</FormLabel>
                    <Input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.last_name}</FormErrorMessage>
                  </FormControl>
                </Flex>

                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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

                <FormControl isInvalid={errors.confirm_password}>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.terms}>
                  <Checkbox
                    isChecked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  >
                    Acepto los términos y condiciones
                  </Checkbox>
                  <FormErrorMessage>{errors.terms}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  isLoading={isSubmitting}
                  loadingText="Registrando"
                >
                  Crear Cuenta
                </Button>
              </Stack>
            </form>

            <Divider />

            <Box textAlign="center">
              <Text mb={2}>¿Ya tienes una cuenta?</Text>
              <Button
                as={RouterLink}
                to="/login"
                colorScheme="blue"
                variant="outline"
              >
                Iniciar Sesión
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

export default RegisterPage;
