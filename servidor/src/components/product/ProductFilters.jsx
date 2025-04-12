import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Flex,
  Text,
  Button,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import categoryService from '../../services/categoryService';

const ProductFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: initialFilters.category || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    search: initialFilters.search || '',
    ...initialFilters
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await categoryService.getAllCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
    setFilters(prev => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1]
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      search: ''
    };
    setFilters(resetFilters);
    setPriceRange([0, 1000]);
    onFilterChange(resetFilters);
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={5}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <Stack spacing={4}>
        <Heading size="md" mb={2}>Filtros</Heading>
        
        <FormControl>
          <FormLabel>Categoría</FormLabel>
          <Select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            placeholder="Todas las categorías"
            isDisabled={loading}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>
        
        <FormControl>
          <FormLabel>Rango de precio</FormLabel>
          <RangeSlider
            aria-label={['min price', 'max price']}
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onChange={handlePriceRangeChange}
            colorScheme="blue"
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Flex justify="space-between" mt={2}>
            <Text>${priceRange[0]}</Text>
            <Text>${priceRange[1]}</Text>
          </Flex>
        </FormControl>
        
        <FormControl>
          <FormLabel>Buscar</FormLabel>
          <Input
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Buscar productos..."
          />
        </FormControl>
        
        <Divider my={2} />
        
        <Stack direction="row" spacing={4}>
          <Button
            colorScheme="blue"
            onClick={handleApplyFilters}
            isLoading={loading}
            flex={1}
          >
            Aplicar
          </Button>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            isDisabled={loading}
          >
            Limpiar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductFilters;
