import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  InputGroup,
  Input,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import BRAND from "../constants/brandConfig";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation(); // Usado en DesktopNav
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Detectar scroll para cambiar el estilo de la barra de navegación
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar búsqueda
    console.log("Búsqueda:", searchQuery);
    // Redirigir a página de resultados
  };

  return (
    <Box position="sticky" top="0" zIndex="sticky">
      <Flex
        bg={useColorModeValue(
          scrolled ? "white" : "white",
          scrolled ? "black" : "black"
        )}
        color={useColorModeValue("black", "white")}
        minH={"70px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={scrolled ? "1px" : "0"}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.100", "gray.900")}
        align={"center"}
        transition="all 0.3s ease"
        boxShadow={scrolled ? "sm" : "none"}
      >
        <Container maxW="container.xl">
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} align="center">
            <Link
              as={RouterLink}
              to="/"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontWeight="bold"
              fontSize="2xl"
              color={useColorModeValue("black", "white")}
              _hover={{
                textDecoration: "none",
              }}
              display="flex"
              alignItems="center"
            >
              {/* Nike-style Swoosh Logo */}
              <Box
                as="svg"
                height="36px"
                width="36px"
                viewBox="0 0 24 24"
                fill="currentColor"
                mr={2}
              >
                <path d="M21.5,7.5c-1.3,1.8-2.5,3.2-3.9,4.5c-1.9,1.8-3.8,3.1-5.6,4.3c-2.9,1.8-5.8,2.5-8.7,2.7c-0.8,0-1.3-0.1-1.3-0.5 c0-0.2,0.1-0.3,0.3-0.5c2.8-2.8,7.1-7.1,13.9-10.5c0.7-0.3,1.3-0.6,1.8-0.8c0.9-0.4,1.7-0.7,2.4-0.7c0.4,0,0.7,0.1,0.9,0.3 c0.2,0.2,0.3,0.5,0.3,0.8C21.7,7.2,21.6,7.4,21.5,7.5z"/>
              </Box>
              {BRAND.NAME}
            </Link>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={4}
            align="center"
          >
            <Box display={{ base: "none", md: "block" }} mr={4} minW="200px">
              <form onSubmit={handleSearch}>
                <InputGroup size="sm">
                  <Input
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    borderRadius="full"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Buscar"
                      icon={<SearchIcon />}
                      size="sm"
                      type="submit"
                      variant="ghost"
                      borderRadius="full"
                    />
                  </InputRightElement>
                </InputGroup>
              </form>
            </Box>

            <IconButton
              aria-label="Cambiar tema"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              borderRadius="full"
            />

            <Link as={RouterLink} to="/cart" position="relative">
              <IconButton
                aria-label="Carrito de compras"
                icon={<FaShoppingCart />}
                variant="ghost"
                borderRadius="full"
              />
              {itemCount > 0 && (
                <Badge
                  colorScheme="brand"
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  borderRadius="full"
                  fontSize="0.8em"
                >
                  {itemCount}
                </Badge>
              )}
            </Link>

            {isAuthenticated ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={user?.avatar || "https://bit.ly/broken-link"}
                    name={user?.first_name}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">
                    Mi Perfil
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/orders">
                    Mis Pedidos
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/wishlist">
                    Favoritos
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                fontSize={"sm"}
                fontWeight={600}
                variant={"ghost"}
                size="sm"
                color={useColorModeValue("black", "white")}
                _hover={{ bg: useColorModeValue("gray.100", "whiteAlpha.200") }}
              >
                Iniciar Sesión
              </Button>
            )}
          </Stack>
        </Container>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.700", "gray.300");
  const linkHoverColor = useColorModeValue("black", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.900");
  const location = useLocation();

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                as={RouterLink}
                to={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={location.pathname === navItem.href ? "brand.500" : linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
                {navItem.children && (
                  <Icon
                    as={ChevronDownIcon}
                    transition={"all .25s ease-in-out"}
                    w={4}
                    h={4}
                    ml={1}
                  />
                )}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("brand.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "brand.500" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"brand.500"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Box mb={4}>
        <InputGroup>
          <Input placeholder="Buscar productos..." borderRadius="full" />
          <InputRightElement>
            <IconButton
              aria-label="Buscar"
              icon={<SearchIcon />}
              size="sm"
              variant="ghost"
              borderRadius="full"
            />
          </InputRightElement>
        </InputGroup>
      </Box>

      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}

      <Box pt={4}>
        <Button
          as={RouterLink}
          to="/login"
          w="full"
          colorScheme="brand"
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={location.pathname === href ? "brand.500" : useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                as={RouterLink}
                to={child.href}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Hombre",
    href: "/products?gender=men",
    children: [
      {
        label: "Calzado",
        subLabel: "Zapatillas, botas y sandalias",
        href: "/products?gender=men&category=shoes",
      },
      {
        label: "Ropa",
        subLabel: "Camisetas, pantalones y chaquetas",
        href: "/products?gender=men&category=clothing",
      },
      {
        label: "Accesorios",
        subLabel: "Mochilas, gorras y calcetines",
        href: "/products?gender=men&category=accessories",
      },
      {
        label: "Deporte",
        subLabel: "Fútbol, running y entrenamiento",
        href: "/products?gender=men&category=sport",
      },
    ],
  },
  {
    label: "Mujer",
    href: "/products?gender=women",
    children: [
      {
        label: "Calzado",
        subLabel: "Zapatillas, botas y sandalias",
        href: "/products?gender=women&category=shoes",
      },
      {
        label: "Ropa",
        subLabel: "Camisetas, pantalones y chaquetas",
        href: "/products?gender=women&category=clothing",
      },
      {
        label: "Accesorios",
        subLabel: "Mochilas, gorras y calcetines",
        href: "/products?gender=women&category=accessories",
      },
      {
        label: "Deporte",
        subLabel: "Yoga, running y entrenamiento",
        href: "/products?gender=women&category=sport",
      },
    ],
  },
  {
    label: "Niños",
    href: "/products?gender=kids",
    children: [
      {
        label: "Niños pequeños",
        subLabel: "Edades 1-4",
        href: "/products?gender=kids&age=toddler",
      },
      {
        label: "Niños",
        subLabel: "Edades 5-12",
        href: "/products?gender=kids&age=children",
      },
      {
        label: "Adolescentes",
        subLabel: "Edades 13-17",
        href: "/products?gender=kids&age=teens",
      },
    ],
  },
  {
    label: "Ofertas",
    href: "/offers",
  },
  {
    label: "Novedades",
    href: "/new-arrivals",
  },
];
