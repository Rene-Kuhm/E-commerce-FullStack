import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Heading,
  Link,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Divider,
  HStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import BRAND from "../constants/brandConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      borderTopWidth={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      {/* Newsletter Section */}
      <Box bg={useColorModeValue("brand.500", "brand.600")} color="white" py={10}>
        <Container maxW={"container.xl"}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "center" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Stack spacing={2} mb={{ base: 6, md: 0 }} maxW={{ base: "100%", md: "50%" }}>
              <Heading as="h3" size="md">
                Suscríbete a nuestro newsletter
              </Heading>
              <Text fontSize="sm">
                Recibe las últimas novedades, ofertas exclusivas y consejos directamente en tu correo.
              </Text>
            </Stack>
            <Box width={{ base: "100%", md: "40%" }}>
              <InputGroup size="md">
                <Input
                  placeholder="Tu correo electrónico"
                  bg="white"
                  color="gray.800"
                  border={0}
                  _placeholder={{ color: "gray.400" }}
                  _focus={{ borderColor: "brand.300" }}
                  borderRadius="md"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    colorScheme="accent"
                    borderLeftRadius={0}
                    _hover={{ bg: "accent.600" }}
                  >
                    Enviar
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text fontSize="xs" mt={2} color="gray.100">
                Al suscribirte, aceptas nuestra{" "}
                <Link as={RouterLink} to={BRAND.LEGAL.PRIVACY_POLICY} fontWeight="bold" textDecoration="underline">
                  política de privacidad
                </Link>
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main Footer */}
      <Container as={Stack} maxW={"container.xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Heading
                as={RouterLink}
                to="/"
                fontSize={"2xl"}
                fontWeight="bold"
                color={useColorModeValue("brand.500", "white")}
                _hover={{ textDecoration: "none" }}
              >
                {BRAND.NAME}
              </Heading>
              <Text fontSize={"sm"} mt={2}>
                {BRAND.SLOGAN}
              </Text>
            </Box>
            <Stack direction={"row"} spacing={4}>
              <Link href={BRAND.SOCIAL.FACEBOOK} isExternal>
                <Icon as={FaFacebook} boxSize={5} />
              </Link>
              <Link href={BRAND.SOCIAL.TWITTER} isExternal>
                <Icon as={FaTwitter} boxSize={5} />
              </Link>
              <Link href={BRAND.SOCIAL.INSTAGRAM} isExternal>
                <Icon as={FaInstagram} boxSize={5} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaLinkedin} boxSize={5} />
              </Link>
              <Link href="#" isExternal>
                <Icon as={FaYoutube} boxSize={5} />
              </Link>
            </Stack>
          </Stack>

          <Stack align={"flex-start"}>
            <Heading as="h4" fontSize={"md"} mb={2}>
              Compañía
            </Heading>
            <Link as={RouterLink} to="/about">Sobre Nosotros</Link>
            <Link as={RouterLink} to="/blog">Blog</Link>
            <Link as={RouterLink} to="/careers">Trabaja con Nosotros</Link>
            <Link as={RouterLink} to="/contact">Contacto</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Heading as="h4" fontSize={"md"} mb={2}>
              Soporte
            </Heading>
            <Link as={RouterLink} to="/help">Centro de Ayuda</Link>
            <Link as={RouterLink} to="/faq">Preguntas Frecuentes</Link>
            <Link as={RouterLink} to="/shipping">Envíos</Link>
            <Link as={RouterLink} to="/returns">Devoluciones</Link>
            <Link as={RouterLink} to="/order-tracking">Seguimiento de Pedidos</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Heading as="h4" fontSize={"md"} mb={2}>
              Legal
            </Heading>
            <Link as={RouterLink} to={BRAND.LEGAL.TERMS_OF_SERVICE}>Términos de Servicio</Link>
            <Link as={RouterLink} to={BRAND.LEGAL.PRIVACY_POLICY}>Política de Privacidad</Link>
            <Link as={RouterLink} to={BRAND.LEGAL.SHIPPING_POLICY}>Política de Envíos</Link>
            <Link as={RouterLink} to={BRAND.LEGAL.RETURN_POLICY}>Política de Devoluciones</Link>
            <Link as={RouterLink} to="/cookies">Política de Cookies</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Heading as="h4" fontSize={"md"} mb={2}>
              Contacto
            </Heading>
            <Text>{BRAND.CONTACT.ADDRESS}</Text>
            <Link href={`mailto:${BRAND.CONTACT.EMAIL}`} display="flex" alignItems="center">
              <EmailIcon mr={2} />
              {BRAND.CONTACT.EMAIL}
            </Link>
            <Text>{BRAND.CONTACT.PHONE}</Text>
            <Text fontSize="sm" mt={4}>
              Horario de atención:
              <br />
              Lun-Vie: 9:00 - 20:00
              <br />
              Sáb: 10:00 - 15:00
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      {/* Payment Methods */}
      <Box py={4} bg={useColorModeValue("gray.100", "gray.800")}>
        <Container maxW={"container.xl"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify="space-between"
            align="center"
          >
            <Text fontSize="sm">Métodos de pago aceptados:</Text>
            <HStack spacing={4}>
              <Icon as={FaCreditCard} boxSize={6} />
              <Icon as={FaPaypal} boxSize={6} />
              <Icon as={FaApplePay} boxSize={6} />
              <Icon as={FaGooglePay} boxSize={6} />
            </HStack>
          </Stack>
        </Container>
      </Box>

      {/* Copyright */}
      <Box py={4}>
        <Container maxW={"container.xl"}>
          <Divider mb={4} />
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            fontSize="sm"
          >
            <Text>
              © {currentYear} {BRAND.NAME}. Todos los derechos reservados.
            </Text>
            <Text mt={{ base: 2, md: 0 }}>
              Diseñado y desarrollado con ❤️ en España
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
