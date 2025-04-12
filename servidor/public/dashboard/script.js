// API URL
const API_URL = '/api';

// DOM Elements
const dashboardContent = document.getElementById('dashboard-content');
const authContainer = document.getElementById('auth-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const userNameElement = document.getElementById('user-name');
const logoutLinks = document.querySelectorAll('#logout-link, #dropdown-logout');
const pageTitle = document.getElementById('page-title');
const addProductBtn = document.getElementById('add-product-btn');

// Navigation elements
const dashboardLink = document.getElementById('dashboard-link');
const productsLink = document.getElementById('products-link');
const ordersLink = document.getElementById('orders-link');
const usersLink = document.getElementById('users-link');
const settingsLink = document.getElementById('settings-link');

// Content sections
const dashboardSection = document.getElementById('dashboard-content');
const dashboardMainContent = document.querySelectorAll('#dashboard-content > .row');
const productsSection = document.getElementById('products-section');
const ordersSection = document.getElementById('orders-section');
const usersSection = document.getElementById('users-section');
const settingsSection = document.getElementById('settings-section');

// Toast elements
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastMessage = document.getElementById('toast-message');
const bsToast = new bootstrap.Toast(toast);

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', checkAuth);

// Event listeners for auth forms
loginTab.addEventListener('click', showLoginForm);
registerTab.addEventListener('click', showRegisterForm);
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);

// Event listeners for navigation
dashboardLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('dashboard');
});
productsLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('products');
});
ordersLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('orders');
});
usersLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('users');
});
settingsLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('settings');
});

// Event listeners for logout
logoutLinks.forEach(link => {
  link.addEventListener('click', handleLogout);
});

// Event listener for add product button
if (addProductBtn) {
  addProductBtn.addEventListener('click', () => {
    showAddProductModal();
  });
}

/**
 * Check if user is authenticated
 */
function checkAuth() {
  // Para desarrollo, mostrar directamente el dashboard
  // En producción, descomentar el código de autenticación

  // Simular un usuario para desarrollo
  const mockUser = {
    id: '1',
    first_name: 'Admin',
    last_name: 'Usuario',
    email: 'admin@example.com',
    role: 'admin'
  };

  showDashboard(mockUser);
  showSection('dashboard');

  // Cargar datos de ejemplo
  loadDashboardData();
}

/**
 * Show login form
 */
function showLoginForm(e) {
  if (e) e.preventDefault();
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.remove('d-none');
  registerForm.classList.add('d-none');
  loginError.classList.add('d-none');
}

/**
 * Show register form
 */
function showRegisterForm(e) {
  if (e) e.preventDefault();
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.remove('d-none');
  loginForm.classList.add('d-none');
  registerError.classList.add('d-none');
}

/**
 * Handle login form submission
 */
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  loginError.classList.add('d-none');

  // Para desarrollo, simular login exitoso
  const mockUser = {
    id: '1',
    first_name: 'Admin',
    last_name: 'Usuario',
    email: email,
    role: 'admin'
  };

  showDashboard(mockUser);
  showSection('dashboard');
  loadDashboardData();
  showToast('Éxito', 'Has iniciado sesión correctamente');
}

/**
 * Handle register form submission
 */
