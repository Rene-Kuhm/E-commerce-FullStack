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
  Image,
  useColorModeValue,
  SimpleGrid,
  Icon,
  VStack
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaShippingFast, FaUndo, FaHeadset, FaShieldAlt } from "react-icons/fa";
import NikeStyleHero from "../components/NikeStyleHero";
import BRAND from "../constants/brandConfig";

const HomePage = () => {
  // No necesitamos usar el contexto de autenticación por ahora
  useAuth();

  useEffect(() => {
    setDocumentMeta(
      "Inicio",
      `${BRAND.NAME} - ${BRAND.SLOGAN}. Descubre nuestra colección de productos deportivos de alta calidad.`
    );
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <NikeStyleHero
        title="SUPERA TUS LÍMITES"
        subtitle="Nueva colección de verano"
        description="Descubre nuestra nueva línea de productos diseñados para ayudarte a alcanzar tu máximo rendimiento. Calidad, estilo e innovación en cada detalle."
        ctaText="Comprar Ahora"
        ctaLink="/products?gender=men"
        secondaryCtaText="Explorar Colección"
        secondaryCtaLink="/new-arrivals"
        imageSrc="https://placehold.co/1200x800/black/white?text=SPORTFUSION+COLLECTION"
        imageAlt="SportFusion Collection"
        imagePosition="right"
      />

      {/* Categories Section */}
      <Box py={20} bg={useColorModeValue("gray.50", "gray.900")}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading
                as="h2"
                size="xl"
                textTransform="uppercase"
                fontWeight="black"
              >
                CATEGORÍAS DESTACADAS
              </Heading>
              <Text fontSize="lg" maxW="container.md">
                Explora nuestras categorías más populares y encuentra los productos perfectos para ti
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
              {/* Men Category */}
              <Box
                position="relative"
                h="400px"
                overflow="hidden"
                borderRadius="md"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.02)" }}
              >
                <Image
                  src="https://placehold.co/600x800/black/white?text=HOMBRE"
                  alt="Categoría Hombre"
                  objectFit="cover"
                  w="full"
                  h="full"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="blackAlpha.700"
                  p={6}
                >
                  <Heading as="h3" size="lg" color="white" mb={2}>
                    HOMBRE
                  </Heading>
                  <Button
                    as={RouterLink}
                    to="/products?gender=men"
                    rightIcon={<ChevronRightIcon />}
                    variant="outline"
                    colorScheme="whiteAlpha"
                    borderRadius="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Ver Colección
                  </Button>
                </Box>
              </Box>

              {/* Women Category */}
              <Box
                position="relative"
                h="400px"
                overflow="hidden"
                borderRadius="md"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.02)" }}
              >
                <Image
                  src="https://placehold.co/600x800/black/white?text=MUJER"
                  alt="Categoría Mujer"
                  objectFit="cover"
                  w="full"
                  h="full"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="blackAlpha.700"
                  p={6}
                >
                  <Heading as="h3" size="lg" color="white" mb={2}>
                    MUJER
                  </Heading>
                  <Button
                    as={RouterLink}
                    to="/products?gender=women"
                    rightIcon={<ChevronRightIcon />}
                    variant="outline"
                    colorScheme="whiteAlpha"
                    borderRadius="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Ver Colección
                  </Button>
                </Box>
              </Box>

              {/* Kids Category */}
              <Box
                position="relative"
                h="400px"
                overflow="hidden"
                borderRadius="md"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.02)" }}
              >
                <Image
                  src="https://placehold.co/600x800/black/white?text=NIÑOS"
                  alt="Categoría Niños"
                  objectFit="cover"
                  w="full"
                  h="full"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="blackAlpha.700"
                  p={6}
                >
                  <Heading as="h3" size="lg" color="white" mb={2}>
                    NIÑOS
                  </Heading>
                  <Button
                    as={RouterLink}
                    to="/products?gender=kids"
                    rightIcon={<ChevronRightIcon />}
                    variant="outline"
                    colorScheme="whiteAlpha"
                    borderRadius="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Ver Colección
                  </Button>
                </Box>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
            <VStack align="center" spacing={4}>
              <Icon as={FaShippingFast} boxSize={12} color="black" />
              <Heading as="h3" size="md" textTransform="uppercase">
                Envío Rápido
              </Heading>
              <Text textAlign="center">
                Entrega en 2-5 días hábiles. Envío gratis en compras mayores a $100.
              </Text>
            </VStack>

            <VStack align="center" spacing={4}>
              <Icon as={FaUndo} boxSize={12} color="black" />
              <Heading as="h3" size="md" textTransform="uppercase">
                Devoluciones Fáciles
              </Heading>
              <Text textAlign="center">
                30 días para devoluciones. Proceso simple y sin complicaciones.
              </Text>
            </VStack>

            <VStack align="center" spacing={4}>
              <Icon as={FaShieldAlt} boxSize={12} color="black" />
              <Heading as="h3" size="md" textTransform="uppercase">
                Compra Segura
              </Heading>
              <Text textAlign="center">
                Transacciones 100% seguras. Protegemos tus datos personales.
              </Text>
            </VStack>

            <VStack align="center" spacing={4}>
              <Icon as={FaHeadset} boxSize={12} color="black" />
              <Heading as="h3" size="md" textTransform="uppercase">
                Soporte 24/7
              </Heading>
              <Text textAlign="center">
                Atención al cliente disponible todos los días a cualquier hora.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box py={20} bg="black" color="white">
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading
                as="h2"
                size="xl"
                textTransform="uppercase"
                fontWeight="black"
              >
                PRODUCTOS DESTACADOS
              </Heading>
              <Text fontSize="lg" maxW="container.md">
                Descubre nuestros productos más populares y las últimas novedades
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {/* Featured Product 1 */}
              <Box
                bg="gray.900"
                borderRadius="md"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: "translateY(-8px)" }}
              >
                <Image
                  src="https://placehold.co/400x400/gray/white?text=Producto+1"
                  alt="Producto Destacado 1"
                  w="full"
                />
                <Box p={4}>
                  <Text color="gray.400" mb={1}>Running</Text>
                  <Heading as="h3" size="md" mb={2} noOfLines={1}>
                    Zapatillas Performance
                  </Heading>
                  <Text fontWeight="bold" mb={4}>$129.99</Text>
                  <Button
                    as={RouterLink}
                    to="/products/1"
                    variant="outline"
                    borderRadius="full"
                    size="sm"
                    width="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </Box>

              {/* Featured Product 2 */}
              <Box
                bg="gray.900"
                borderRadius="md"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: "translateY(-8px)" }}
              >
                <Image
                  src="https://placehold.co/400x400/gray/white?text=Producto+2"
                  alt="Producto Destacado 2"
                  w="full"
                />
                <Box p={4}>
                  <Text color="gray.400" mb={1}>Training</Text>
                  <Heading as="h3" size="md" mb={2} noOfLines={1}>
                    Camiseta Dri-FIT
                  </Heading>
                  <Text fontWeight="bold" mb={4}>$49.99</Text>
                  <Button
                    as={RouterLink}
                    to="/products/2"
                    variant="outline"
                    borderRadius="full"
                    size="sm"
                    width="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </Box>

              {/* Featured Product 3 */}
              <Box
                bg="gray.900"
                borderRadius="md"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: "translateY(-8px)" }}
              >
                <Image
                  src="https://placehold.co/400x400/gray/white?text=Producto+3"
                  alt="Producto Destacado 3"
                  w="full"
                />
                <Box p={4}>
                  <Text color="gray.400" mb={1}>Lifestyle</Text>
                  <Heading as="h3" size="md" mb={2} noOfLines={1}>
                    Sudadera Tech Fleece
                  </Heading>
                  <Text fontWeight="bold" mb={4}>$89.99</Text>
                  <Button
                    as={RouterLink}
                    to="/products/3"
                    variant="outline"
                    borderRadius="full"
                    size="sm"
                    width="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </Box>

              {/* Featured Product 4 */}
              <Box
                bg="gray.900"
                borderRadius="md"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: "translateY(-8px)" }}
              >
                <Image
                  src="https://placehold.co/400x400/gray/white?text=Producto+4"
                  alt="Producto Destacado 4"
                  w="full"
                />
                <Box p={4}>
                  <Text color="gray.400" mb={1}>Basketball</Text>
                  <Heading as="h3" size="md" mb={2} noOfLines={1}>
                    Zapatillas Air Precision
                  </Heading>
                  <Text fontWeight="bold" mb={4}>$159.99</Text>
                  <Button
                    as={RouterLink}
                    to="/products/4"
                    variant="outline"
                    borderRadius="full"
                    size="sm"
                    width="full"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </Box>
            </SimpleGrid>

            <Button
              as={RouterLink}
              to="/products"
              size="lg"
              bg="white"
              color="black"
              borderRadius="full"
              px={8}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              fontWeight="bold"
            >
              Ver Todos los Productos
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Join Us Banner */}
      <Box py={20} bg={useColorModeValue("gray.100", "gray.800")}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading
              as="h2"
              size="2xl"
              textTransform="uppercase"
              fontWeight="black"
              letterSpacing="wider"
            >
              ÚNETE A LA COMUNIDAD
            </Heading>
            <Text fontSize="xl" maxW="container.md">
              Recibe las últimas novedades, acceso exclusivo a productos y ofertas especiales
            </Text>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              bg="black"
              color="white"
              borderRadius="full"
              px={10}
              py={7}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              fontWeight="bold"
              fontSize="lg"
            >
              REGISTRARSE AHORA
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
