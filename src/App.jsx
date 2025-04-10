import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { protectedLoader } from "./utils/authUtils";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// // Comentado porque aún no existe esta página
// import ProfilePage from "./pages/ProfilePage"; // Comentado porque aún no existe
import NotFoundPage from "./pages/NotFoundPage";

// Componente para envolver cada página con el Layout
const PageWithLayout = ({ Component }) => (
  <Layout>
    <Component />
  </Layout>
);

// Create router with future flags
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PageWithLayout Component={HomePage} />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/products",
      element: <PageWithLayout Component={ProductsPage} />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/cart",
      element: <PageWithLayout Component={CartPage} />,
      loader: protectedLoader,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/login",
      element: <PageWithLayout Component={LoginPage} />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/register",
      element: <PageWithLayout Component={RegisterPage} />,
      errorElement: <ErrorBoundary />,
    },
    // Protected routes can be added here with the protectedLoader
    {
      path: "/profile",
      element: <PageWithLayout Component={NotFoundPage} />, // Reemplazar con ProfilePage cuando esté disponible
      loader: protectedLoader,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/checkout",
      element: <PageWithLayout Component={NotFoundPage} />, // Reemplazar con CheckoutPage cuando esté disponible
      loader: protectedLoader,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "*",
      element: <PageWithLayout Component={NotFoundPage} />,
      errorElement: <ErrorBoundary />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider
        router={router}
        fallbackElement={<LoadingIndicator />}
      />
    </ChakraProvider>
  );
}

export default App;