function handleRegister(e) {
  e.preventDefault();

  const firstName = document.getElementById('register-first-name').value;
  const lastName = document.getElementById('register-last-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  registerError.classList.add('d-none');

  // Para desarrollo, simular registro exitoso
  const mockUser = {
    id: '1',
    first_name: firstName,
    last_name: lastName,
    email: email,
    role: 'admin'
  };

  showDashboard(mockUser);
  showSection('dashboard');
  loadDashboardData();
  showToast('Éxito', 'Te has registrado correctamente');
}

/**
 * Handle logout
 */
function handleLogout(e) {
  e.preventDefault();

  // Para desarrollo, simular logout
  showAuthForms();
  showToast('Sesión cerrada', 'Has cerrado sesión correctamente');
}

/**
 * Show authentication forms
 */
function showAuthForms() {
  dashboardContent.style.display = 'none';
  authContainer.classList.remove('d-none');
  showLoginForm();
}

/**
 * Show dashboard
 */
function showDashboard(user) {
  authContainer.classList.add('d-none');
  dashboardContent.style.display = 'block';

  // Update user name in header
  userNameElement.textContent = `${user.first_name} ${user.last_name}`;
}

/**
 * Show specific section
 */
function showSection(section) {
  console.log(`Mostrando sección: ${section}`);

  // Hide all sections first
  hideAllSections();

  // Remove active class from all links
  removeActiveFromLinks();

  // Show selected section
  switch(section) {
    case 'dashboard':
      // Show dashboard main content
      dashboardMainContent.forEach(element => {
        element.style.display = 'flex';
      });
      dashboardLink.classList.add('active');
      pageTitle.textContent = 'Dashboard';
      break;
    case 'products':
      productsSection.classList.remove('d-none');
      productsLink.classList.add('active');
      pageTitle.textContent = 'Productos';
      loadProducts();
      break;
    case 'orders':
      ordersSection.classList.remove('d-none');
      ordersLink.classList.add('active');
      pageTitle.textContent = 'Pedidos';
      loadOrders();
      break;
    case 'users':
      usersSection.classList.remove('d-none');
      usersLink.classList.add('active');
      pageTitle.textContent = 'Usuarios';
      loadUsers();
      break;
    case 'settings':
      settingsSection.classList.remove('d-none');
      settingsLink.classList.add('active');
      pageTitle.textContent = 'Configuración';
      break;
    default:
      // Show dashboard main content
      dashboardMainContent.forEach(element => {
        element.style.display = 'flex';
      });
      dashboardLink.classList.add('active');
      pageTitle.textContent = 'Dashboard';
  }
}

/**
 * Hide all sections
 */
function hideAllSections() {
  // Hide main dashboard content
  dashboardMainContent.forEach(element => {
    element.style.display = 'none';
  });

  // Hide specific sections
  productsSection.classList.add('d-none');
  ordersSection.classList.add('d-none');
  usersSection.classList.add('d-none');
  settingsSection.classList.add('d-none');
}

/**
 * Remove active class from all navigation links
 */
function removeActiveFromLinks() {
  dashboardLink.classList.remove('active');
  productsLink.classList.remove('active');
  ordersLink.classList.remove('active');
  usersLink.classList.remove('active');
  settingsLink.classList.remove('active');
}

/**
 * Load dashboard data from API
 */
function loadDashboardData() {
  // Cargar datos reales de la API
  fetch(`${API_URL}/products`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Contar productos
        const productCount = data.meta?.total || data.data?.length || 0;
        document.getElementById('total-products').textContent = productCount.toString();

        // Calcular ventas totales (simulado)
        let totalSales = 0;
        if (data.data && data.data.length > 0) {
          data.data.forEach(product => {
            totalSales += product.price * (product.stock > 50 ? 10 : 5); // Simular ventas
          });
        }
        document.getElementById('total-sales').textContent = `$${totalSales.toFixed(2)}`;

        // Simular pedidos
        const orderCount = Math.floor(totalSales / 100);
        document.getElementById('total-orders').textContent = orderCount.toString();

        // Simular usuarios
        document.getElementById('total-users').textContent = (orderCount * 2).toString();
      }
    })
    .catch(error => {
      console.error('Error cargando datos del dashboard:', error);
      document.getElementById('total-products').textContent = '0';
      document.getElementById('total-sales').textContent = '$0.00';
      document.getElementById('total-orders').textContent = '0';
      document.getElementById('total-users').textContent = '0';
    });

  // Cargar pedidos recientes
  loadRecentOrders();
}

/**
 * Load recent orders from API
 */
