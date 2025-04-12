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
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaRegClock, FaFire, FaLeaf, FaRegStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { setDocumentMeta } from "../utils/metaUtils";
import BRAND from "../constants/brandConfig";

// Datos de ejemplo para nuevos productos
const mockNewProducts = [
  {
    id: "1",
    name: "Smartphone Galaxy Ultra",
    description: "El último modelo con cámara de 108MP y zoom 100x",
    price: 1299.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Smartphone",
    category: "Electrónica",
    stock: 10,
    rating: 4.9,
    reviewCount: 12,
    badge: "Nuevo",
    arrivedDaysAgo: 2
  },
  {
    id: "2",
    name: "Auriculares Noise Cancelling Pro",
    description: "Cancelación de ruido activa y 30 horas de batería",
    price: 349.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Headphones",
    category: "Accesorios",
    stock: 15,
    rating: 4.8,
    reviewCount: 8,
    badge: "Nuevo",
    arrivedDaysAgo: 3
  },
  {
    id: "3",
    name: "Smartwatch Health Monitor",
    description: "Monitoreo avanzado de salud y GPS integrado",
    price: 299.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Smartwatch",
    category: "Accesorios",
    stock: 8,
    rating: 4.7,
    reviewCount: 5,
    badge: "Nuevo",
    arrivedDaysAgo: 1
  },
  {
    id: "4",
    name: "Laptop Pro Creator Edition",
    description: "Potente laptop para profesionales creativos",
    price: 2499.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Laptop",
    category: "Electrónica",
    stock: 5,
    rating: 5.0,
    reviewCount: 3,
    badge: "Nuevo",
    arrivedDaysAgo: 5
  },
  {
    id: "5",
    name: "Cámara Mirrorless 8K",
    description: "Grabación en 8K y estabilización avanzada",
    price: 3499.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Camera",
    category: "Electrónica",
    stock: 4,
    rating: 4.9,
    reviewCount: 7,
    badge: "Nuevo",
    arrivedDaysAgo: 4
  },
  {
    id: "6",
    name: "Altavoz Inteligente 360",
    description: "Sonido envolvente y asistente de voz integrado",
    price: 199.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Speaker",
    category: "Accesorios",
    stock: 12,
    rating: 4.6,
    reviewCount: 9,
    badge: "Nuevo",
    arrivedDaysAgo: 6
  },
  {
    id: "7",
    name: "Tablet Ultra Delgada",
    description: "Pantalla AMOLED de 12 pulgadas y lápiz incluido",
    price: 899.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Tablet",
    category: "Electrónica",
    stock: 7,
    rating: 4.8,
    reviewCount: 6,
    badge: "Nuevo",
    arrivedDaysAgo: 2
  },
  {
    id: "8",
    name: "Drone 4K con Seguimiento",
    description: "Grabación en 4K y seguimiento automático de objetos",
    price: 799.99,
    image: "https://placehold.co/300x300/blue/white?text=New+Drone",
    category: "Electrónica",
    stock: 3,
    rating: 4.7,
    reviewCount: 4,
    badge: "Nuevo",
    arrivedDaysAgo: 7
  }
];

// Categorías para filtrar
const categories = [
  { value: "", label: "Todas las categorías" },
  { value: "Electrónica", label: "Electrónica" },
  { value: "Accesorios", label: "Accesorios" },
];

