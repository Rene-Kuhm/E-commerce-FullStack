/**
 * Configuración de branding para la aplicación
 */

export const BRAND = {
  // Información general
  NAME: "EliteStore",
  SLOGAN: "Calidad Premium, Siempre a tu Alcance",
  YEAR_FOUNDED: 2023,
  
  // Colores principales (para referencia, los colores reales se definen en theme.js)
  COLORS: {
    PRIMARY: "blue.500",
    SECONDARY: "teal.400",
    ACCENT: "purple.500",
  },
  
  // Información de contacto
  CONTACT: {
    EMAIL: "info@elitestore.com",
    PHONE: "+34 912 345 678",
    ADDRESS: "Calle Comercio 123, Madrid, España",
  },
  
  // Redes sociales
  SOCIAL: {
    FACEBOOK: "https://facebook.com/elitestore",
    INSTAGRAM: "https://instagram.com/elitestore",
    TWITTER: "https://twitter.com/elitestore",
  },
  
  // Políticas y términos
  LEGAL: {
    PRIVACY_POLICY: "/politicas-de-privacidad",
    TERMS_OF_SERVICE: "/terminos-de-servicio",
    SHIPPING_POLICY: "/politicas-de-envio",
    RETURN_POLICY: "/politicas-de-devolucion",
  },
  
  // Categorías principales
  CATEGORIES: [
    { id: "electronics", name: "Electrónica" },
    { id: "accessories", name: "Accesorios" },
    { id: "home", name: "Hogar" },
    { id: "fashion", name: "Moda" },
  ],
  
  // Métodos de pago aceptados
  PAYMENT_METHODS: [
    "Visa", 
    "MasterCard", 
    "American Express", 
    "PayPal", 
    "Apple Pay", 
    "Google Pay"
  ],
  
  // Opciones de envío
  SHIPPING: {
    FREE_THRESHOLD: 100,
    STANDARD_COST: 10,
    EXPRESS_COST: 20,
  },
};

export default BRAND;