function loadRecentOrders() {
  const recentOrdersTable = document.getElementById('recent-orders-table');

  if (!recentOrdersTable) return;

  recentOrdersTable.innerHTML = '<tr><td colspan="6" class="text-center">Cargando...</td></tr>';

  // Cargar productos reales en lugar de pedidos (ya que los pedidos requieren autenticación)
  fetch(`${API_URL}/products?limit=5`)
    .then(response => response.json())
    .then(data => {
      if (data.success && data.data.length > 0) {
        recentOrdersTable.innerHTML = '';

        // Convertir productos a formato de pedidos para mostrarlos
        data.data.forEach((product, index) => {
          const row = document.createElement('tr');

          // Crear un ID de pedido ficticio basado en el ID del producto
          const orderId = `ORD-${product.id.substring(0, 8)}`;

          // Crear una fecha ficticia
          const orderDate = new Date();
          orderDate.setDate(orderDate.getDate() - index); // Cada pedido es un día anterior
          const formattedDate = orderDate.toLocaleDateString('es-ES');

          // Estado aleatorio
          const statuses = ['pending', 'processing', 'shipped', 'delivered'];
          const status = statuses[Math.floor(Math.random() * statuses.length)];

          // Status badge class
          let statusClass = 'bg-secondary';
          switch(status) {
            case 'pending': statusClass = 'bg-warning'; break;
            case 'processing': statusClass = 'bg-info'; break;
            case 'shipped': statusClass = 'bg-primary'; break;
            case 'delivered': statusClass = 'bg-success'; break;
          }

          // Translate status
          let statusText = status;
          switch(status) {
            case 'pending': statusText = 'Pendiente'; break;
            case 'processing': statusText = 'Procesando'; break;
            case 'shipped': statusText = 'Enviado'; break;
            case 'delivered': statusText = 'Entregado'; break;
          }

          row.innerHTML = `
            <td>${orderId}</td>
            <td>Cliente ${index + 1}</td>
            <td>${formattedDate}</td>
            <td><span class="badge ${statusClass} status-badge">${statusText}</span></td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
              <button class="btn btn-sm btn-primary" onclick="viewOrder('${orderId}')">
                <i class="bi bi-eye"></i>
              </button>
            </td>
          `;

          recentOrdersTable.appendChild(row);
        });
      } else {
        recentOrdersTable.innerHTML = '<tr><td colspan="6" class="text-center">No hay pedidos recientes</td></tr>';
      }
    })
    .catch(error => {
      console.error('Error cargando pedidos recientes:', error);
      recentOrdersTable.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error al cargar pedidos</td></tr>';
    });
}

/**
 * Load orders for the orders section
 */
function loadOrders() {
  const ordersTable = document.getElementById('orders-table');

  if (!ordersTable) return;

  ordersTable.innerHTML = '<tr><td colspan="6" class="text-center">Cargando...</td></tr>';

  // Cargar productos reales en lugar de pedidos (ya que los pedidos requieren autenticación)
  fetch(`${API_URL}/products?limit=10`)
    .then(response => response.json())
    .then(data => {
      if (data.success && data.data.length > 0) {
        ordersTable.innerHTML = '';

        // Convertir productos a formato de pedidos para mostrarlos
        data.data.forEach((product, index) => {
          const row = document.createElement('tr');

          // Crear un ID de pedido ficticio basado en el ID del producto
          const orderId = `ORD-${product.id.substring(0, 8)}`;

          // Crear una fecha ficticia
          const orderDate = new Date();
          orderDate.setDate(orderDate.getDate() - index); // Cada pedido es un día anterior
          const formattedDate = orderDate.toLocaleDateString('es-ES');

          // Estado aleatorio
          const statuses = ['pending', 'processing', 'shipped', 'delivered'];
          const status = statuses[Math.floor(Math.random() * statuses.length)];

          // Status badge class
          let statusClass = 'bg-secondary';
          switch(status) {
            case 'pending': statusClass = 'bg-warning'; break;
            case 'processing': statusClass = 'bg-info'; break;
            case 'shipped': statusClass = 'bg-primary'; break;
            case 'delivered': statusClass = 'bg-success'; break;
          }

          // Translate status
          let statusText = status;
          switch(status) {
            case 'pending': statusText = 'Pendiente'; break;
            case 'processing': statusText = 'Procesando'; break;
            case 'shipped': statusText = 'Enviado'; break;
            case 'delivered': statusText = 'Entregado'; break;
          }

          row.innerHTML = `
            <td>${orderId}</td>
            <td>Cliente ${index + 1}</td>
            <td>${formattedDate}</td>
            <td><span class="badge ${statusClass} status-badge">${statusText}</span></td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
              <button class="btn btn-sm btn-primary me-1" onclick="viewOrder('${orderId}')">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-sm btn-success me-1" onclick="updateOrderStatus('${orderId}')">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </td>
          `;

          ordersTable.appendChild(row);
        });
      } else {
        ordersTable.innerHTML = '<tr><td colspan="6" class="text-center">No hay pedidos disponibles</td></tr>';
      }
    })
    .catch(error => {
      console.error('Error cargando pedidos:', error);
      ordersTable.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error al cargar pedidos</td></tr>';
    });
}

