import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Stack,
  Divider,
  HStack,
  Icon,
  VStack,
  SimpleGrid,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
} from "@chakra-ui/react";
import { ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
import { FaTag, FaFire, FaClock, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { setDocumentMeta } from "../utils/metaUtils";
import BRAND from "../constants/brandConfig";
import NikeStyleHero from "../components/NikeStyleHero";

// Datos de ejemplo para ofertas (estilo Nike)
const mockOffers = [
  {
    id: "o1",
    name: "Zapatillas Air Max",
    description: "Amortiguación excepcional y estilo icónico para tu día a día",
    originalPrice: 159.99,
    discountPrice: 129.99,
    discountPercentage: 20,
    image: "https://placehold.co/300x300/black/white?text=Air+Max",
    category: "Calzado",
    gender: "Hombre",
    stock: 10,
    rating: 4.8,
    reviewCount: 120,
    badge: "Oferta Flash",
    endsIn: "2 días",
    isBestseller: true
  },
  {
    id: "o2",
    name: "Camiseta Dri-FIT",
    description: "Manténte fresco y seco durante tus entrenamientos",
    originalPrice: 49.99,
    discountPrice: 34.99,
    discountPercentage: 30,
    image: "https://placehold.co/300x300/black/white?text=Dri-FIT",
    category: "Ropa",
    gender: "Hombre",
    stock: 15,
    rating: 4.5,
    reviewCount: 85,
    badge: "Oferta Limitada",
    endsIn: "3 días",
    isBestseller: false
  },
  {
    id: "o3",
    name: "Zapatillas Running React",
    description: "Ligereza y respuesta para tus carreras diarias",
    originalPrice: 139.99,
    discountPrice: 119.99,
    discountPercentage: 15,
    image: "https://placehold.co/300x300/black/white?text=React",
    category: "Calzado",
    gender: "Mujer",
    stock: 8,
    rating: 4.6,
    reviewCount: 67,
    badge: "Oferta Especial",
    endsIn: "1 semana",
    isBestseller: true
  },
  {
    id: "o4",
    name: "Leggings Pro",
    description: "Ajuste perfecto y soporte para cualquier entrenamiento",
    originalPrice: 69.99,
    discountPrice: 49.99,
    discountPercentage: 30,
    image: "https://placehold.co/300x300/black/white?text=Leggings",
    category: "Ropa",
    gender: "Mujer",
    stock: 12,
    rating: 4.3,
    reviewCount: 56,
    badge: "Oferta Relámpago",
    endsIn: "24 horas",
    isBestseller: false
  },
  {
    id: "o5",
    name: "Mochila Training",
    description: "Espacio para todo tu equipo con compartimentos organizados",
    originalPrice: 89.99,
    discountPrice: 65.99,
    discountPercentage: 25,
    image: "https://placehold.co/300x300/black/white?text=Mochila",
    category: "Accesorios",
    gender: "Unisex",
    stock: 7,
    rating: 4.7,
    reviewCount: 38,
    badge: "Oferta Exclusiva",
    endsIn: "4 días",
    isBestseller: false
  },
  {
    id: "o6",
    name: "Zapatillas Niños Star Runner",
    description: "Comodidad y durabilidad para los más pequeños",
    originalPrice: 69.99,
    discountPrice: 54.99,
    discountPercentage: 20,
    image: "https://placehold.co/300x300/black/white?text=Kids",
    category: "Calzado",
    gender: "Niños",
    stock: 9,
    rating: 4.4,
    reviewCount: 42,
    badge: "Oferta del Mes",
    endsIn: "5 días",
    isBestseller: false
  },
  {
    id: "o7",
    name: "Sudadera Tech Fleece",
    description: "Calidez sin peso extra para tus días fríos",
    originalPrice: 119.99,
    discountPrice: 89.99,
    discountPercentage: 25,
    image: "https://placehold.co/300x300/black/white?text=Sudadera",
    category: "Ropa",
    gender: "Hombre",
    stock: 6,
    rating: 4.9,
    reviewCount: 72,
    badge: "Oferta Especial",
    endsIn: "3 días",
    isBestseller: true
  },
  {
    id: "o8",
    name: "Balón de Fútbol Strike",
    description: "Precisión y durabilidad para tus partidos",
    originalPrice: 39.99,
    discountPrice: 29.99,
    discountPercentage: 25,
    image: "https://placehold.co/300x300/black/white?text=Balon",
    category: "Deporte",
    gender: "Unisex",
    stock: 20,
    rating: 4.5,
    reviewCount: 48,
    badge: "Oferta Limitada",
    endsIn: "1 semana",
    isBestseller: false
  }
];

const OffersPage = () => {
  const { addToCart } = useCart();
  const [sortedOffers, setSortedOffers] = useState([]);

  useEffect(() => {
    setDocumentMeta(
      `Ofertas | ${BRAND.NAME}`,
      "Descubre nuestras mejores ofertas en productos deportivos. Precios especiales por tiempo limitado."
    );

    // Ordenar ofertas por porcentaje de descuento (mayor a menor)
    const sorted = [...mockOffers].sort((a, b) => b.discountPercentage - a.discountPercentage);
    setSortedOffers(sorted);
  }, []);

  return (
    <Box>
      {/* Hero Banner */}
      <NikeStyleHero
        title="OFERTAS ESPECIALES"
        subtitle="Tiempo limitado. Precios increíbles."
        description="Aprovecha nuestras ofertas exclusivas en productos seleccionados. No esperes demasiado, estas ofertas tienen fecha límite."
        height={{ base: "50vh", md: "40vh" }}
        imageSrc="https://placehold.co/1200x400/red/white?text=OFERTAS+ESPECIALES"
        imagePosition="background"
        bgColor="red.600"
      />

      {/* Offers Categories */}
      <Container maxW="container.xl" py={10}>
        <Flex
          justify="space-between"
          wrap="wrap"
          gap={4}
          mb={10}
        >
          <Button
            size="lg"
            colorScheme="red"
            variant="ghost"
            leftIcon={<Icon as={FaFire} />}
            borderRadius="full"
            fontWeight="normal"
          >
            Ofertas Flash
          </Button>
          <Button
            size="lg"
            colorScheme="red"
            variant="ghost"
            leftIcon={<Icon as={FaTag} />}
            borderRadius="full"
            fontWeight="normal"
          >
            Descuentos Mayores
          </Button>
          <Button
            size="lg"
            colorScheme="red"
            variant="ghost"
            leftIcon={<Icon as={FaClock} />}
            borderRadius="full"
            fontWeight="normal"
          >
            Últimas Horas
          </Button>
        </Flex>

        {/* Offers Grid */}
        <Box id="offers">
          <Heading as="h2" size="xl" mb={8}>
            Ofertas Destacadas
          </Heading>

          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={8}
          >
            {offers.map(offer => (
              <Box
                key={offer.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg={useColorModeValue("white", "gray.800")}
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                position="relative"
              >
                {/* Discount Badge */}
                <Badge
                  position="absolute"
                  top="10px"
                  right="10px"
                  colorScheme="red"
                  fontSize="md"
                  borderRadius="md"
                  px={2}
                  py={1}
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {offer.discountPercentage}% OFF
                </Badge>

                {/* Offer Badge */}
                <Badge
                  position="absolute"
                  top="10px"
                  left="10px"
                  colorScheme="purple"
                  fontSize="sm"
                  borderRadius="md"
                  px={2}
                  py={1}
                >
                  {offer.badge}
                </Badge>

                <Image
                  src={offer.image}
                  alt={offer.name}
                  height="220px"
                  width="100%"
                  objectFit="cover"
                />

                <Box p={5}>
                  <Box mb={2}>
                    <Heading as="h3" size="md" height="50px" overflow="hidden">
                      {offer.name}
                    </Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")} noOfLines={2}>
                      {offer.description}
                    </Text>
                  </Box>

                  <HStack spacing={1} mt={2} mb={2}>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < Math.floor(offer.rating) ? "yellow.400" : "gray.300"}
                        />
                      ))}
                    <Text ml={1} fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
                      ({offer.reviewCount})
                    </Text>
                  </HStack>

                  <HStack spacing={2} mt={3} color="red.500">
                    <Icon as={FaClock} />
                    <Text fontSize="sm" fontWeight="medium">
                      Termina en: {offer.endsIn}
                    </Text>
                  </HStack>

                  <Divider my={3} />

                  <Flex justify="space-between" align="center">
                    <Stack>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color={useColorModeValue("gray.700", "white")}
                      >
                        ${offer.discountPrice.toFixed(2)}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={useColorModeValue("gray.500", "gray.400")}
                        textDecoration="line-through"
                      >
                        ${offer.originalPrice.toFixed(2)}
                      </Text>
                    </Stack>
                    <Button
                      colorScheme="red"
                      onClick={() => addToCart({
                        ...offer,
                        price: offer.discountPrice
                      })}
                    >
                      Añadir
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          mt={16}
          p={8}
          bg={useColorModeValue("gray.100", "gray.700")}
          borderRadius="lg"
          textAlign="center"
        >
          <Heading as="h3" size="lg" mb={4}>
            ¿Quieres recibir alertas de ofertas?
          </Heading>
          <Text mb={6} maxW="container.md" mx="auto">
            Suscríbete a nuestro newsletter y recibe notificaciones sobre nuevas ofertas y descuentos exclusivos.
          </Text>
          <Button
            as={RouterLink}
            to="/contact"
            colorScheme="brand"
            size="lg"
          >
            Suscribirse Ahora
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OffersPage;
