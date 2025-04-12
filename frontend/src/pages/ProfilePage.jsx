import React, { useEffect, useState } from "react";
import { setDocumentMeta } from "../utils/metaUtils";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Avatar,
  Divider,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  useToast,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setDocumentMeta(
      "Mi Perfil",
      "Gestiona tu información personal, direcciones y pedidos."
    );

    // Inicializar el formulario con los datos del usuario
    if (user?.user_metadata) {
      setFormData({
        first_name: user.user_metadata.first_name || "",
        last_name: user.user_metadata.last_name || "",
        phone: user.user_metadata.phone || "",
        address: user.user_metadata.address || ""
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión. Intenta de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = "El nombre es requerido";
    }

    if (!formData.last_name) {
      newErrors.last_name = "El apellido es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar tu perfil. Intenta de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatear la fecha de creación de la cuenta
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  return (
    <Box>
      {/* Header */}
      <Box bg={useColorModeValue("blue.500", "blue.800")} py={4} px={8} color="white">
        <Flex justify="space-between" align="center">
          <Heading as={RouterLink} to="/" size="lg" _hover={{ textDecoration: "none" }}>E-Commerce</Heading>
          <Flex align="center" gap={4}>
            <Button as={RouterLink} to="/products" colorScheme="whiteAlpha">
              Productos
            </Button>
            <Button as={RouterLink} to="/cart" colorScheme="whiteAlpha">
              Carrito
            </Button>
            <Button onClick={handleLogout} colorScheme="whiteAlpha" variant="outline">
              Cerrar Sesión
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={10}>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {/* Sidebar / User Info */}
          <Box w={{ base: "100%", md: "30%" }}>
            <Card>
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Mi Perfil</Heading>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Editar perfil"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  />
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="column" align="center" mb={6}>
                  <Avatar
                    size="2xl"
                    name={`${formData.first_name} ${formData.last_name}`}
                    mb={4}
                  />
                  <Heading size="md">{formData.first_name} {formData.last_name}</Heading>
                  <Text color="gray.500">{user?.email}</Text>
                  <Badge colorScheme="green" mt={2}>Cliente</Badge>
                </Flex>

                <Divider my={4} />

                <Stack spacing={3}>
                  <Stat>
                    <StatLabel>Miembro desde</StatLabel>
                    <StatNumber fontSize="md">{formatDate(user?.created_at)}</StatNumber>
                  </Stat>

                  {formData.phone && (
                    <Stat>
                      <StatLabel>Teléfono</StatLabel>
                      <StatNumber fontSize="md">{formData.phone}</StatNumber>
                    </Stat>
                  )}

                  {formData.address && (
                    <Stat>
                      <StatLabel>Dirección</StatLabel>
                      <StatHelpText>{formData.address}</StatHelpText>
                    </Stat>
                  )}
                </Stack>
              </CardBody>
              <CardFooter>
                <Button onClick={handleLogout} colorScheme="red" w="full">
                  Cerrar Sesión
                </Button>
              </CardFooter>
            </Card>
          </Box>

          {/* Main Content */}
          <Box w={{ base: "100%", md: "70%" }}>
            <Tabs colorScheme="blue" variant="enclosed">
              <TabList>
                <Tab>Información Personal</Tab>
                <Tab>Pedidos</Tab>
                <Tab>Favoritos</Tab>
              </TabList>

              <TabPanels>
                {/* Información Personal */}
                <TabPanel>
                  <Card>
                    <CardHeader>
                      <Heading size="md">
                        {isEditing ? "Editar Información" : "Información Personal"}
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      {isEditing ? (
                        <form onSubmit={handleSubmit}>
                          <Stack spacing={4}>
                            <Flex direction={{ base: "column", md: "row" }} gap={4}>
                              <FormControl isInvalid={errors.first_name}>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                  name="first_name"
                                  value={formData.first_name}
                                  onChange={handleChange}
                                />
                                <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                              </FormControl>

                              <FormControl isInvalid={errors.last_name}>
                                <FormLabel>Apellido</FormLabel>
                                <Input
                                  name="last_name"
                                  value={formData.last_name}
                                  onChange={handleChange}
                                />
                                <FormErrorMessage>{errors.last_name}</FormErrorMessage>
                              </FormControl>
                            </Flex>

                            <FormControl>
                              <FormLabel>Email</FormLabel>
                              <Input
                                value={user?.email || ""}
                                isReadOnly
                                bg="gray.50"
                              />
                              <Text fontSize="sm" color="gray.500" mt={1}>
                                El email no se puede cambiar
                              </Text>
                            </FormControl>

                            <FormControl>
                              <FormLabel>Teléfono</FormLabel>
                              <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Ej: +34 612 345 678"
                              />
                            </FormControl>

                            <FormControl>
                              <FormLabel>Dirección</FormLabel>
                              <Input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Ej: Calle Principal 123, Ciudad"
                              />
                            </FormControl>

                            <Flex justify="flex-end" gap={4} mt={4}>
                              <Button
                                onClick={() => setIsEditing(false)}
                                variant="outline"
                              >
                                Cancelar
                              </Button>
                              <Button
                                type="submit"
                                colorScheme="blue"
                                isLoading={isSubmitting}
                              >
                                Guardar Cambios
                              </Button>
                            </Flex>
                          </Stack>
                        </form>
                      ) : (
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                          <Box>
                            <Text fontWeight="bold">Nombre:</Text>
                            <Text>{formData.first_name} {formData.last_name}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Email:</Text>
                            <Text>{user?.email}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Teléfono:</Text>
                            <Text>{formData.phone || "No especificado"}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Dirección:</Text>
                            <Text>{formData.address || "No especificada"}</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Miembro desde:</Text>
                            <Text>{formatDate(user?.created_at)}</Text>
                          </Box>
                        </SimpleGrid>
                      )}
                    </CardBody>
                  </Card>
                </TabPanel>

                {/* Pedidos */}
                <TabPanel>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Mis Pedidos</Heading>
                    </CardHeader>
                    <CardBody>
                      <Box textAlign="center" py={10}>
                        <Text mb={4}>No tienes pedidos recientes.</Text>
                        <Button
                          as={RouterLink}
                          to="/products"
                          colorScheme="blue"
                        >
                          Explorar Productos
                        </Button>
                      </Box>
                    </CardBody>
                  </Card>
                </TabPanel>

                {/* Favoritos */}
                <TabPanel>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Mis Favoritos</Heading>
                    </CardHeader>
                    <CardBody>
                      <Box textAlign="center" py={10}>
                        <Text mb={4}>No tienes productos favoritos.</Text>
                        <Button
                          as={RouterLink}
                          to="/products"
                          colorScheme="blue"
                        >
                          Explorar Productos
                        </Button>
                      </Box>
                    </CardBody>
                  </Card>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Container>

      {/* Footer */}
      <Box bg={useColorModeValue("gray.100", "gray.900")} py={10} px={8} mt={10}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "flex-start" }}
            gap={8}
          >
            <Box>
              <Heading as="h4" size="md" mb={4}>
                E-Commerce
              </Heading>
              <Text>Tu tienda online de confianza</Text>
            </Box>

            <Box>
              <Heading as="h4" size="md" mb={4}>
                Enlaces
              </Heading>
              <Stack spacing={2}>
                <Button as={RouterLink} to="/" variant="link">
                  Inicio
                </Button>
                <Button as={RouterLink} to="/products" variant="link">
                  Productos
                </Button>
                <Button as={RouterLink} to="/cart" variant="link">
                  Carrito
                </Button>
              </Stack>
            </Box>

            <Box>
              <Heading as="h4" size="md" mb={4}>
                Contacto
              </Heading>
              <Text>info@ecommerce.com</Text>
              <Text>+1 234 567 890</Text>
            </Box>
          </Flex>

          <Text mt={10} textAlign="center">
            © {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;