/**
 * Load products from API
 */
function loadProducts() {
  const productsTable = document.getElementById('products-table');

  if (!productsTable) return;

  productsTable.innerHTML = '<tr><td colspan="7" class="text-center">Cargando...</td></tr>';

  fetch(`${API_URL}/products`)
    .then(response => response.json())
    .then(data => {
      if (data.success && data.data.length > 0) {
        productsTable.innerHTML = '';

        data.data.forEach(product => {
          const row = document.createElement('tr');

          row.innerHTML = `
            <td>${product.id.substring(0, 8)}</td>
            <td><img src="/dashboard/img/product-placeholder.png" alt="${product.name}" class="img-thumbnail" width="50" height="50"></td>
            <td>${product.name}</td>
            <td>${product.categories?.name || 'Sin categoría'}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
              <button class="btn btn-sm btn-primary me-1" onclick="editProduct('${product.id}')">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          `;

          productsTable.appendChild(row);
        });
      } else {
        productsTable.innerHTML = '<tr><td colspan="7" class="text-center">No hay productos disponibles</td></tr>';
      }
    })
    .catch(error => {
      console.error('Error cargando productos:', error);
      productsTable.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error al cargar productos</td></tr>';
    });
}

/**
 * Load users from API
 */
function loadUsers() {
  const usersTable = document.getElementById('users-table');

  if (!usersTable) return;

  usersTable.innerHTML = '<tr><td colspan="6" class="text-center">Cargando...</td></tr>';

  // Simular usuarios ya que no tenemos una API de usuarios pública
  const mockUsers = [
    {
      id: 'user1234',
      first_name: 'Admin',
      last_name: 'Principal',
      email: 'admin@example.com',
      role: 'admin',
      created_at: new Date().toISOString()
    },
    {
      id: 'user5678',
      first_name: 'Cliente',
      last_name: 'Ejemplo',
      email: 'cliente@example.com',
      role: 'customer',
      created_at: new Date().toISOString()
    }
  ];

  usersTable.innerHTML = '';

  mockUsers.forEach(user => {
    const row = document.createElement('tr');

    // Format date
    const registerDate = new Date(user.created_at);
    const formattedDate = registerDate.toLocaleDateString('es-ES');

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.first_name} ${user.last_name}</td>
      <td>${user.email}</td>
      <td><span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info'}">${user.role}</span></td>
      <td>${formattedDate}</td>
      <td>
        <button class="btn btn-sm btn-primary me-1" onclick="viewUser('${user.id}')">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-sm btn-warning" onclick="toggleUserRole('${user.id}', '${user.role}')">
          <i class="bi bi-person-gear"></i>
        </button>
      </td>
    `;

    usersTable.appendChild(row);
  });
}

/**
 * Show toast notification
 */
function showToast(title, message) {
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  bsToast.show();
}

/**
 * Show add product modal
 */
function showAddProductModal() {
  // Mostrar un formulario modal para añadir un nuevo producto
  const modalHtml = `
    <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Añadir Nuevo Producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-product-form">
              <div class="mb-3">
                <label for="new-product-name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="new-product-name" required>
              </div>
              <div class="mb-3">
                <label for="new-product-price" class="form-label">Precio</label>
                <input type="number" class="form-control" id="new-product-price" step="0.01" min="0" required>
              </div>
              <div class="mb-3">
                <label for="new-product-stock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="new-product-stock" min="0" required>
              </div>
              <div class="mb-3">
                <label for="new-product-category" class="form-label">Categoría</label>
                <select class="form-select" id="new-product-category">
                  <option value="">Sin categoría</option>
                  <option value="electronics">Electrónica</option>
                  <option value="clothing">Ropa</option>
                  <option value="home">Hogar</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="new-product-description" class="form-label">Descripción</label>
                <textarea class="form-control" id="new-product-description" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label for="new-product-image" class="form-label">Imagen (URL)</label>
                <input type="text" class="form-control" id="new-product-image" placeholder="/dashboard/img/product-placeholder.png">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="addNewProduct()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Añadir el modal al DOM
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
  modal.show();
}

/**
 * Add new product
 */
function addNewProduct() {
  const name = document.getElementById('new-product-name').value;
  const price = document.getElementById('new-product-price').value;
  const stock = document.getElementById('new-product-stock').value;
  const category = document.getElementById('new-product-category').value;
  const description = document.getElementById('new-product-description').value;
  const imageUrl = document.getElementById('new-product-image').value || '/dashboard/img/product-placeholder.png';

  // Validar el formulario
  if (!name || !price || !stock) {
    showToast('Error', 'Por favor completa todos los campos requeridos');
    return;
  }

  // Preparar datos para enviar
  const productData = {
    name: name,
    price: parseFloat(price),
    stock: parseInt(stock),
    category_id: category || null,
    description: description,
    image_url: imageUrl
  };

  // Enviar datos a la API
  fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showToast('Producto añadido', 'El producto ha sido añadido correctamente');

      // Cerrar el modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
      if (modal) {
        modal.hide();
      } else {
        // Si no se puede obtener la instancia, eliminar el modal manualmente
        const modalElement = document.getElementById('addProductModal');
        if (modalElement) {
          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
      }

      // Recargar la lista de productos
      loadProducts();
    } else {
      showToast('Error', data.message || 'Error al añadir el producto');
    }
  })
  .catch(error => {
    console.error('Error al añadir producto:', error);
    showToast('Error', 'Error al añadir el producto');
  });
}

