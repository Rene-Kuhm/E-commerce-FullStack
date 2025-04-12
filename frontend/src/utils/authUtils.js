// Authentication utility functions for React Router loaders and actions

import { supabase } from "../config/supabase";

/**
 * Checks if the user is authenticated
 * @returns {boolean} True if the user is authenticated, false otherwise
 */
export const isAuthenticated = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    console.log("Verificando autenticación, sesión:", data?.session ? "Sí" : "No");
    return !!data?.session;
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
    return false;
  }
};

/**
 * Loader function for protected routes
 * @param {Object} param0 - The loader parameters
 * @returns {Object} The loader result
 * @throws {Response} Redirects to login if not authenticated
 */
export const protectedLoader = async ({ request }) => {
  console.log("Ejecutando protectedLoader para ruta protegida");
  // Check if the user is authenticated
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    console.log("Usuario no autenticado, redirigiendo a login");
    // Get the current path to redirect back after login
    const url = new URL(request.url);
    const from = url.pathname + url.search;
    console.log("Ruta actual:", from);

    // Redirect to login with the current path as the redirect target
    const params = new URLSearchParams();
    params.set("from", from);

    throw new Response("", {
      status: 302,
      headers: {
        Location: `/login?${params.toString()}`
      }
    });
  }

  console.log("Usuario autenticado, continuando");
  // User is authenticated, continue
  return { isAuthenticated: true };
};
