import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login, register: registerUser, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or query params
  const from = location.state?.from?.pathname || 
               new URLSearchParams(location.search).get('redirect') || 
               '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Reset form when switching between login and register
  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await login({
          email: data.email,
          password: data.password
        });
      } else {
        await registerUser({
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName
        });
      }
      // Redirect will happen in the useEffect
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <Container maxW="md" py={12}>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Stack spacing={6}>
            <Heading textAlign="center" size="xl">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Heading>
            
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                {!isLogin && (
                  <>
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
                  </>
                )}
                
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                  />
                  {errors.email && (
                    <Text color="red.500" fontSize="sm">
                      {errors.email.message}
                    </Text>
                  )}
                </FormControl>
                
                <FormControl isInvalid={errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                          value: 6,
                          message: 'La contraseña debe tener al menos 6 caracteres'
                        }
                      })}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        onClick={togglePasswordVisibility}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text color="red.500" fontSize="sm">
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  mt={4}
                >
                  {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </Button>
              </Stack>
            </form>
            
            <Divider />
            
            <Flex direction="column" align="center">
              <Text>
                {isLogin
                  ? '¿No tienes una cuenta?'
                  : '¿Ya tienes una cuenta?'}
              </Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </Button>
            </Flex>
            
            {isLogin && (
              <Button
                as={RouterLink}
                to="/forgot-password"
                variant="link"
                colorScheme="blue"
                alignSelf="center"
              >
                ¿Olvidaste tu contraseña?
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
