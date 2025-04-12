import React, { useState, useEffect } from "react";
import { setDocumentMeta } from "../utils/metaUtils";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Divider,
  SimpleGrid,
  HStack,
  VStack,
  Icon,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { SearchIcon, ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
import { FaFilter, FaSort, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import BRAND from "../constants/brandConfig";
import NikeStyleHero from "../components/NikeStyleHero";

// Datos de ejemplo para productos (estilo Nike)
const mockProducts = [
  {
    id: "1",
    name: "Zapatillas Air Max",
    description: "Amortiguación excepcional y estilo icónico para tu día a día",
    price: 129.99,
    image: "https://placehold.co/300x300/black/white?text=Air+Max",
    category: "Calzado",
    gender: "Hombre",
    stock: 10
  },
  {
    id: "2",
    name: "Camiseta Dri-FIT",
    description: "Manténte fresco y seco durante tus entrenamientos",
    price: 34.99,
    image: "https://placehold.co/300x300/black/white?text=Dri-FIT",
    category: "Ropa",
    gender: "Hombre",
    stock: 15
  },
  {
    id: "3",
    name: "Zapatillas Running React",
    description: "Ligereza y respuesta para tus carreras diarias",
    price: 119.99,
    image: "https://placehold.co/300x300/black/white?text=React",
    category: "Calzado",
    gender: "Mujer",
    stock: 8
  },
  {
    id: "4",
    name: "Leggings Pro",
    description: "Ajuste perfecto y soporte para cualquier entrenamiento",
    price: 49.99,
    image: "https://placehold.co/300x300/black/white?text=Leggings",
    category: "Ropa",
    gender: "Mujer",
    stock: 12
  },
  {
    id: "5",
    name: "Mochila Training",
    description: "Espacio para todo tu equipo con compartimentos organizados",
    price: 65.99,
    image: "https://placehold.co/300x300/black/white?text=Mochila",
    category: "Accesorios",
    gender: "Unisex",
    stock: 7
  },
  {
    id: "6",
    name: "Zapatillas Niños Star Runner",
    description: "Comodidad y durabilidad para los más pequeños",
    price: 54.99,
    image: "https://placehold.co/300x300/black/white?text=Kids",
    category: "Calzado",
    gender: "Niños",
    stock: 9
  },
  {
    id: "7",
    name: "Balón de Fútbol Strike",
    description: "Precisión y durabilidad para tus partidos",
    price: 29.99,
    image: "https://placehold.co/300x300/black/white?text=Balon",
    category: "Deporte",
    gender: "Unisex",
    stock: 20
  },
  {
    id: "8",
    name: "Sudadera Tech Fleece",
    description: "Calidez sin peso extra para tus días fríos",
    price: 89.99,
    image: "https://placehold.co/300x300/black/white?text=Sudadera",
    category: "Ropa",
    gender: "Hombre",
    stock: 6
  },
  {
    id: "9",
    name: "Zapatillas Lifestyle",
    description: "Estilo urbano con la máxima comodidad",
    price: 99.99,
    image: "https://placehold.co/300x300/black/white?text=Lifestyle",
    category: "Calzado",
    gender: "Mujer",
    stock: 4
  }
];

const ProductsPage = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState(searchParams.get("gender") || "");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Actualizar filtros basados en los parámetros de URL
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");

    if (gender) setGenderFilter(gender);
    if (category) setCategoryFilter(category);

    setDocumentMeta(
      "Productos | SportFusion",
      "Descubre nuestra colección de productos deportivos de alta calidad. Zapatillas, ropa y accesorios para rendimiento y estilo."
    );
  }, [searchParams]);

  // Filtrar productos según búsqueda, categoría, género y precio
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = searchTerm === "" ||
                         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "" || product.category === categoryFilter;
    const matchesGender = genderFilter === "" || product.gender.toLowerCase() === genderFilter.toLowerCase();
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesGender && matchesPrice;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default: // featured
        return 0;
    }
  });

  // Obtener categorías únicas para el filtro
  const categories = [...new Set(mockProducts.map(product => product.category))];

  // Obtener géneros únicos para el filtro
  const genders = [...new Set(mockProducts.map(product => product.gender))];

  return (
    <Box>
      {/* Hero Banner */}
      <NikeStyleHero
        title={genderFilter ? `${genderFilter.toUpperCase()}` : "PRODUCTOS"}
        subtitle={categoryFilter ? `Colección de ${categoryFilter}` : "Rendimiento y estilo para cada momento"}
        description="Descubre nuestra colección de productos diseñados para ayudarte a alcanzar tu máximo potencial."
        height={{ base: "40vh", md: "30vh" }}
        imageSrc="https://placehold.co/1200x400/black/white?text=SPORTFUSION+COLLECTION"
        imagePosition="background"
      />

      {/* Main Content */}
      <Box bg={useColorModeValue("white", "gray.900")} py={8}>
        <Container maxW="container.xl">
          {/* Breadcrumbs */}
          <Breadcrumb
            separator={<ChevronRightIcon color="gray.500" />}
            mb={6}
            color={useColorModeValue("gray.600", "gray.400")}
            fontSize="sm"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Productos</BreadcrumbLink>
            </BreadcrumbItem>
            {genderFilter && (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{genderFilter}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {categoryFilter && (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{categoryFilter}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>

          {/* Filters and Products */}
          <Flex direction={{ base: "column", lg: "row" }} gap={8}>
            {/* Filters Sidebar */}
            <Box
              w={{ base: "full", lg: "250px" }}
              display={{ base: showFilters ? "block" : "none", lg: "block" }}
              bg={useColorModeValue("white", "gray.800")}
              p={4}
              borderRadius="md"
              borderWidth="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              position={{ base: "relative", lg: "sticky" }}
              top="20px"
              alignSelf="flex-start"
            >
              <VStack align="stretch" spacing={6}>
                <Box>
                  <Heading as="h3" size="sm" mb={4} textTransform="uppercase">
                    Género
                  </Heading>
                  <VStack align="start" spacing={2}>
                    <Checkbox
                      isChecked={genderFilter === ""}
                      onChange={() => {
                        setGenderFilter("");
                        setSearchParams(params => {
                          params.delete("gender");
                          return params;
                        });
                      }}
                    >
                      Todos
                    </Checkbox>
                    {genders.map(gender => (
                      <Checkbox
                        key={gender}
                        isChecked={genderFilter === gender}
                        onChange={() => {
                          setGenderFilter(gender);
                          setSearchParams(params => {
                            params.set("gender", gender.toLowerCase());
                            return params;
                          });
                        }}
                      >
                        {gender}
                      </Checkbox>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Heading as="h3" size="sm" mb={4} textTransform="uppercase">
                    Categoría
                  </Heading>
                  <VStack align="start" spacing={2}>
                    <Checkbox
                      isChecked={categoryFilter === ""}
                      onChange={() => {
                        setCategoryFilter("");
                        setSearchParams(params => {
                          params.delete("category");
                          return params;
                        });
                      }}
                    >
                      Todas
                    </Checkbox>
                    {categories.map(category => (
                      <Checkbox
                        key={category}
                        isChecked={categoryFilter === category}
                        onChange={() => {
                          setCategoryFilter(category);
                          setSearchParams(params => {
                            params.set("category", category.toLowerCase());
                            return params;
                          });
                        }}
                      >
                        {category}
                      </Checkbox>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Heading as="h3" size="sm" mb={4} textTransform="uppercase">
                    Precio
                  </Heading>
                  <Box px={2}>
                    <RangeSlider
                      defaultValue={[0, 200]}
                      min={0}
                      max={200}
                      step={5}
                      value={priceRange}
                      onChange={setPriceRange}
                      mb={4}
                    >
                      <RangeSliderTrack bg={useColorModeValue("gray.200", "gray.600")}>
                        <RangeSliderFilledTrack bg="black" />
                      </RangeSliderTrack>
                      <RangeSliderThumb boxSize={6} index={0} />
                      <RangeSliderThumb boxSize={6} index={1} />
                    </RangeSlider>
                    <Flex justify="space-between">
                      <Text>${priceRange[0]}</Text>
                      <Text>${priceRange[1]}</Text>
                    </Flex>
                  </Box>
                </Box>
              </VStack>
            </Box>

            {/* Products Section */}
            <Box flex="1">
              {/* Mobile Filters Toggle */}
              <Flex
                display={{ base: "flex", lg: "none" }}
                justify="space-between"
                align="center"
                mb={4}
              >
                <Button
                  leftIcon={<Icon as={FaFilter} />}
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  size="sm"
                >
                  {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
                </Button>

                <Select
                  size="sm"
                  maxW="200px"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  placeholder="Ordenar por"
                  variant="filled"
                  bg={useColorModeValue("gray.100", "gray.700")}
                  icon={<Icon as={FaSort} />}
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="name-asc">Nombre: A-Z</option>
                  <option value="name-desc">Nombre: Z-A</option>
                </Select>
              </Flex>

              {/* Desktop Sort and Results Count */}
              <Flex
                justify="space-between"
                align="center"
                mb={6}
                display={{ base: "none", lg: "flex" }}
              >
                <Text color={useColorModeValue("gray.600", "gray.400")}>
                  Mostrando {sortedProducts.length} productos
                </Text>

                <HStack spacing={2}>
                  <Text>Ordenar por:</Text>
                  <Select
                    size="sm"
                    w="200px"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    variant="filled"
                    bg={useColorModeValue("gray.100", "gray.700")}
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                    <option value="name-asc">Nombre: A-Z</option>
                    <option value="name-desc">Nombre: Z-A</option>
                  </Select>
                </HStack>
              </Flex>

              {/* Search Bar */}
              <InputGroup mb={6}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg={useColorModeValue("white", "gray.800")}
                  borderColor={useColorModeValue("gray.300", "gray.600")}
                  _focus={{ borderColor: "black", boxShadow: "none" }}
                />
              </InputGroup>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                  {sortedProducts.map(product => (
                    <Box
                      key={product.id}
                      position="relative"
                      bg={useColorModeValue("white", "gray.800")}
                      borderRadius="md"
                      overflow="hidden"
                      transition="all 0.3s"
                      _hover={{ transform: "translateY(-5px)", shadow: "md" }}
                    >
                      {/* Wishlist Icon */}
                      <Box
                        position="absolute"
                        top="10px"
                        right="10px"
                        zIndex="1"
                        cursor="pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to wishlist functionality
                        }}
                      >
                        <Icon
                          as={FaHeart}
                          boxSize={5}
                          color="whiteAlpha.800"
                          _hover={{ color: "red.500" }}
                        />
                      </Box>

                      {/* Product Image */}
                      <Box position="relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          height="250px"
                          width="100%"
                          objectFit="cover"
                        />

                        {/* Gender Tag */}
                        <Tag
                          position="absolute"
                          bottom="10px"
                          left="10px"
                          size="sm"
                          bg="blackAlpha.700"
                          color="white"
                          borderRadius="full"
                        >
                          {product.gender}
                        </Tag>
                      </Box>

                      {/* Product Info */}
                      <Box p={4}>
                        <Text
                          color={useColorModeValue("gray.500", "gray.400")}
                          fontSize="sm"
                          mb={1}
                        >
                          {product.category}
                        </Text>

                        <Heading
                          as="h3"
                          size="md"
                          mb={2}
                          noOfLines={1}
                          fontWeight="semibold"
                        >
                          {product.name}
                        </Heading>

                        <Text
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.400")}
                          mb={4}
                          noOfLines={2}
                          height="40px"
                        >
                          {product.description}
                        </Text>

                        <Flex justify="space-between" align="center">
                          <Text fontWeight="bold" fontSize="lg">
                            ${product.price.toFixed(2)}
                          </Text>

                          <Button
                            onClick={() => addToCart(product)}
                            size="sm"
                            borderRadius="full"
                            bg="black"
                            color="white"
                            _hover={{ bg: "gray.800" }}
                            px={5}
                          >
                            Añadir
                          </Button>
                        </Flex>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Box
                  textAlign="center"
                  py={10}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  borderRadius="md"
                >
                  <Heading as="h3" size="lg" mb={3}>No se encontraron productos</Heading>
                  <Text mb={6}>Intenta con otros filtros o búsqueda</Text>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("");
                      setGenderFilter("");
                      setPriceRange([0, 200]);
                      setSearchParams({});
                    }}
                    variant="outline"
                    borderRadius="full"
                  >
                    Limpiar filtros
                  </Button>
                </Box>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box bg="black" color="white" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h2"
              size="xl"
              textTransform="uppercase"
              fontWeight="black"
              letterSpacing="wider"
            >
              ÚNETE A NUESTRA NEWSLETTER
            </Heading>
            <Text fontSize="lg" maxW="container.md">
              Recibe las últimas novedades, acceso exclusivo a productos y ofertas especiales
            </Text>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              w={{ base: "full", md: "auto" }}
              maxW="500px"
              mt={4}
            >
              <Input
                placeholder="Tu email"
                bg="white"
                color="black"
                borderRadius="full"
                borderColor="white"
                _focus={{ borderColor: "white", boxShadow: "none" }}
                size="lg"
              />
              <Button
                bg="white"
                color="black"
                borderRadius="full"
                size="lg"
                px={8}
                _hover={{ bg: "gray.200" }}
              >
                SUSCRIBIRSE
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg={useColorModeValue("gray.100", "gray.900")} py={16} px={8}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} mb={10}>
            <VStack align="flex-start" spacing={4}>
              <Heading as="h4" size="md" textTransform="uppercase">
                {BRAND.NAME}
              </Heading>
              <Text>{BRAND.SLOGAN}</Text>
              <HStack spacing={4} mt={2}>
                <Button variant="ghost" borderRadius="full" size="sm" p={0}>
                  <Icon as={FaHeart} boxSize={5} />
                </Button>
                <Button variant="ghost" borderRadius="full" size="sm" p={0}>
                  <Icon as={FaHeart} boxSize={5} />
                </Button>
                <Button variant="ghost" borderRadius="full" size="sm" p={0}>
                  <Icon as={FaHeart} boxSize={5} />
                </Button>
              </HStack>
            </VStack>

            <VStack align="flex-start" spacing={3}>
              <Heading as="h4" size="sm" textTransform="uppercase" mb={2}>
                Productos
              </Heading>
              <Button as={RouterLink} to="/products?gender=hombre" variant="link" justifyContent="flex-start">
                Hombre
              </Button>
              <Button as={RouterLink} to="/products?gender=mujer" variant="link" justifyContent="flex-start">
                Mujer
              </Button>
              <Button as={RouterLink} to="/products?gender=niños" variant="link" justifyContent="flex-start">
                Niños
              </Button>
              <Button as={RouterLink} to="/new-arrivals" variant="link" justifyContent="flex-start">
                Novedades
              </Button>
              <Button as={RouterLink} to="/offers" variant="link" justifyContent="flex-start">
                Ofertas
              </Button>
            </VStack>

            <VStack align="flex-start" spacing={3}>
              <Heading as="h4" size="sm" textTransform="uppercase" mb={2}>
                Ayuda
              </Heading>
              <Button as={RouterLink} to="/contact" variant="link" justifyContent="flex-start">
                Contacto
              </Button>
              <Button as={RouterLink} to="/shipping" variant="link" justifyContent="flex-start">
                Envíos
              </Button>
              <Button as={RouterLink} to="/returns" variant="link" justifyContent="flex-start">
                Devoluciones
              </Button>
              <Button as={RouterLink} to="/faq" variant="link" justifyContent="flex-start">
                Preguntas Frecuentes
              </Button>
            </VStack>

            <VStack align="flex-start" spacing={3}>
              <Heading as="h4" size="sm" textTransform="uppercase" mb={2}>
                Sobre Nosotros
              </Heading>
              <Button as={RouterLink} to="/about" variant="link" justifyContent="flex-start">
                Nuestra Historia
              </Button>
              <Button as={RouterLink} to="/stores" variant="link" justifyContent="flex-start">
                Tiendas
              </Button>
              <Button as={RouterLink} to="/sustainability" variant="link" justifyContent="flex-start">
                Sostenibilidad
              </Button>
              <Button as={RouterLink} to="/careers" variant="link" justifyContent="flex-start">
                Trabaja con Nosotros
              </Button>
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
            <HStack spacing={6} mt={{ base: 4, md: 0 }}>
              <Button variant="link" size="sm" color={useColorModeValue("gray.600", "gray.400")}>
                Política de Privacidad
              </Button>
              <Button variant="link" size="sm" color={useColorModeValue("gray.600", "gray.400")}>
                Términos y Condiciones
              </Button>
              <Button variant="link" size="sm" color={useColorModeValue("gray.600", "gray.400")}>
                Cookies
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductsPage;
