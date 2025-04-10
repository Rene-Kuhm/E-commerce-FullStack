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
  Badge,
  HStack,
  VStack,
  Icon,
  keyframes,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaShoppingCart, FaRegHeart, FaSearch } from "react-icons/fa";
import BRAND from "../constants/brandConfig";

// Componente de movimiento para animaciones
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

// Keyframes para animaciones
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Hero = ({
  title = "Descubre Productos Excepcionales",
  subtitle = "La mejor selección de productos de alta calidad a precios increíbles",
  ctaText = "Ver Productos",
  ctaLink = "/products",
  secondaryCtaText = "Ofertas Especiales",
  secondaryCtaLink = "/offers",
  imageSrc = "https://placehold.co/600x400/blue/white?text=Premium+Products",
  imageAlt = "Productos Premium",
  variant = "default", // default, gradient, pattern, video
  overlayColor = "brand.500",
  badges = ["Envío Gratis", "Garantía de Calidad", "Devolución Fácil"],
  height = { base: "auto", md: "600px" },
  showStats = true,
  stats = [
    { label: "Productos", value: "1000+" },
    { label: "Clientes", value: "50K+" },
    { label: "Países", value: "25+" },
  ],
  backgroundVideo = null,
  backgroundPattern = null,
  showWave = true,
}) => {
  // Determinar el color de fondo según la variante
  let bgProps = {};
  
  switch (variant) {
    case "gradient":
      bgProps = {
        bgGradient: useColorModeValue(
          `linear(to-r, ${overlayColor}, ${overlayColor}CC)`,
          `linear(to-r, ${overlayColor}, ${overlayColor}99)`
        ),
      };
      break;
    case "pattern":
      bgProps = {
        bg: useColorModeValue(overlayColor, `${overlayColor}CC`),
        backgroundImage: backgroundPattern || "url('https://placehold.co/1200x600/blue/white?text=Pattern')",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
      };
      break;
    case "video":
      bgProps = {
        position: "relative",
        overflow: "hidden",
      };
      break;
    default:
      bgProps = {
        bg: useColorModeValue(overlayColor, `${overlayColor}CC`),
      };
  }
  
  // Animaciones para elementos
  const animations = {
    heading: {
      hidden: { opacity: 0, y: -50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8, 
          ease: "easeOut" 
        } 
      }
    },
    subtitle: {
      hidden: { opacity: 0, y: -20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8, 
          delay: 0.2,
          ease: "easeOut" 
        } 
      }
    },
    cta: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.5, 
          delay: 0.5,
          ease: "easeOut" 
        } 
      }
    },
    image: {
      hidden: { opacity: 0, x: 100 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.8, 
          delay: 0.3,
          ease: "easeOut" 
        } 
      }
    },
    badge: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: (i) => ({ 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.5, 
          delay: 0.7 + (i * 0.1),
          ease: "easeOut" 
        } 
      })
    },
    stats: {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5, 
          delay: 0.9 + (i * 0.1),
          ease: "easeOut" 
        } 
      })
    }
  };
  
  // Tamaño de texto responsivo
  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl", lg: "4xl" });
  const subtitleSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });
  
  return (
    <Box 
      position="relative" 
      color="white"
      height={height}
      display="flex"
      alignItems="center"
      {...bgProps}
    >
      {/* Video de fondo si la variante es video */}
      {variant === "video" && backgroundVideo && (
        <Box
          as="video"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          zIndex="0"
          autoPlay
          muted
          loop
          src={backgroundVideo}
        />
      )}
      
      {/* Overlay para video */}
      {variant === "video" && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg={`${overlayColor}99`}
          zIndex="1"
        />
      )}
      
      {/* Contenido principal */}
      <Container 
        maxW="container.xl" 
        position="relative"
        zIndex="2"
        py={{ base: 16, md: 0 }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 10, md: 6 }}
        >
          {/* Texto y CTA */}
          <MotionFlex
            initial="hidden"
            animate="visible"
            direction="column"
            maxW={{ base: "100%", md: "50%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <MotionHeading
              as="h1"
              size={headingSize}
              fontWeight="bold"
              lineHeight="shorter"
              mb={4}
              variants={animations.heading}
              textShadow="0 2px 4px rgba(0,0,0,0.2)"
            >
              {title}
            </MotionHeading>
            
            <MotionText
              fontSize={subtitleSize}
              mb={6}
              variants={animations.subtitle}
            >
              {subtitle}
            </MotionText>
            
            {/* Badges */}
            <HStack 
              spacing={4} 
              mb={6}
              justify={{ base: "center", md: "flex-start" }}
              wrap="wrap"
            >
              {badges.map((badge, index) => (
                <MotionBox
                  key={index}
                  custom={index}
                  variants={animations.badge}
                >
                  <Badge
                    px={3}
                    py={1}
                    borderRadius="full"
                    colorScheme="whiteAlpha"
                    fontSize="sm"
                    fontWeight="medium"
                    border="1px solid white"
                  >
                    {badge}
                  </Badge>
                </MotionBox>
              ))}
            </HStack>
            
            {/* Call to Action Buttons */}
            <MotionFlex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              mt={2}
              justify={{ base: "center", md: "flex-start" }}
              variants={animations.cta}
            >
              <Button
                as={RouterLink}
                to={ctaLink}
                size="lg"
                colorScheme="white"
                bg="white"
                color={overlayColor}
                _hover={{ bg: "gray.100" }}
                leftIcon={<Icon as={FaShoppingCart} />}
                shadow="md"
              >
                {ctaText}
              </Button>
              
              <Button
                as={RouterLink}
                to={secondaryCtaLink}
                size="lg"
                variant="outline"
                colorScheme="white"
                rightIcon={<ChevronRightIcon />}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                {secondaryCtaText}
              </Button>
            </MotionFlex>
            
            {/* Stats */}
            {showStats && (
              <HStack 
                spacing={8} 
                mt={10}
                justify={{ base: "center", md: "flex-start" }}
              >
                {stats.map((stat, index) => (
                  <MotionBox
                    key={index}
                    custom={index}
                    variants={animations.stats}
                  >
                    <VStack spacing={0} align={{ base: "center", md: "flex-start" }}>
                      <Text fontWeight="bold" fontSize="2xl">{stat.value}</Text>
                      <Text fontSize="sm" opacity={0.8}>{stat.label}</Text>
                    </VStack>
                  </MotionBox>
                ))}
              </HStack>
            )}
          </MotionFlex>
          
          {/* Imagen */}
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={animations.image}
            maxW={{ base: "100%", md: "45%" }}
            animation={`${float} 6s ease-in-out infinite`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              borderRadius="xl"
              shadow="2xl"
              objectFit="cover"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.02)" }}
            />
          </MotionBox>
        </Flex>
      </Container>
      
      {/* Onda decorativa en la parte inferior */}
      {showWave && (
        <Box
          position="absolute"
          bottom="-1px"
          left="0"
          right="0"
          height={{ base: "40px", md: "60px" }}
          overflow="hidden"
          zIndex="3"
        >
          <Box
            as="svg"
            viewBox="0 0 1440 120"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            fill={useColorModeValue("white", "gray.800")}
          >
            <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,69.3C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Hero;
