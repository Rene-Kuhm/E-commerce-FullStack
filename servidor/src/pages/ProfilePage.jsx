import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  useToast,
  Avatar,
  Divider,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import orderService from '../services/orderService';
import OrderSummary from '../components/checkout/OrderSummary';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const toast = useToast();

  // Set form values when user data is available
  useEffect(() => {
    if (user) {
      setValue('firstName', user.first_name);
      setValue('lastName', user.last_name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getUserOrders();
        setOrders(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Error al cargar los pedidos');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateProfile({
        first_name: data.firstName,
        last_name: data.lastName
      });
      
      toast({
        title: 'Perfil actualizado',
        description: 'Tu información ha sido actualizada correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      
      toast({
        title: 'Error',
        description: err.message || 'Error al actualizar el perfil',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      
      setLoading(false);
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>
          Mi Perfil
        </Heading>

        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Información Personal</Tab>
            <Tab>Mis Pedidos</Tab>
          </TabList>

          <TabPanels>
            {/* Personal Information Tab */}
            <TabPanel>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap={8}
                align={{ base: 'center', md: 'start' }}
              >
                <Box
                  textAlign="center"
                  p={6}
                  bg={bgColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  width={{ base: 'full', md: '250px' }}
                >
                  <Avatar
                    size="2xl"
                    name={user ? `${user.first_name} ${user.last_name}` : ''}
                    mb={4}
                    bg="blue.500"
                  />
                  <Heading as="h3" size="md">
                    {user ? `${user.first_name} ${user.last_name}` : ''}
                  </Heading>
                  <Text color="gray.500">{user?.email}</Text>
                  <Text mt={2} fontSize="sm">
                    Miembro desde: {user ? new Date(user.created_at).toLocaleDateString() : ''}
                  </Text>
                </Box>

                <Box
                  flex="1"
                  p={6}
                  bg={bgColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                >
                  <Heading as="h2" size="lg" mb={6}>
                    Editar Perfil
                  </Heading>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                      <FormControl isInvalid={errors.firstName}>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                          {...register('firstName', {
                            required: 'El nombre es obligatorio'
                          })}
                        />
                        {errors.firstName && (
                          <Text color="red.500" fontSize="sm">
                            {errors.firstName.message}
                          </Text>
                        )}
                      </FormControl>

                      <FormControl isInvalid={errors.lastName}>
                        <FormLabel>Apellido</FormLabel>
                        <Input
                          {...register('lastName', {
                            required: 'El apellido es obligatorio'
                          })}
                        />
                        {errors.lastName && (
                          <Text color="red.500" fontSize="sm">
                            {errors.lastName.message}
                          </Text>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          {...register('email')}
                          isReadOnly
                          bg="gray.50"
                        />
                        <Text fontSize="sm" color="gray.500" mt={1}>
                          El email no se puede cambiar
                        </Text>
                      </FormControl>

                      <Button
                        type="submit"
                        colorScheme="blue"
                        isLoading={loading}
                        mt={4}
                      >
                        Guardar Cambios
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Flex>
            </TabPanel>

            {/* Orders Tab */}
            <TabPanel>
              <Box
                p={6}
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
              >
                <Heading as="h2" size="lg" mb={6}>
                  Mis Pedidos
                </Heading>

                {loading ? (
                  <Text>Cargando pedidos...</Text>
                ) : error ? (
                  <Alert status="error">
                    <AlertIcon />
                    {error}
                  </Alert>
                ) : orders.length === 0 ? (
                  <Alert status="info">
                    <AlertIcon />
                    No tienes pedidos realizados
                  </Alert>
                ) : (
                  <Stack spacing={6}>
                    {orders.map(order => (
                      <Box key={order.id}>
                        <OrderSummary order={order} />
                        <Divider my={6} />
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
