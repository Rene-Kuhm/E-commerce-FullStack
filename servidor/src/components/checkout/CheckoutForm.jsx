import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCart } from '../../context/CartContext';
import orderService from '../../services/orderService';

const CheckoutForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      // Preparar datos del pedido
      const orderData = {
        shipping_address: {
          address_line1: data.address,
          address_line2: data.addressLine2,
          city: data.city,
          state: data.state,
          postal_code: data.postalCode,
          country: data.country
        },
        payment_method: data.paymentMethod,
        notes: data.notes
      };

      // Crear pedido
      const response = await orderService.createOrder(orderData);
      
      // Limpiar carrito
      clearCart();
      
      // Mostrar mensaje de éxito
      toast({
        title: 'Pedido realizado con éxito',
        description: `Tu número de pedido es: ${response.data.id}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Redirigir a la página de confirmación
      navigate(`/orders/${response.data.id}`);
    } catch (error) {
      toast({
        title: 'Error al procesar el pedido',
        description: error.message || 'Ha ocurrido un error al procesar tu pedido',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Calcular subtotal, impuestos y envío
  const subtotal = total;
  const tax = subtotal * 0.16; // 16% de impuestos
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0; // Envío gratis para compras mayores a $100
  const finalTotal = subtotal + tax + shipping;

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      p={5}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      shadow="sm"
    >
      <Stack spacing={6}>
        <Heading size="md">Información de Envío</Heading>
        
        <FormControl isInvalid={errors.address}>
          <FormLabel>Dirección</FormLabel>
          <Input
            {...register('address', { required: 'La dirección es obligatoria' })}
            placeholder="Calle y número"
          />
          {errors.address && <Text color="red.500">{errors.address.message}</Text>}
        </FormControl>
        
        <FormControl>
          <FormLabel>Dirección (línea 2)</FormLabel>
          <Input
            {...register('addressLine2')}
            placeholder="Apartamento, suite, etc. (opcional)"
          />
        </FormControl>
        
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <FormControl isInvalid={errors.city}>
            <FormLabel>Ciudad</FormLabel>
            <Input
              {...register('city', { required: 'La ciudad es obligatoria' })}
              placeholder="Ciudad"
            />
            {errors.city && <Text color="red.500">{errors.city.message}</Text>}
          </FormControl>
          
          <FormControl isInvalid={errors.state}>
            <FormLabel>Estado/Provincia</FormLabel>
            <Input
              {...register('state', { required: 'El estado es obligatorio' })}
              placeholder="Estado"
            />
            {errors.state && <Text color="red.500">{errors.state.message}</Text>}
          </FormControl>
        </Flex>
        
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <FormControl isInvalid={errors.postalCode}>
            <FormLabel>Código Postal</FormLabel>
            <Input
              {...register('postalCode', { required: 'El código postal es obligatorio' })}
              placeholder="Código postal"
            />
            {errors.postalCode && <Text color="red.500">{errors.postalCode.message}</Text>}
          </FormControl>
          
          <FormControl isInvalid={errors.country}>
            <FormLabel>País</FormLabel>
            <Select
              {...register('country', { required: 'El país es obligatorio' })}
              placeholder="Selecciona un país"
            >
              <option value="MX">México</option>
              <option value="US">Estados Unidos</option>
              <option value="CA">Canadá</option>
              <option value="ES">España</option>
              <option value="CO">Colombia</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
              <option value="PE">Perú</option>
            </Select>
            {errors.country && <Text color="red.500">{errors.country.message}</Text>}
          </FormControl>
        </Flex>
        
        <Divider />
        
        <Heading size="md">Método de Pago</Heading>
        
        <FormControl isInvalid={errors.paymentMethod}>
          <FormLabel>Selecciona un método de pago</FormLabel>
          <RadioGroup defaultValue="credit_card">
            <Stack spacing={4}>
              <Radio
                {...register('paymentMethod', { required: 'Selecciona un método de pago' })}
                value="credit_card"
              >
                Tarjeta de Crédito/Débito
              </Radio>
              <Radio
                {...register('paymentMethod')}
                value="paypal"
              >
                PayPal
              </Radio>
              <Radio
                {...register('paymentMethod')}
                value="bank_transfer"
              >
                Transferencia Bancaria
              </Radio>
            </Stack>
          </RadioGroup>
          {errors.paymentMethod && <Text color="red.500">{errors.paymentMethod.message}</Text>}
        </FormControl>
        
        <Divider />
        
        <FormControl>
          <FormLabel>Notas adicionales (opcional)</FormLabel>
          <Textarea
            {...register('notes')}
            placeholder="Instrucciones especiales para la entrega, etc."
            rows={3}
          />
        </FormControl>
        
        <Divider />
        
        <Box>
          <Heading size="md" mb={4}>Resumen del Pedido</Heading>
          
          <Stack spacing={2}>
            <Flex justify="space-between">
              <Text>Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </Flex>
            
            <Flex justify="space-between">
              <Text>Impuestos (16%)</Text>
              <Text>${tax.toFixed(2)}</Text>
            </Flex>
            
            <Flex justify="space-between">
              <Text>Envío</Text>
              <Text>
                {shipping === 0 && subtotal > 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
              </Text>
            </Flex>
            
            <Divider />
            
            <Flex justify="space-between" fontWeight="bold">
              <Text>Total</Text>
              <Text fontSize="xl">${finalTotal.toFixed(2)}</Text>
            </Flex>
          </Stack>
        </Box>
        
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          isLoading={isSubmitting}
          isDisabled={cart.items.length === 0}
        >
          Confirmar Pedido
        </Button>
      </Stack>
    </Box>
  );
};

export default CheckoutForm;
