import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import BRAND from "../constants/brandConfig";

const NikeStyleHero = ({
  title = "JUST DO IT",
  subtitle = "Rendimiento. Estilo. Innovación.",
  description = "Descubre la nueva colección diseñada para superar tus límites y alcanzar tu máximo potencial.",
  ctaText = "Comprar",
  ctaLink = "/products",
  secondaryCtaText = "Explorar",
  secondaryCtaLink = "/new-arrivals",
  imageSrc = "https://placehold.co/1200x800/black/white?text=SPORTFUSION",
  imageAlt = "SportFusion Hero Image",
  bgColor = "black",
  textColor = "white",
  height = { base: "90vh", md: "80vh" },
  imagePosition = "right", // "right", "left", "center", "background"
}) => {
  const isImageBackground = imagePosition === "background";
  const isImageRight = imagePosition === "right";
  const isImageLeft = imagePosition === "left";
  const isImageCenter = imagePosition === "center";
  
  return (
    <Box
      bg={bgColor}
      color={textColor}
      position="relative"
      height={height}
      overflow="hidden"
    >
      {/* Background Image */}
      {isImageBackground && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundImage={`url(${imageSrc})`}
          backgroundSize="cover"
          backgroundPosition="center"
          opacity="0.7"
          zIndex="0"
        />
      )}
      
      <Container 
        maxW="container.xl" 
        height="100%" 
        position="relative" 
        zIndex="1"
        px={{ base: 6, md: 8 }}
      >
        <Flex
          direction={
            isImageCenter 
              ? "column" 
              : { base: "column", md: isImageLeft ? "row-reverse" : "row" }
          }
          height="100%"
          align="center"
          justify={isImageCenter ? "center" : "space-between"}
          textAlign={isImageCenter ? "center" : { base: "center", md: "left" }}
          gap={{ base: 8, md: 4 }}
        >
          {/* Text Content */}
          <VStack
            spacing={4}
            align={isImageCenter ? "center" : { base: "center", md: "flex-start" }}
            maxW={isImageCenter ? "container.md" : { base: "100%", md: "50%" }}
            py={{ base: 10, md: 0 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
              fontWeight="black"
              letterSpacing="tight"
              lineHeight="0.9"
              textTransform="uppercase"
            >
              {title}
            </Heading>
            
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="medium"
              letterSpacing="wide"
              opacity="0.9"
            >
              {subtitle}
            </Heading>
            
            <Text 
              fontSize={{ base: "md", md: "lg" }}
              maxW="container.md"
              mt={2}
              opacity="0.8"
            >
              {description}
            </Text>
            
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              mt={6}
              w={{ base: "100%", sm: "auto" }}
            >
              <Button
                as={RouterLink}
                to={ctaLink}
                size="lg"
                bg="white"
                color="black"
                borderRadius="full"
                px={8}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                fontWeight="bold"
              >
                {ctaText}
              </Button>
              
              <Button
                as={RouterLink}
                to={secondaryCtaLink}
                size="lg"
                variant="outline"
                borderRadius="full"
                px={8}
                borderColor="white"
                _hover={{
                  bg: "whiteAlpha.200",
                }}
                fontWeight="bold"
              >
                {secondaryCtaText}
              </Button>
            </Stack>
          </VStack>
          
          {/* Image */}
          {!isImageBackground && (
            <Box
              maxW={isImageCenter ? "100%" : { base: "100%", md: "50%" }}
              height={isImageCenter ? "auto" : { base: "auto", md: "70%" }}
              position="relative"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                objectFit="cover"
                width="100%"
                height="100%"
                borderRadius={isImageCenter ? "lg" : "none"}
                shadow={isImageCenter ? "2xl" : "none"}
              />
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default NikeStyleHero;
