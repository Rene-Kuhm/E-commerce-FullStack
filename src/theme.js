import { extendTheme } from "@chakra-ui/react";

// Tema personalizado para SportFusion (estilo Nike)
const theme = extendTheme({
  // Paleta de colores inspirada en Nike
  colors: {
    brand: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#000000", // Negro principal de Nike
      600: "#000000",
      700: "#000000",
      800: "#000000",
      900: "#000000",
    },
    accent: {
      50: "#ffe5e5",
      100: "#ffb8b8",
      200: "#ff8a8a",
      300: "#ff5c5c",
      400: "#ff2e2e",
      500: "#ff0000", // Rojo de Nike
      600: "#cc0000",
      700: "#990000",
      800: "#660000",
      900: "#330000",
    },
    neutral: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
  },
  // Tipografía minimalista estilo Nike
  fonts: {
    heading: "'Futura', 'Helvetica Neue', 'Arial', sans-serif",
    body: "'Helvetica Neue', 'Arial', sans-serif",
  },
  // Estilos globales inspirados en Nike
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
        lineHeight: "tall",
        fontWeight: "400",
        letterSpacing: "-0.01em",
      },
      "*::placeholder": {
        color: props.colorMode === "dark" ? "gray.400" : "gray.500",
      },
      "*, *::before, &::after": {
        borderColor: props.colorMode === "dark" ? "gray.700" : "gray.100",
      },
      "h1, h2, h3, h4, h5, h6": {
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
      },
    }),
  },
  // Personalización de componentes estilo Nike
  components: {
    Button: {
      baseStyle: {
        fontWeight: "700",
        borderRadius: "full", // Botones redondeados como Nike
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        _focus: {
          boxShadow: "none",
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === "brand" ? "black" :
              props.colorScheme === "accent" ? "accent.500" : undefined,
          color: "white",
          _hover: {
            bg: props.colorScheme === "brand" ? "gray.800" :
                props.colorScheme === "accent" ? "accent.600" : undefined,
            _disabled: {
              bg: props.colorScheme === "brand" ? "black" :
                  props.colorScheme === "accent" ? "accent.500" : undefined,
            },
          },
        }),
        outline: (props) => ({
          borderColor: props.colorScheme === "brand" ? "black" :
                      props.colorScheme === "accent" ? "accent.500" : undefined,
          color: props.colorScheme === "brand" ? "black" :
                props.colorScheme === "accent" ? "accent.500" : undefined,
          borderWidth: "1px",
          _hover: {
            bg: props.colorMode === "dark" ? "whiteAlpha.100" :
                props.colorScheme === "brand" ? "gray.100" :
                props.colorScheme === "accent" ? "accent.50" : undefined,
          },
        }),
        ghost: (props) => ({
          color: props.colorScheme === "brand" ? "black" :
                props.colorScheme === "accent" ? "accent.500" : undefined,
          _hover: {
            bg: props.colorMode === "dark" ? "whiteAlpha.100" :
                props.colorScheme === "brand" ? "gray.100" :
                props.colorScheme === "accent" ? "accent.50" : undefined,
          },
        }),
        // Variante Nike especial
        nike: {
          bg: "black",
          color: "white",
          borderRadius: "full",
          px: 8,
          py: 6,
          fontSize: "md",
          fontWeight: "bold",
          _hover: {
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          _active: {
            transform: "translateY(0)",
          },
        },
      },
      defaultProps: {
        colorScheme: "brand",
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "700",
        lineHeight: "1.2",
      },
      sizes: {
        xl: {
          fontSize: ["3xl", "4xl", "5xl"],
          lineHeight: 1.1,
        },
        lg: {
          fontSize: ["2xl", "3xl", "4xl"],
          lineHeight: 1.2,
        },
        md: {
          fontSize: ["xl", "2xl", "3xl"],
          lineHeight: 1.2,
        },
        sm: {
          fontSize: ["md", "lg", "xl"],
          lineHeight: 1.3,
        },
      },
    },
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === "dark" ? "gray.800" : "white",
          borderRadius: "lg",
          boxShadow: "md",
          overflow: "hidden",
          transition: "all 0.3s",
          _hover: {
            boxShadow: "lg",
            transform: "translateY(-2px)",
          },
        },
        header: {
          p: 4,
          borderBottom: "1px solid",
          borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
        },
        body: {
          p: 4,
        },
        footer: {
          p: 4,
          borderTop: "1px solid",
          borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
        },
      }),
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "md",
        },
      },
      variants: {
        filled: (props) => ({
          field: {
            bg: props.colorMode === "dark" ? "whiteAlpha.50" : "gray.100",
            _hover: {
              bg: props.colorMode === "dark" ? "whiteAlpha.100" : "gray.200",
            },
            _focus: {
              bg: props.colorMode === "dark" ? "whiteAlpha.100" : "gray.200",
              borderColor: "brand.500",
            },
          },
        }),
      },
      defaultProps: {
        variant: "filled",
      },
    },
  },
  // Breakpoints para diseño responsive
  breakpoints: {
    sm: "30em",     // 480px
    md: "48em",     // 768px
    lg: "62em",     // 992px
    xl: "80em",     // 1280px
    "2xl": "96em", // 1536px
  },
});

export default theme;
