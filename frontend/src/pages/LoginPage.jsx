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
  IconButton,
  VStack,
  HStack,
  Checkbox,
  Image,
  SimpleGrid,
  Icon
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import BRAND from "../constants/brandConfig";

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
      `Iniciar Sesión | ${BRAND.NAME}`,
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
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      {/* Main Content */}
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
          {/* Left Side - Brand */}
          <Box display={{ base: "none", lg: "block" }}>
            <VStack spacing={8} align="flex-start">
              <Box as={RouterLink} to="/" display="flex" alignItems="center">
                {/* Nike-style Swoosh Logo */}
                <Box
                  as="svg"
                  height="60px"
                  width="60px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  mr={2}
                >
                  <path d="M21.5,7.5c-1.3,1.8-2.5,3.2-3.9,4.5c-1.9,1.8-3.8,3.1-5.6,4.3c-2.9,1.8-5.8,2.5-8.7,2.7c-0.8,0-1.3-0.1-1.3-0.5 c0-0.2,0.1-0.3,0.3-0.5c2.8-2.8,7.1-7.1,13.9-10.5c0.7-0.3,1.3-0.6,1.8-0.8c0.9-0.4,1.7-0.7,2.4-0.7c0.4,0,0.7,0.1,0.9,0.3 c0.2,0.2,0.3,0.5,0.3,0.8C21.7,7.2,21.6,7.4,21.5,7.5z"/>
                </Box>
                <Heading size="2xl" fontWeight="black">{BRAND.NAME}</Heading>
              </Box>

              <Heading
                as="h1"
                size="3xl"
                lineHeight="1.1"
                fontWeight="black"
                textTransform="uppercase"
              >
                TU CUENTA<br />PARA TODO<br />LO RELACIONADO<br />CON {BRAND.NAME}
              </Heading>

              <Text fontSize="lg" maxW="450px">
                Inicia sesión para acceder a tus pedidos, favoritos y recomendaciones personalizadas.
                Forma parte de la comunidad {BRAND.NAME} para disfrutar de beneficios exclusivos.
              </Text>

              <Image
                src="https://placehold.co/600x400/black/white?text=SPORTFUSION+MEMBERS"
                alt="Miembros SportFusion"
                borderRadius="lg"
                maxW="450px"
              />
            </VStack>
          </Box>

          {/* Right Side - Login Form */}
          <Box>
            <Box
              bg={useColorModeValue("white", "gray.800")}
              p={{ base: 6, md: 10 }}
              borderRadius="xl"
              shadow="lg"
              maxW="500px"
              mx="auto"
            >
              <VStack spacing={8} align="stretch">
                <VStack spacing={2} align="center">
                  <Heading
                    as="h2"
                    size="xl"
                    textTransform="uppercase"
                    fontWeight="black"
                  >
                    INICIAR SESIÓN
                  </Heading>
                  <Text color={useColorModeValue("gray.600", "gray.400")}>
                    Con tu cuenta de {BRAND.NAME}
                  </Text>
                </VStack>

                {loginError && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {loginError}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <VStack spacing={6}>
                    <FormControl isInvalid={errors.email}>
                      <FormLabel fontWeight="medium">Email</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="lg"
                        borderRadius="md"
                        borderColor={useColorModeValue("gray.300", "gray.600")}
                        _focus={{ borderColor: "black", boxShadow: "none" }}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.password}>
                      <FormLabel fontWeight="medium">Contraseña</FormLabel>
                      <InputGroup size="lg">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          borderRadius="md"
                          borderColor={useColorModeValue("gray.300", "gray.600")}
                          _focus={{ borderColor: "black", boxShadow: "none" }}
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

                    <Flex justify="space-between" w="full">
                      <Checkbox colorScheme="blackAlpha" defaultChecked>
                        Mantener sesión iniciada
                      </Checkbox>

                      <Button
                        variant="link"
                        color={useColorModeValue("gray.700", "gray.300")}
                        fontWeight="medium"
                        _hover={{ color: "black" }}
                        as={RouterLink}
                        to="/forgot-password"
                      >
                        ¿Olvidaste tu contraseña?
                      </Button>
                    </Flex>

                    <Button
                      type="submit"
                      bg="black"
                      color="white"
                      size="lg"
                      width="full"
                      borderRadius="full"
                      py={6}
                      _hover={{ bg: "gray.800" }}
                      isLoading={isSubmitting}
                      loadingText="Iniciando sesión"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      Iniciar Sesión
                    </Button>
                  </VStack>
                </form>

                <Text textAlign="center" color={useColorModeValue("gray.600", "gray.400")}>
                  ¿No tienes una cuenta?
                  <Button
                    as={RouterLink}
                    to="/register"
                    variant="link"
                    ml={2}
                    fontWeight="bold"
                    color={useColorModeValue("black", "white")}
                  >
                    Únete ahora
                  </Button>
                </Text>

                <Divider />

                <VStack spacing={4}>
                  <Text fontWeight="medium" textAlign="center">
                    O inicia sesión con
                  </Text>

                  <HStack spacing={4} justify="center">
                    <Button
                      leftIcon={<Icon as={FaFacebook} />}
                      colorScheme="facebook"
                      variant="outline"
                      borderRadius="full"
                      w="120px"
                    >
                      Facebook
                    </Button>

                    <Button
                      leftIcon={<Icon as={FaGoogle} />}
                      colorScheme="red"
                      variant="outline"
                      borderRadius="full"
                      w="120px"
                    >
                      Google
                    </Button>

                    <Button
                      leftIcon={<Icon as={FaApple} />}
                      colorScheme="blackAlpha"
                      variant="outline"
                      borderRadius="full"
                      w="120px"
                    >
                      Apple
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Footer */}
      <Box bg={useColorModeValue("gray.100", "gray.900")} py={8} px={8}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} mb={8}>
            <VStack align="flex-start" spacing={3}>
              <Heading as="h4" size="sm" textTransform="uppercase">
                Ayuda
              </Heading>
              <Button as={RouterLink} to="/contact" variant="link" justifyContent="flex-start" size="sm">
                Contacto
              </Button>
              <Button as={RouterLink} to="/shipping" variant="link" justifyContent="flex-start" size="sm">
                Envíos
              </Button>
              <Button as={RouterLink} to="/returns" variant="link" justifyContent="flex-start" size="sm">
                Devoluciones
              </Button>
              <Button as={RouterLink} to="/faq" variant="link" justifyContent="flex-start" size="sm">
                Preguntas Frecuentes
              </Button>
            </VStack>

            <VStack align="flex-start" spacing={3}>
              <Heading as="h4" size="sm" textTransform="uppercase">
                Sobre {BRAND.NAME}
              </Heading>
              <Button as={RouterLink} to="/about" variant="link" justifyContent="flex-start" size="sm">
                Nuestra Historia
              </Button>
              <Button as={RouterLink} to="/stores" variant="link" justifyContent="flex-start" size="sm">
                Tiendas
              </Button>
              <Button as={RouterLink} to="/sustainability" variant="link" justifyContent="flex-start" size="sm">
                Sostenibilidad
              </Button>
              <Button as={RouterLink} to="/careers" variant="link" justifyContent="flex-start" size="sm">
                Trabaja con Nosotros
              </Button>
            </VStack>

            <VStack align="flex-start" spacing={3}>
              <Heading as="h4" size="sm" textTransform="uppercase">
                Políticas
              </Heading>
              <Button as={RouterLink} to="/privacy" variant="link" justifyContent="flex-start" size="sm">
                Privacidad
              </Button>
              <Button as={RouterLink} to="/terms" variant="link" justifyContent="flex-start" size="sm">
                Términos y Condiciones
              </Button>
              <Button as={RouterLink} to="/cookies" variant="link" justifyContent="flex-start" size="sm">
                Cookies
              </Button>
            </VStack>

            <VStack align="flex-start" spacing={3}>
              <Heading as="h4" size="sm" textTransform="uppercase">
                Síguenos
              </Heading>
              <HStack spacing={4}>
                <Button variant="ghost" borderRadius="full" size="sm" p={0}>
                  <Icon as={FaFacebook} boxSize={5} />
                </Button>
                <Button variant="ghost" borderRadius="full" size="sm" p={0}>
                  <Icon as={FaGoogle} boxSize={5} />
                </Button>
                <Button variant="ghost" borderRadius="full" size="sm" p={0}>
                  <Icon as={FaApple} boxSize={5} />
                </Button>
              </HStack>
            </VStack>
          </SimpleGrid>

          <Divider borderColor={useColorModeValue("gray.300", "gray.700")} />

          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "center" }}
            pt={6}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            <Text>© {new Date().getFullYear()} {BRAND.NAME}. Todos los derechos reservados.</Text>
            <Text mt={{ base: 2, md: 0 }}>{BRAND.SLOGAN}</Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
