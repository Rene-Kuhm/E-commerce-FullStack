import React from 'react';
import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react';

const Alert = ({
  status = 'info',
  title,
  description,
  isClosable = false,
  onClose,
  ...props
}) => {
  return (
    <ChakraAlert
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius="md"
      py={4}
      mb={4}
      {...props}
    >
      <AlertIcon boxSize="24px" mr={0} />
      {title && <AlertTitle mt={4} mb={1} fontSize="lg">{title}</AlertTitle>}
      {description && <AlertDescription maxWidth="sm">{description}</AlertDescription>}
      {isClosable && <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />}
    </ChakraAlert>
  );
};

export default Alert;
