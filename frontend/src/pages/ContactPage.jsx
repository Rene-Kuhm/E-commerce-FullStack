import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  useColorModeValue,
  FormErrorMessage,
  Select,
  Divider,
  Icon,
  Alert,
  AlertIcon,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { setDocumentMeta } from "../utils/metaUtils";
import BRAND from "../constants/brandConfig";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    department: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  
  useEffect(() => {
    setDocumentMeta(
      "Contacto", 
      "Ponte en contacto con nosotros. Estamos aquí para ayudarte con cualquier consulta o problema."
    );
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }
    
    if (!formData.department) {
      newErrors.department = "Por favor selecciona un departamento";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te responderemos lo antes posible.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        department: ""
      });
    }, 1500);
  };
  
  const resetForm = () => {
    setIsSubmitted(false);
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg={useColorModeValue("brand.500", "brand.700")} 
        color="white"
        py={12}
        position="relative"
        overflow="hidden"
      >
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          bottom="0" 
          opacity="0.1" 
          backgroundImage="url('https://placehold.co/1200x400/blue/white?text=CONTACTO')"
          backgroundSize="cover"
          backgroundPosition="center"
        />
        <Container maxW="container.xl" position="relative">
          <VStack spacing={4} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }}>
            <Heading 
              as="h1" 
              size="2xl" 
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.2)"
            >
              Contacto
            </Heading>
            <Text fontSize="xl" maxW="container.md">
              Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta o problema.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Contact Form */}
          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Envíanos un mensaje
            </Heading>
            
            {isSubmitted ? (
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                borderRadius="md"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <Heading as="h3" size="md" mt={4} mb={2}>
                  ¡Mensaje enviado!
                </Heading>
                <Text mb={4}>
                  Gracias por contactarnos. Te responderemos lo antes posible.
                </Text>
                <Button colorScheme="brand" onClick={resetForm}>
                  Enviar otro mensaje
                </Button>
              </Alert>
            ) : (
              <Box 
                as="form" 
                onSubmit={handleSubmit}
                bg={useColorModeValue("white", "gray.800")}
                p={6}
                borderRadius="lg"
                shadow="md"
                borderWidth="1px"
              >
                <VStack spacing={4}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Nombre completo</FormLabel>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={errors.department}>
                    <FormLabel>Departamento</FormLabel>
                    <Select 
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Selecciona un departamento"
                    >
                      <option value="ventas">Ventas</option>
                      <option value="soporte">Soporte Técnico</option>
                      <option value="devoluciones">Devoluciones</option>
                      <option value="facturacion">Facturación</option>
                      <option value="otro">Otro</option>
                    </Select>
                    <FormErrorMessage>{errors.department}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={errors.subject}>
                    <FormLabel>Asunto</FormLabel>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Asunto de tu mensaje"
                    />
                    <FormErrorMessage>{errors.subject}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={errors.message}>
                    <FormLabel>Mensaje</FormLabel>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                    />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </FormControl>
                  
                  <Button 
                    type="submit" 
                    colorScheme="brand" 
                    size="lg" 
                    width="full"
                    isLoading={isSubmitting}
                    loadingText="Enviando"
                  >
                    Enviar Mensaje
                  </Button>
                </VStack>
              </Box>
            )}
          </Box>
          
          {/* Contact Information */}
          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Información de Contacto
            </Heading>
            
            <VStack 
              spacing={6} 
              align="stretch"
              bg={useColorModeValue("white", "gray.800")}
              p={6}
              borderRadius="lg"
              shadow="md"
              borderWidth="1px"
            >
              <Box>
                <HStack spacing={4} mb={2}>
                  <Icon as={FaMapMarkerAlt} color="brand.500" boxSize={5} />
                  <Heading as="h3" size="md">Dirección</Heading>
                </HStack>
                <Text pl={9}>{BRAND.CONTACT.ADDRESS}</Text>
              </Box>
              
              <Divider />
              
              <Box>
                <HStack spacing={4} mb={2}>
                  <Icon as={FaPhone} color="brand.500" boxSize={5} />
                  <Heading as="h3" size="md">Teléfono</Heading>
                </HStack>
                <Text pl={9}>{BRAND.CONTACT.PHONE}</Text>
              </Box>
              
              <Divider />
              
              <Box>
                <HStack spacing={4} mb={2}>
                  <Icon as={FaEnvelope} color="brand.500" boxSize={5} />
                  <Heading as="h3" size="md">Email</Heading>
                </HStack>
                <Text pl={9}>{BRAND.CONTACT.EMAIL}</Text>
              </Box>
              
              <Divider />
              
              <Box>
                <HStack spacing={4} mb={2}>
                  <Icon as={FaClock} color="brand.500" boxSize={5} />
                  <Heading as="h3" size="md">Horario de Atención</Heading>
                </HStack>
                <Text pl={9}>Lunes a Viernes: 9:00 - 20:00</Text>
                <Text pl={9}>Sábados: 10:00 - 15:00</Text>
                <Text pl={9}>Domingos: Cerrado</Text>
              </Box>
              
              <Divider />
              
              <Box>
                <Heading as="h3" size="md" mb={4}>Síguenos</Heading>
                <HStack spacing={4}>
                  <Button 
                    as="a" 
                    href={BRAND.SOCIAL.FACEBOOK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    colorScheme="facebook" 
                    leftIcon={<FaFacebook />}
                    size="sm"
                  >
                    Facebook
                  </Button>
                  <Button 
                    as="a" 
                    href={BRAND.SOCIAL.TWITTER} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    colorScheme="twitter" 
                    leftIcon={<FaTwitter />}
                    size="sm"
                  >
                    Twitter
                  </Button>
                  <Button 
                    as="a" 
                    href={BRAND.SOCIAL.INSTAGRAM} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    colorScheme="pink" 
                    leftIcon={<FaInstagram />}
                    size="sm"
                  >
                    Instagram
                  </Button>
                </HStack>
              </Box>
            </VStack>
            
            {/* Map Placeholder */}
            <Box 
              mt={6} 
              borderRadius="lg" 
              overflow="hidden" 
              shadow="md" 
              borderWidth="1px"
              height="300px"
              bg="gray.200"
              position="relative"
            >
              <Box 
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Icon as={FaMapMarkerAlt} color="red.500" boxSize={10} mb={4} />
                <Text fontWeight="bold">Mapa de ubicación</Text>
                <Text fontSize="sm">Aquí se mostraría un mapa interactivo</Text>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
        
        {/* FAQ Section */}
        <Box mt={16}>
          <Heading as="h2" size="xl" mb={6}>
            Preguntas Frecuentes
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box 
              p={6} 
              bg={useColorModeValue("white", "gray.800")} 
              borderRadius="lg" 
              shadow="md"
              borderWidth="1px"
            >
              <Heading as="h3" size="md" mb={3}>
                ¿Cuál es el tiempo de entrega?
              </Heading>
              <Text>
                Nuestro tiempo de entrega estándar es de 3-5 días hábiles. Para envíos express, 
                el tiempo se reduce a 1-2 días hábiles con un costo adicional.
              </Text>
            </Box>
            
            <Box 
              p={6} 
              bg={useColorModeValue("white", "gray.800")} 
              borderRadius="lg" 
              shadow="md"
              borderWidth="1px"
            >
              <Heading as="h3" size="md" mb={3}>
                ¿Cómo puedo hacer una devolución?
              </Heading>
              <Text>
                Tienes 30 días para devolver un producto. Simplemente contacta con nuestro 
                servicio de atención al cliente y te guiaremos en el proceso.
              </Text>
            </Box>
            
            <Box 
              p={6} 
              bg={useColorModeValue("white", "gray.800")} 
              borderRadius="lg" 
              shadow="md"
              borderWidth="1px"
            >
              <Heading as="h3" size="md" mb={3}>
                ¿Cuáles son los métodos de pago aceptados?
              </Heading>
              <Text>
                Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), 
                PayPal, transferencia bancaria y pago contra reembolso.
              </Text>
            </Box>
            
            <Box 
              p={6} 
              bg={useColorModeValue("white", "gray.800")} 
              borderRadius="lg" 
              shadow="md"
              borderWidth="1px"
            >
              <Heading as="h3" size="md" mb={3}>
                ¿Ofrecen garantía en los productos?
              </Heading>
              <Text>
                Sí, todos nuestros productos tienen una garantía mínima de 1 año. 
                Algunos productos específicos pueden tener garantías extendidas.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
