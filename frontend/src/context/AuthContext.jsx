import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../config/supabase";

// Crear un contexto para la autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener la sesión actual de Supabase
    const getSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error al obtener la sesión:", error);
          setError(error.message);
          return;
        }

        if (data?.session) {
          console.log("Sesión encontrada:", data.session);
          const { data: userData } = await supabase.auth.getUser();
          setUser(userData.user);
        } else {
          console.log("No hay sesión activa");
          setUser(null);
        }
      } catch (err) {
        console.error("Error inesperado al obtener la sesión:", err);
        setError("Error al cargar la sesión");
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Suscribirse a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Cambio de estado de autenticación:", event, session);
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      // Limpiar suscripción al desmontar
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      console.log("Iniciando sesión con:", credentials);
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        console.error("Error en login de Supabase:", error);
        setError(error.message);
        throw error;
      }

      console.log("Usuario autenticado:", data.user);
      setUser(data.user);
      return { user: data.user };
    } catch (err) {
      console.error("Error en login:", err);
      setError(err.message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar usuario
  const register = async (userData) => {
    try {
      console.log("Registrando usuario:", userData);
      setLoading(true);

      // Registrar usuario en Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: "customer"
          }
        }
      });

      if (error) {
        console.error("Error en registro de Supabase:", error);
        setError(error.message);
        throw error;
      }

      console.log("Usuario registrado:", data.user);
      setUser(data.user);
      return { user: data.user };
    } catch (err) {
      console.error("Error en registro:", err);
      setError(err.message || "Error al registrar usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      console.log("Cerrando sesión");
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error al cerrar sesión:", error);
        setError(error.message);
        throw error;
      }

      setUser(null);
      console.log("Sesión cerrada");
    } catch (err) {
      console.error("Error inesperado al cerrar sesión:", err);
      setError(err.message || "Error al cerrar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar perfil
  const updateProfile = async (userData) => {
    try {
      console.log("Actualizando perfil:", userData);
      setLoading(true);

      const { data, error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) {
        console.error("Error al actualizar perfil:", error);
        setError(error.message);
        throw error;
      }

      console.log("Perfil actualizado:", data.user);
      setUser(data.user);
      return data.user;
    } catch (err) {
      console.error("Error inesperado al actualizar perfil:", err);
      setError(err.message || "Error al actualizar perfil");
      throw err;
    } finally {
      setLoading(false);
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
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
