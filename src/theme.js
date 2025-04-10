import { extendTheme } from "@chakra-ui/react";

// Tema personalizado para EliteStore
const theme = extendTheme({
  // Paleta de colores profesional
  colors: {
    brand: {
      50: "#e6f1ff",
      100: "#b8d5ff",
      200: "#8ab9ff",
      300: "#5c9dff",
      400: "#2e81ff",
      500: "#0065e6", // Color principal
      600: "#0050b4",
      700: "#003b82",
      800: "#002651",
      900: "#001021",
    },
    accent: {
      50: "#e6fbf9",
      100: "#ccf7f3",
      200: "#99efea",
      300: "#66e7e0",
      400: "#33dfd7",
      500: "#00d7cd", // Color de acento
      600: "#00aca4",
      700: "#00817b",
      800: "#005652",
      900: "#002b29",
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
  // Tipografía moderna y profesional
  fonts: {
    heading: "'Montserrat', 'Inter', system-ui, sans-serif",
    body: "'Open Sans', 'Inter', system-ui, sans-serif",
  },
  // Estilos globales
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "white" : "gray.800",
        lineHeight: "tall",
      },
      "*::placeholder": {
        color: props.colorMode === "dark" ? "gray.400" : "gray.500",
      },
      "*, *::before, &::after": {
        borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
      },
    }),
  },
  // Personalización de componentes
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "md",
        _focus: {
          boxShadow: "outline",
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === "brand" ? "brand.500" :
              props.colorScheme === "accent" ? "accent.500" : undefined,
          color: "white",
          _hover: {
            bg: props.colorScheme === "brand" ? "brand.600" :
                props.colorScheme === "accent" ? "accent.600" : undefined,
            _disabled: {
              bg: props.colorScheme === "brand" ? "brand.500" :
                  props.colorScheme === "accent" ? "accent.500" : undefined,
            },
          },
        }),
        outline: (props) => ({
          borderColor: props.colorScheme === "brand" ? "brand.500" :
                      props.colorScheme === "accent" ? "accent.500" : undefined,
          color: props.colorScheme === "brand" ? "brand.500" :
                props.colorScheme === "accent" ? "accent.500" : undefined,
          _hover: {
            bg: props.colorMode === "dark" ? "whiteAlpha.100" :
                props.colorScheme === "brand" ? "brand.50" :
                props.colorScheme === "accent" ? "accent.50" : undefined,
          },
        }),
        ghost: (props) => ({
          color: props.colorScheme === "brand" ? "brand.500" :
                props.colorScheme === "accent" ? "accent.500" : undefined,
          _hover: {
            bg: props.colorMode === "dark" ? "whiteAlpha.100" :
                props.colorScheme === "brand" ? "brand.50" :
                props.colorScheme === "accent" ? "accent.50" : undefined,
          },
        }),
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
