import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box flex="1">{children}</Box>
          <Footer />
        </Box>
      </CartProvider>
    </AuthProvider>
  );
};

export default Layout;
