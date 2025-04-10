import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@chakra-ui/react";

// Crear un contexto para el carrito
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  // Cargar el carrito cuando el componente se monta
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para añadir un producto al carrito
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product_id === product.id
      );

      let updatedItems;
      let isNewItem = false;

      if (existingItemIndex >= 0) {
        // Si el producto ya está en el carrito, actualizar cantidad
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };

        // Mostrar notificación de actualización
        toast({
          title: "Carrito actualizado",
          description: `Se actualizó la cantidad de ${product.name || 'producto'} en tu carrito.`,
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
      } else {
        // Si es un producto nuevo, añadirlo al carrito
        isNewItem = true;
        updatedItems = [
          ...prevCart.items,
          {
            id: Date.now().toString(), // ID temporal
            product_id: product.id,
            quantity,
            products: product // Guardar el producto completo
          }
        ];

        // Mostrar notificación de producto añadido
        toast({
          title: "Producto añadido",
          description: `${product.name || 'Producto'} añadido a tu carrito.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
      }

      return { ...prevCart, items: updatedItems };
    });
  };

  // Función para actualizar la cantidad de un item
  const updateCartItem = (itemId, quantity) => {
    setCart(prevCart => {
      // Encontrar el item para mostrar su nombre en la notificación
      const itemToUpdate = prevCart.items.find(item => item.id === itemId);
      const productName = itemToUpdate?.products?.name || 'Producto';

      const updatedItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );

      // Mostrar notificación
      toast({
        title: "Carrito actualizado",
        description: `Se actualizó la cantidad de ${productName} en tu carrito.`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });

      return { ...prevCart, items: updatedItems };
    });
  };

  // Función para eliminar un item del carrito
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      // Encontrar el item para mostrar su nombre en la notificación
      const itemToRemove = prevCart.items.find(item => item.id === itemId);
      const productName = itemToRemove?.products?.name || 'Producto';

      const updatedItems = prevCart.items.filter(item => item.id !== itemId);

      // Mostrar notificación
      toast({
        title: "Producto eliminado",
        description: `${productName} ha sido eliminado de tu carrito.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });

      return { ...prevCart, items: updatedItems };
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart({ items: [] });

    // Mostrar notificación
    toast({
      title: "Carrito vaciado",
      description: "Se han eliminado todos los productos del carrito.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right"
    });
  };

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = item.products?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        total: calculateTotal(),
        itemCount: cart.items.reduce((count, item) => count + (item.quantity || 0), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
