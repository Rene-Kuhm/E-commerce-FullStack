import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          // Verificar que el token sigue siendo válido
          try {
            const { data } = await authService.getProfile();
            setUser(data);
          } catch (err) {
            // Si hay un error, el token probablemente expiró
            authService.logout();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Error al inicializar autenticación:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const { data } = await authService.login(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const { data } = await authService.register(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Error al registrarse');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const { data } = await authService.updateProfile(userData);
      setUser(prev => ({ ...prev, ...data }));
      return data;
    } catch (err) {
      setError(err.message || 'Error al actualizar perfil');
      throw err;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error,
        login, 
        register, 
        logout, 
        updateProfile,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
