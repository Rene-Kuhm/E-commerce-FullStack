import React from 'react';
import {
  Flex,
  Box,
  Image,
  Text,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const product = item.products;
  
  const handleQuantityChange = (value) => {
    const quantity = parseInt(value);
    if (quantity > 0) {
      updateCartItem(item.id, quantity);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      p={4}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      mb={4}
    >
      <Flex align="center" mb={{ base: 4, md: 0 }}>
        <Image
          src={product?.image_url || 'https://via.placeholder.com/80?text=No+Image'}
          alt={product?.name}
          boxSize="80px"
          objectFit="cover"
          borderRadius="md"
          mr={4}
        />
        <Box>
          <Text fontWeight="bold">{product?.name}</Text>
          <Text fontSize="sm" color="gray.500">
            Precio: ${product?.price?.toFixed(2)}
          </Text>
        </Box>
      </Flex>

      <Flex align="center">
        <NumberInput
          size="sm"
          maxW={20}
          min={1}
          max={product?.stock || 99}
          value={item.quantity}
          onChange={handleQuantityChange}
          mr={4}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Text fontWeight="bold" mr={4}>
          ${(product?.price * item.quantity).toFixed(2)}
        </Text>

        <IconButton
          aria-label="Remove item"
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          colorScheme="red"
          onClick={handleRemove}
        />
      </Flex>
    </Flex>
  );
};

export default CartItem;
