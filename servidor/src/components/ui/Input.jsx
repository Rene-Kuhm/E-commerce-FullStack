import React, { forwardRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';

const Input = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  leftIcon,
  rightIcon,
  isRequired = false,
  isDisabled = false,
  ...props
}, ref) => {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} isDisabled={isDisabled} mb={4}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none">
            {leftIcon}
          </InputLeftElement>
        )}
        
        <ChakraInput
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        
        {rightIcon && (
          <InputRightElement>
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
      
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
});

Input.displayName = 'Input';

export default Input;
