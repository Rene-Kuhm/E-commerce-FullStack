import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Grid,
  GridItem,
  Text,
  Center,
  Spinner,
  Flex,
  Select,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import productService from '../services/productService';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  // Get filters from URL params
  const initialFilters = {
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    featured: searchParams.get('featured') === 'true'
  };

  const [filters, setFilters] = useState(initialFilters);

  // Fetch products when filters or pagination changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Prepare params for API call
        const params = {
          page: currentPage,
          limit: 12,
          ...filters
        };
        
        // Add sorting
        switch (sortBy) {
          case 'price_asc':
            params.sort = 'price';
            params.order = 'asc';
            break;
          case 'price_desc':
            params.sort = 'price';
            params.order = 'desc';
            break;
          case 'name_asc':
            params.sort = 'name';
            params.order = 'asc';
            break;
          case 'name_desc':
            params.sort = 'name';
            params.order = 'desc';
            break;
          default: // newest
            params.sort = 'created_at';
            params.order = 'desc';
        }
        
        const response = await productService.getAllProducts(params);
        
        setProducts(response.data || []);
        setTotalPages(response.meta?.totalPages || 1);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage, sortBy]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.search) params.set('search', filters.search);
    if (filters.featured) params.set('featured', 'true');
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>
          Productos
          {filters.featured && ' Destacados'}
          {filters.category && ' - Categoría'}
          {filters.search && ` - Búsqueda: "${filters.search}"`}
        </Heading>

        <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={8}>
          {/* Sidebar with filters */}
          <GridItem>
            <ProductFilters
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </GridItem>

          {/* Main content */}
          <GridItem>
            {/* Sorting and results count */}
            <Flex
              justify="space-between"
              align="center"
              mb={6}
              direction={{ base: 'column', sm: 'row' }}
              gap={4}
            >
              <Text>
                {loading ? 'Cargando productos...' : `${products.length} productos encontrados`}
              </Text>
              
              <Box>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  size="sm"
                  width="200px"
                >
                  <option value="newest">Más recientes</option>
                  <option value="price_asc">Precio: menor a mayor</option>
                  <option value="price_desc">Precio: mayor a menor</option>
                  <option value="name_asc">Nombre: A-Z</option>
                  <option value="name_desc">Nombre: Z-A</option>
                </Select>
              </Box>
            </Flex>

            {/* Products grid */}
            <ProductGrid
              products={products}
              loading={loading}
              error={error}
            />

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <Flex justify="center" mt={8}>
                <Flex>
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    mr={2}
                  >
                    Anterior
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      colorScheme={currentPage === i + 1 ? 'blue' : 'gray'}
                      variant={currentPage === i + 1 ? 'solid' : 'outline'}
                      mx={1}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    ml={2}
                  >
                    Siguiente
                  </Button>
                </Flex>
              </Flex>
            )}
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProductsPage;
