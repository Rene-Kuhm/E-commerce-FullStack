import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Flex,
  Link,
  useColorModeValue,
  Center,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import orderService from '../services/orderService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Fetch orders
        const ordersResponse = await orderService.getUserOrders();
        setOrders(ordersResponse.data || []);
        
        // Fetch stats
        const statsResponse = await orderService.getUserStats();
        setStats(statsResponse.data || {});
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Error al cargar los pedidos');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { color: 'yellow', text: 'Pendiente' },
      'processing': { color: 'blue', text: 'Procesando' },
      'shipped': { color: 'purple', text: 'Enviado' },
      'delivered': { color: 'green', text: 'Entregado' },
      'cancelled': { color: 'red', text: 'Cancelado' }
    };

    const statusInfo = statusMap[status] || { color: 'gray', text: status };

    return (
      <Badge colorScheme={statusInfo.color} fontSize="0.8em" p={1} borderRadius="md">
        {statusInfo.text}
      </Badge>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (loading) {
    return (
      <Layout>
        <Center h="50vh">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="xl" mb={6}>
          Mis Pedidos
        </Heading>

        {error ? (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <>
            {/* Stats Section */}
            {stats && (
              <Box
                p={5}
                mb={6}
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                shadow="sm"
              >
                <Heading as="h2" size="md" mb={4}>
                  Resumen de Pedidos
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                  <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
                    <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                      {stats.totalOrders || 0}
                    </Text>
                    <Text>Pedidos Totales</Text>
                  </Box>
                  
                  <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
                    <Text fontSize="3xl" fontWeight="bold" color="green.500">
                      ${stats.totalSpent?.toFixed(2) || '0.00'}
                    </Text>
                    <Text>Gasto Total</Text>
                  </Box>
                  
                  <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
                    <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                      {stats.statusCounts?.delivered || 0}
                    </Text>
                    <Text>Pedidos Entregados</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            )}

            {/* Orders List */}
            {orders.length === 0 ? (
              <Alert status="info">
                <AlertIcon />
                No tienes pedidos realizados
              </Alert>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {orders.map(order => (
                  <Box
                    key={order.id}
                    p={5}
                    bg={bgColor}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="lg"
                    shadow="sm"
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-5px)', shadow: 'md' }}
                  >
                    <Flex justify="space-between" align="center" mb={3}>
                      <Heading as="h3" size="md">
                        Pedido #{order.id.substring(0, 8)}
                      </Heading>
                      {getStatusBadge(order.status)}
                    </Flex>
                    
                    <Text color="gray.500" mb={3}>
                      Fecha: {formatDate(order.created_at)}
                    </Text>
                    
                    <Text mb={3}>
                      Total: <strong>${order.total_amount.toFixed(2)}</strong>
                    </Text>
                    
                    <Text mb={3}>
                      Método de pago: {order.payment_method}
                    </Text>
                    
                    <Link
                      as={RouterLink}
                      to={`/orders/${order.id}`}
                      color="blue.500"
                      fontWeight="bold"
                    >
                      Ver detalles
                    </Link>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default OrdersPage;