// Funciones para interactuar con la API
function viewOrder(id) {
  // Simular datos del pedido
  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 10));

  const order = {
    id: id,
    customer: 'Cliente Ejemplo',
    date: orderDate.toISOString(),
    status: ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
    total: (Math.random() * 500 + 50).toFixed(2),
    items: [
      {
        product: 'Smartphone XYZ',
        price: 599.99,
        quantity: 1
      },
      {
        product: 'Auriculares Bluetooth',
        price: 89.99,
        quantity: 2
      }
    ],
    shipping_address: {
      street: 'Calle Ejemplo 123',
      city: 'Ciudad Ejemplo',
      state: 'Estado Ejemplo',
      zip: '12345',
      country: 'País Ejemplo'
    },
    payment_method: 'Tarjeta de crédito'
  };

  // Status badge class
  let statusClass = 'bg-secondary';
  switch(order.status) {
    case 'pending': statusClass = 'bg-warning'; break;
    case 'processing': statusClass = 'bg-info'; break;
    case 'shipped': statusClass = 'bg-primary'; break;
    case 'delivered': statusClass = 'bg-success'; break;
    case 'cancelled': statusClass = 'bg-danger'; break;
  }

  // Translate status
  let statusText = order.status;
  switch(order.status) {
    case 'pending': statusText = 'Pendiente'; break;
    case 'processing': statusText = 'Procesando'; break;
    case 'shipped': statusText = 'Enviado'; break;
    case 'delivered': statusText = 'Entregado'; break;
    case 'cancelled': statusText = 'Cancelado'; break;
  }

  // Calcular subtotal
  let subtotal = 0;
  order.items.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  // Mostrar modal con detalles del pedido
  const modalHtml = `
    <div class="modal fade" id="viewOrderModal" tabindex="-1" aria-labelledby="viewOrderModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewOrderModalLabel">Detalles del Pedido</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <h6>Información del Pedido</h6>
                <p><strong>ID:</strong> ${order.id}</p>
                <p><strong>Cliente:</strong> ${order.customer}</p>
                <p><strong>Fecha:</strong> ${new Date(order.date).toLocaleDateString('es-ES')}</p>
                <p><strong>Estado:</strong> <span class="badge ${statusClass}">${statusText}</span></p>
                <p><strong>Total:</strong> $${order.total}</p>
              </div>
              <div class="col-md-6">
                <h6>Dirección de Envío</h6>
                <p>${order.shipping_address.street}</p>
                <p>${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.zip}</p>
                <p>${order.shipping_address.country}</p>
                <p><strong>Método de Pago:</strong> ${order.payment_method}</p>
              </div>
            </div>
            <h6>Productos</h6>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items.map(item => `
                    <tr>
                      <td>${item.product}</td>
                      <td>$${item.price.toFixed(2)}</td>
                      <td>${item.quantity}</td>
                      <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
                    <td>$${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-end"><strong>Envío:</strong></td>
                    <td>$${(order.total - subtotal).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-end"><strong>Total:</strong></td>
                    <td>$${order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" onclick="updateOrderStatus('${order.id}')">Actualizar Estado</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Añadir el modal al DOM
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('viewOrderModal'));
  modal.show();
}

function editProduct(id) {
  showToast('Editar producto', `Formulario para editar el producto ${id}`);

  // Mostrar un formulario modal para editar el producto
  const modalHtml = `
    <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductModalLabel">Editar Producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-product-form">
              <div class="mb-3">
                <label for="product-name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="product-name" required>
              </div>
              <div class="mb-3">
                <label for="product-price" class="form-label">Precio</label>
                <input type="number" class="form-control" id="product-price" step="0.01" min="0" required>
              </div>
              <div class="mb-3">
                <label for="product-stock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="product-stock" min="0" required>
              </div>
              <div class="mb-3">
                <label for="product-category" class="form-label">Categoría</label>
                <select class="form-select" id="product-category">
                  <option value="">Sin categoría</option>
                  <option value="electronics">Electrónica</option>
                  <option value="clothing">Ropa</option>
                  <option value="home">Hogar</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="product-description" class="form-label">Descripción</label>
                <textarea class="form-control" id="product-description" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="saveProduct('${id}')">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Añadir el modal al DOM
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
  modal.show();

  // Cargar los datos del producto
  fetch(`${API_URL}/products/${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const product = data.data;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-category').value = product.category || '';
        document.getElementById('product-description').value = product.description || '';
      }
    })
    .catch(error => {
      console.error('Error cargando detalles del producto:', error);
      showToast('Error', 'No se pudieron cargar los detalles del producto');
    });
}