// Opciones de ordenamiento
const sortOptions = [
  { value: "newest", label: "Más recientes primero" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
];

const NewArrivalsPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(mockNewProducts);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  useEffect(() => {
    setDocumentMeta(
      "Nuevos Productos", 
      "Descubre nuestras últimas novedades. Productos recién llegados a nuestra tienda."
    );
  }, []);
  
  // Filtrar y ordenar productos
  useEffect(() => {
    let filteredProducts = [...mockNewProducts];
    
    // Aplicar filtro de categoría
    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        product => product.category === categoryFilter
      );
    }
    
    // Aplicar ordenamiento
    switch (sortBy) {
      case "newest":
        filteredProducts.sort((a, b) => a.arrivedDaysAgo - b.arrivedDaysAgo);
        break;
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setProducts(filteredProducts);
  }, [categoryFilter, sortBy]);
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg={useColorModeValue("blue.500", "blue.700")} 
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
          backgroundImage="url('https://placehold.co/1200x400/blue/white?text=NOVEDADES')"
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
              Recién Llegados
            </Badge>
            <Heading 
              as="h1" 
              size="2xl" 
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.2)"
            >
              Nuevos Productos
            </Heading>
            <Text fontSize="xl" maxW="container.md">
              Descubre nuestras últimas novedades. Productos recién llegados a nuestra tienda.
            </Text>
            <HStack spacing={4} mt={4}>
              <Button 
                as={RouterLink} 
                to="#products" 
                colorScheme="white" 
                size="lg"
                variant="outline"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Ver Novedades
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

      {/* Products Section */}
      <Container maxW="container.xl" py={10}>
        <Tabs colorScheme="blue" mb={8}>
          <TabList>
            <Tab fontWeight="semibold">Todos</Tab>
            <Tab fontWeight="semibold">Electrónica</Tab>
            <Tab fontWeight="semibold">Accesorios</Tab>
            <Tab fontWeight="semibold">Más Vendidos</Tab>
          </TabList>
        </Tabs>
        
        {/* Filters */}
        <Flex 
          justify="space-between" 
          align="center" 
          mb={8}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <HStack spacing={4}>
            <Button 
              size="sm" 
              colorScheme="blue" 
              variant="ghost" 
              leftIcon={<Icon as={FaFire} />}
              borderRadius="full"
            >
              Tendencias
            </Button>
            <Button 
              size="sm" 
              colorScheme="blue" 
              variant="ghost" 
              leftIcon={<Icon as={FaRegStar} />}
              borderRadius="full"
            >
              Destacados
            </Button>
            <Button 
              size="sm" 
              colorScheme="blue" 
              variant="ghost" 
              leftIcon={<Icon as={FaLeaf} />}
              borderRadius="full"
            >
              Eco-Friendly
            </Button>
          </HStack>
          
          <HStack spacing={4}>
            <Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              size="sm"
              w="200px"
              borderRadius="md"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </HStack>
        </Flex>

        {/* Products Grid */}
        <Box id="products">
          <Heading as="h2" size="xl" mb={8}>
            Últimas Novedades
          </Heading>
          
          <Grid 
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={6}
          >
            {products.map(product => (
              <Box 
                key={product.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg={useColorModeValue("white", "gray.800")}
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                position="relative"
              >
                {/* New Badge */}
                <Badge 
                  position="absolute" 
                  top="10px" 
                  right="10px" 
                  colorScheme="blue" 
                  fontSize="sm" 
                  borderRadius="md"
                  px={2}
                  py={1}
                >
                  {product.badge}
                </Badge>
                
                <Image 
                  src={product.image} 
                  alt={product.name}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                
                <Box p={4}>
                  <Box mb={2}>
                    <Heading as="h3" size="md" noOfLines={1}>
                      {product.name}
                    </Heading>
                    <Text color={useColorModeValue("gray.600", "gray.400")} noOfLines={2} fontSize="sm" mt={1}>
                      {product.description}
                    </Text>
                  </Box>
                  
                  <HStack spacing={1} mt={2}>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < Math.floor(product.rating) ? "yellow.400" : "gray.300"}
                          size="sm"
                        />
                      ))}
                    <Text ml={1} fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
                      ({product.reviewCount})
                    </Text>
                  </HStack>
                  
                  <HStack spacing={2} mt={2} color="blue.500" fontSize="xs">
                    <Icon as={FaRegClock} />
                    <Text>
                      Hace {product.arrivedDaysAgo} {product.arrivedDaysAgo === 1 ? "día" : "días"}
                    </Text>
                  </HStack>
                  
                  <Divider my={3} />
                  
                  <Flex justify="space-between" align="center">
                    <Text 
                      fontSize="lg" 
                      fontWeight="bold" 
                      color={useColorModeValue("gray.700", "white")}
                    >
                      ${product.price.toFixed(2)}
                    </Text>
                    <Button 
                      colorScheme="blue" 
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      Añadir
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
        
        {/* Coming Soon Section */}
        <Box 
          mt={16} 
          p={8} 
          bg={useColorModeValue("blue.50", "blue.900")} 
          borderRadius="lg"
        >
          <Flex 
            direction={{ base: "column", md: "row" }} 
            align="center" 
            justify="space-between"
            gap={8}
          >
            <Box maxW={{ base: "100%", md: "60%" }}>
              <Heading as="h3" size="lg" mb={4} color="blue.600">
                Próximamente
              </Heading>
              <Text mb={4}>
                Estamos preparando nuevos productos increíbles que llegarán pronto a nuestra tienda. 
                Suscríbete para ser el primero en enterarte cuando estén disponibles.
              </Text>
              <Button 
                as={RouterLink} 
                to="/contact" 
                colorScheme="blue" 
                size="lg"
              >
                Recibir Notificaciones
              </Button>
            </Box>
            <Image 
              src="https://placehold.co/400x300/blue/white?text=Coming+Soon" 
              alt="Próximamente"
              borderRadius="md"
              shadow="md"
              maxW={{ base: "100%", md: "40%" }}
            />
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default NewArrivalsPage;
