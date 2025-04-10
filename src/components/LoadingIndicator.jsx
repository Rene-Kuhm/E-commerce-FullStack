import React from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";

const LoadingIndicator = () => {
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </Center>
  );
};

export default LoadingIndicator;
