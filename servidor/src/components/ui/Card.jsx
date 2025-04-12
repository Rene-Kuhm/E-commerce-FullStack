import React from 'react';
import { Box } from '@chakra-ui/react';

const Card = ({ children, variant = 'default', ...props }) => {
  // Estilos según la variante
  const variantStyles = {
    default: {
      bg: 'white',
      borderRadius: 'md',
      boxShadow: 'md',
      p: 4
    },
    flat: {
      bg: 'white',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'gray.200',
      p: 4
    },
    elevated: {
      bg: 'white',
      borderRadius: 'md',
      boxShadow: 'lg',
      p: 4
    }
  };

  return (
    <Box
      {...variantStyles[variant]}
      transition="all 0.2s"
      _hover={{ transform: variant === 'elevated' ? 'translateY(-2px)' : 'none' }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
