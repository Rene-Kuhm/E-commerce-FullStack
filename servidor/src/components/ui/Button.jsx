import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  // Mapear variantes personalizadas a estilos de Chakra
  const variantStyles = {
    primary: {
      bg: 'blue.500',
      color: 'white',
      _hover: { bg: 'blue.600' },
      _active: { bg: 'blue.700' }
    },
    secondary: {
      bg: 'gray.200',
      color: 'gray.800',
      _hover: { bg: 'gray.300' },
      _active: { bg: 'gray.400' }
    },
    outline: {
      variant: 'outline',
      colorScheme: 'blue'
    },
    danger: {
      bg: 'red.500',
      color: 'white',
      _hover: { bg: 'red.600' },
      _active: { bg: 'red.700' }
    },
    success: {
      bg: 'green.500',
      color: 'white',
      _hover: { bg: 'green.600' },
      _active: { bg: 'green.700' }
    }
  };

  return (
    <ChakraButton
      {...variantStyles[variant]}
      size={size}
      isLoading={isLoading}
      isDisabled={isDisabled}
      width={fullWidth ? '100%' : 'auto'}
      onClick={onClick}
      type={type}
      borderRadius="md"
      fontWeight="medium"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
