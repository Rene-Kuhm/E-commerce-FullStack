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
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaTag, FaFire, FaClock } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { setDocumentMeta } from "../utils/metaUtils";
import BRAND from "../constants/brandConfig";

// Datos de ejemplo para ofertas
const mockOffers = [
  {
    id: "1",
    name: "Smartphone XYZ Pro",
    description: "El último modelo con 50% de descuento",
    originalPrice: 999.99,
    discountPrice: 499.99,
    discountPercentage: 50,
    image: "https://placehold.co/300x300/red/white?text=50%25+OFF",
    category: "Electrónica",
    stock: 5,
    rating: 4.8,
    reviewCount: 120,
    badge: "Oferta Flash",
    endsIn: "2 días"
  },
  {
    id: "2",
    name: "Auriculares Inalámbricos Premium",
    description: "Sonido de alta calidad con 40% de descuento",
    originalPrice: 199.99,
    discountPrice: 119.99,
    discountPercentage: 40,
    image: "https://placehold.co/300x300/red/white?text=40%25+OFF",
    category: "Accesorios",
    stock: 15,
    rating: 4.5,
    reviewCount: 85,
    badge: "Oferta Limitada",
    endsIn: "3 días"
  },
  {
    id: "3",
    name: "Smartwatch Serie 5",
    description: "Monitorea tu actividad con 35% de descuento",
    originalPrice: 299.99,
    discountPrice: 194.99,
    discountPercentage: 35,
    image: "https://placehold.co/300x300/red/white?text=35%25+OFF",
    category: "Accesorios",
    stock: 8,
    rating: 4.6,
    reviewCount: 67,
    badge: "Oferta Especial",
    endsIn: "1 semana"
  },
  {
    id: "4",
    name: "Laptop Ultra Delgada",
    description: "Potente y ligera con 30% de descuento",
    originalPrice: 1499.99,
    discountPrice: 1049.99,
    discountPercentage: 30,
    image: "https://placehold.co/300x300/red/white?text=30%25+OFF",
    category: "Electrónica",
    stock: 3,
    rating: 4.9,
    reviewCount: 42,
    badge: "Oferta del Mes",
    endsIn: "5 días"
  },
  {
    id: "5",
    name: "Altavoz Bluetooth Resistente al Agua",
    description: "Sonido potente para exteriores con 45% de descuento",
    originalPrice: 129.99,
    discountPrice: 71.49,
    discountPercentage: 45,
    image: "https://placehold.co/300x300/red/white?text=45%25+OFF",
    category: "Accesorios",
    stock: 12,
    rating: 4.3,
    reviewCount: 56,
    badge: "Oferta Relámpago",
    endsIn: "24 horas"
  },
  {
    id: "6",
    name: "Cámara Digital 4K",
    description: "Captura momentos especiales con 25% de descuento",
    originalPrice: 599.99,
    discountPrice: 449.99,
    discountPercentage: 25,
    image: "https://placehold.co/300x300/red/white?text=25%25+OFF",
    category: "Electrónica",
    stock: 7,
    rating: 4.7,
    reviewCount: 38,
    badge: "Oferta Exclusiva",
    endsIn: "4 días"
  }
];

const OffersPage = () => {
  const { addToCart } = useCart();
  const [offers, setOffers] = useState(mockOffers);
  
  useEffect(() => {
    setDocumentMeta(
      "Ofertas Especiales", 
      "Descubre nuestras ofertas exclusivas con descuentos de hasta el 50%. ¡Aprovecha ahora!"
    );
  }, []);
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg={useColorModeValue("red.500", "red.700")} 
        color="white"
        py={12}
        position="relative"
        overflow="hidden"
      >
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          bottom="0" 
          opacity="0.1" 
          backgroundImage="url('https://placehold.co/1200x400/red/white?text=OFERTAS')"
          backgroundSize="cover"
          backgroundPosition="center"
        />
        <Container maxW="container.xl" position="relative">
          <VStack spacing={4} align="center" textAlign="center">
            <Badge 
              colorScheme="white" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              border="1px solid white"
            >
              Tiempo Limitado
            </Badge>
            <Heading 
              as="h1" 
              size="2xl" 
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.2)"
            >
              Ofertas Especiales
            </Heading>
            <Text fontSize="xl" maxW="container.md">
              Descubre nuestras ofertas exclusivas con descuentos de hasta el 50%. ¡No te pierdas estas oportunidades!
            </Text>
            <HStack spacing={4} mt={4}>
              <Button 
                as={RouterLink} 
                to="#offers" 
                colorScheme="white" 
                size="lg"
                variant="outline"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Ver Ofertas
              </Button>
              <Button 
                as={RouterLink} 
                to="/products" 
                colorScheme="white" 
                size="lg"
                bg="whiteAlpha.300"
                _hover={{ bg: "whiteAlpha.400" }}
              >
                Todos los Productos
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

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