function saveProduct(id) {
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const stock = document.getElementById('product-stock').value;
  const category = document.getElementById('product-category').value;
  const description = document.getElementById('product-description').value;

  // Validar el formulario
  if (!name || !price || !stock) {
    showToast('Error', 'Por favor completa todos los campos requeridos');
    return;
  }

  // Preparar datos para enviar
  const productData = {
    name: name,
    price: parseFloat(price),
    stock: parseInt(stock),
    category_id: category || null,
    description: description
  };

  // Enviar datos a la API
  fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showToast('Producto actualizado', 'El producto ha sido actualizado correctamente');

      // Cerrar el modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
      if (modal) {
        modal.hide();
      } else {
        // Si no se puede obtener la instancia, eliminar el modal manualmente
        const modalElement = document.getElementById('editProductModal');
        if (modalElement) {
          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
      }

      // Recargar la lista de productos
      loadProducts();
    } else {
      showToast('Error', data.message || 'Error al actualizar el producto');
    }
  })
  .catch(error => {
    console.error('Error al actualizar producto:', error);
    showToast('Error', 'Error al actualizar el producto');
  });
}

function deleteProduct(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast('Producto eliminado', 'El producto ha sido eliminado correctamente');
          loadProducts(); // Recargar la lista de productos
        } else {
          showToast('Error', data.message || 'Error al eliminar el producto');
        }
      })
      .catch(error => {
        console.error('Error al eliminar producto:', error);
        showToast('Error', 'Error al eliminar el producto');
      });
  }
}

