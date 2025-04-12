import { createContext, useState, useEffect, useContext } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Cargar el carrito cuando el usuario inicia sesión
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Si el usuario no está autenticado, usar carrito local
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart({ items: [] });
      }
    }
  }, [isAuthenticated]);

  // Guardar carrito local cuando cambia
  useEffect(() => {
    if (!isAuthenticated && cart.items) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const { data } = await cartService.getCart();
      setCart(data);
    } catch (err) {
      setError(err.message || 'Error al obtener el carrito');
      console.error('Error al obtener el carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated) {
        // Añadir al carrito en el servidor
        const { data } = await cartService.addToCart(product.id, quantity);
        setCart(data);
      } else {
        // Añadir al carrito local
        const existingItemIndex = cart.items.findIndex(
          item => item.product_id === product.id
        );

        if (existingItemIndex >= 0) {
          // Si el producto ya está en el carrito, actualizar cantidad
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex].quantity += quantity;
          setCart({ ...cart, items: updatedItems });
        } else {
          // Si es un producto nuevo, añadirlo al carrito
          setCart({
            ...cart,
            items: [
              ...cart.items,
              {
                product_id: product.id,
                quantity,
                products: product // Guardar el producto completo para mostrar en el carrito
              }
            ]
          });
        }
      }
    } catch (err) {
      setError(err.message || 'Error al añadir al carrito');
      console.error('Error al añadir al carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated) {
        // Actualizar en el servidor
        const { data } = await cartService.updateCartItem(itemId, quantity);
        setCart(data);
      } else {
        // Actualizar carrito local
        if (quantity <= 0) {
          // Si la cantidad es 0 o menos, eliminar el item
          removeFromCart(itemId);
        } else {
          const updatedItems = cart.items.map(item => 
            item.id === itemId ? { ...item, quantity } : item
          );
          setCart({ ...cart, items: updatedItems });
        }
      }
    } catch (err) {
      setError(err.message || 'Error al actualizar el carrito');
      console.error('Error al actualizar el carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated) {
        // Eliminar del servidor
        const { data } = await cartService.removeFromCart(itemId);
        setCart(data);
      } else {
        // Eliminar del carrito local
        const updatedItems = cart.items.filter(item => item.id !== itemId);
        setCart({ ...cart, items: updatedItems });
      }
    } catch (err) {
      setError(err.message || 'Error al eliminar del carrito');
      console.error('Error al eliminar del carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated) {
        // Vaciar carrito en el servidor
        await cartService.clearCart();
      }
      // Vaciar carrito local
      setCart({ items: [] });
      localStorage.removeItem('cart');
    } catch (err) {
      setError(err.message || 'Error al vaciar el carrito');
      console.error('Error al vaciar el carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = item.products?.price || 0;
      return total + (price * item.quantity);
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
        fetchCart,
        total: calculateTotal(),
        itemCount: cart.items.reduce((count, item) => count + item.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
