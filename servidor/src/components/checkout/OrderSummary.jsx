import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Divider,
  Image,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';

const OrderSummary = ({ order }) => {
  if (!order) return null;

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Función para mostrar el estado del pedido
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

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Box
      p={5}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      shadow="sm"
    >
      <Stack spacing={4}>
        <Flex justify="space-between" align="center">
          <Heading size="md">Pedido #{order.id.substring(0, 8)}</Heading>
          {getStatusBadge(order.status)}
        </Flex>
        
        <Text color="gray.500">
          Realizado el {formatDate(order.created_at)}
        </Text>
        
        <Divider />
        
        <Heading size="sm">Productos</Heading>
        
        <Stack spacing={3}>
          {order.items && order.items.map(item => (
            <Flex key={item.id} align="center" p={2} borderWidth="1px" borderRadius="md">
              <Image
                src={item.products?.image_url || 'https://via.placeholder.com/50?text=No+Image'}
                alt={item.products?.name}
                boxSize="50px"
                objectFit="cover"
                mr={3}
                borderRadius="md"
              />
              <Box flex="1">
                <Text fontWeight="medium">{item.products?.name}</Text>
                <Text fontSize="sm">Cantidad: {item.quantity}</Text>
              </Box>
              <Text fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Text>
            </Flex>
          ))}
        </Stack>
        
        <Divider />
        
        <Heading size="sm">Dirección de Envío</Heading>
        <Box p={3} borderWidth="1px" borderRadius="md">
          <Text>{order.shipping_address.address_line1}</Text>
          {order.shipping_address.address_line2 && (
            <Text>{order.shipping_address.address_line2}</Text>
          )}
          <Text>
            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
          </Text>
          <Text>{order.shipping_address.country}</Text>
        </Box>
        
        <Divider />
        
        <Heading size="sm">Método de Pago</Heading>
        <Text>{order.payment_method}</Text>
        
        {order.tracking_number && (
          <>
            <Divider />
            <Heading size="sm">Número de Seguimiento</Heading>
            <Text>{order.tracking_number}</Text>
          </>
        )}
        
        {order.notes && (
          <>
            <Divider />
            <Heading size="sm">Notas</Heading>
            <Text>{order.notes}</Text>
          </>
        )}
        
        <Divider />
        
        <Stack spacing={2}>
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text>${(order.total_amount * 0.84).toFixed(2)}</Text>
          </Flex>
          
          <Flex justify="space-between">
            <Text>Impuestos (16%)</Text>
            <Text>${(order.total_amount * 0.16).toFixed(2)}</Text>
          </Flex>
          
          <Flex justify="space-between">
            <Text>Envío</Text>
            <Text>
              {order.total_amount > 100 ? 'Gratis' : '$10.00'}
            </Text>
          </Flex>
          
          <Divider />
          
          <Flex justify="space-between" fontWeight="bold">
            <Text>Total</Text>
            <Text fontSize="xl">${order.total_amount.toFixed(2)}</Text>
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderSummary;