function updateOrderStatus(id) {
  // Mostrar modal para seleccionar estado
  const modalHtml = `
    <div class="modal fade" id="updateStatusModal" tabindex="-1" aria-labelledby="updateStatusModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateStatusModalLabel">Actualizar Estado del Pedido</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="update-status-form">
              <div class="mb-3">
                <label for="order-status" class="form-label">Estado</label>
                <select class="form-select" id="order-status">
                  <option value="pending">Pendiente</option>
                  <option value="processing">Procesando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="saveOrderStatus('${id}')">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Añadir el modal al DOM
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
  modal.show();
}

function saveOrderStatus(id) {
  const status = document.getElementById('order-status').value;

  // En un entorno real, aquí se enviaría el estado a la API
  // Por ahora, simulamos la actualización

  showToast('Estado actualizado', 'El estado del pedido ha sido actualizado correctamente');

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('updateStatusModal'));
  if (modal) {
    modal.hide();
  } else {
    // Si no se puede obtener la instancia, eliminar el modal manualmente
    const modalElement = document.getElementById('updateStatusModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }
  }

  // Recargar la lista de pedidos
  loadOrders();
}

function viewUser(id) {
  // Buscar el usuario en la lista de usuarios simulados
  const users = [
    {
      id: 'user1234',
      first_name: 'Admin',
      last_name: 'Principal',
      email: 'admin@example.com',
      role: 'admin',
      created_at: new Date().toISOString()
    },
    {
      id: 'user5678',
      first_name: 'Cliente',
      last_name: 'Ejemplo',
      email: 'cliente@example.com',
      role: 'customer',
      created_at: new Date().toISOString()
    }
  ];

  const user = users.find(u => u.id === id) || {
    id: id,
    first_name: 'Usuario',
    last_name: 'Desconocido',
    email: 'usuario@example.com',
    role: 'customer',
    created_at: new Date().toISOString()
  };

  // Mostrar modal con detalles del usuario
  const modalHtml = `
    <div class="modal fade" id="viewUserModal" tabindex="-1" aria-labelledby="viewUserModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewUserModalLabel">Detalles del Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-4 fw-bold">ID:</div>
              <div class="col-8">${user.id}</div>
            </div>
            <div class="row mb-3">
              <div class="col-4 fw-bold">Nombre:</div>
              <div class="col-8">${user.first_name} ${user.last_name}</div>
            </div>
            <div class="row mb-3">
              <div class="col-4 fw-bold">Email:</div>
              <div class="col-8">${user.email}</div>
            </div>
            <div class="row mb-3">
              <div class="col-4 fw-bold">Rol:</div>
              <div class="col-8"><span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info'}">${user.role}</span></div>
            </div>
            <div class="row mb-3">
              <div class="col-4 fw-bold">Fecha de registro:</div>
              <div class="col-8">${new Date(user.created_at).toLocaleDateString('es-ES')}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Añadir el modal al DOM
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('viewUserModal'));
  modal.show();
}

function toggleUserRole(id, currentRole) {
  const newRole = currentRole === 'admin' ? 'customer' : 'admin';

  // Mostrar modal de confirmación
  const modalHtml = `
    <div class="modal fade" id="confirmRoleModal" tabindex="-1" aria-labelledby="confirmRoleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmRoleModalLabel">Confirmar Cambio de Rol</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas cambiar el rol del usuario de <strong>${currentRole}</strong> a <strong>${newRole}</strong>?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="confirmRoleChange('${id}', '${newRole}')">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Añadir el modal al DOM
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('confirmRoleModal'));
  modal.show();
}

function confirmRoleChange(id, newRole) {
  // En un entorno real, aquí se enviaría el cambio de rol a la API
  // Por ahora, simulamos la actualización

  showToast('Rol actualizado', `El rol del usuario ha sido cambiado a ${newRole}`);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('confirmRoleModal'));
  if (modal) {
    modal.hide();
  } else {
    // Si no se puede obtener la instancia, eliminar el modal manualmente
    const modalElement = document.getElementById('confirmRoleModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }
  }

  // Recargar la lista de usuarios
  loadUsers();
