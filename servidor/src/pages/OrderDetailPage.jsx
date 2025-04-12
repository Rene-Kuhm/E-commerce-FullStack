import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Center,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Layout from '../components/layout/Layout';
import OrderSummary from '../components/checkout/OrderSummary';
import orderService from '../services/orderService';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrderById(id);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Error al cargar el pedido');
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Center h="50vh">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Center>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Alert status="error">
            <AlertIcon />
            {error || 'Pedido no encontrado'}
          </Alert>
          <Button as={RouterLink} to="/orders" mt={4} colorScheme="blue">
            Volver a Mis Pedidos
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        {/* Breadcrumbs */}
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
          mb={6}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/orders">Mis Pedidos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Pedido #{order.id.substring(0, 8)}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as="h1" size="xl" mb={6}>
          Detalles del Pedido
        </Heading>

        <OrderSummary order={order} />

        <Button
          as={RouterLink}
          to="/orders"
          mt={6}
          colorScheme="blue"
          variant="outline"
        >
          Volver a Mis Pedidos
        </Button>
      </Container>
    </Layout>
  );
};

export default OrderDetailPage;
