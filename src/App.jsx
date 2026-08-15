import { useState, useEffect } from "react";
import useAdminStore from "./store/adminStore";

function App() {

  const [activePage, setActivePage] = useState("dashboard");

  // ==========Settings===============

  const [settingsName, setSettingsName] = useState("");
  const [settingsEmail, setSettingsEmail] = useState("");

  const adminName = useAdminStore((state) => state.adminName);
  const adminEmail = useAdminStore((state) => state.adminEmail);
  const updateSettings = useAdminStore(
    (state) => state.updateSettings
  );

  // =========================
  // Users Store
  // =========================

  const users = useAdminStore((state) => state.users);
  const addUser = useAdminStore((state) => state.addUser);
  const deleteUser = useAdminStore((state) => state.deleteUser);
  const toggleUserStatus = useAdminStore(
    (state) => state.toggleUserStatus
  );
  const updateUser = useAdminStore((state) => state.updateUser);

  // =========================
  // Products Store
  // =========================

  const products = useAdminStore((state) => state.products);
  const addProduct = useAdminStore((state) => state.addProduct);
  const deleteProduct = useAdminStore((state) => state.deleteProduct);
  const updateProduct = useAdminStore(
    (state) => state.updateProduct
  );

  // =========================
  // User State
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [change, setChange] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  // =========================
  // Product State
  // =========================

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  // =========================
  // User Functions
  // =========================

function handleSaveUser() {

  if (name.trim() === "") {
    alert("Please enter user name");
    return;
  }

  if (email.trim() === "") {
    alert("Please enter user email");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  if (editingUserId === null) {
    addUser(name, email);
  } else {
    updateUser(editingUserId, name, email);
  }

  setName("");
  setEmail("");
  setEditingUserId(null);
}

  function SearchChange(e) {
    setChange(e.target.value);
  }

  function handleEdit(user) {
    setName(user.name);
    setEmail(user.email);
    setEditingUserId(user.id);
  }

  // =========================
  // Product Functions
  // =========================

  function handleSaveProduct() {

  if (productName.trim() === "") {
    alert("Please enter product name");
    return;
  }

  if (productPrice === "") {
    alert("Please enter product price");
    return;
  }

  if (Number(productPrice) <= 0) {
    alert("Product price must be greater than 0");
    return;
  }

  if (editingProductId === null) {
    addProduct(productName, productPrice);
  } else {
    updateProduct(
      editingProductId,
      productName,
      productPrice
    );
  }

  setProductName("");
  setProductPrice("");
  setEditingProductId(null);
}

function handleSaveSettings() {
  updateSettings(settingsName, settingsEmail);

  alert("Settings saved!");
}

  function handleEditProduct(product) {
    setProductName(product.name);
    setProductPrice(product.price);
    setEditingProductId(product.id);
  }

  // =========================
  // User Search
  // =========================

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(change.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(change.toLowerCase())
  );

  // =========================
  // Product Search
  // =========================

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(productSearch.toLowerCase())
  );

  const activeUsers = users.filter(
  (user) => user.status === "Active"
  ).length;

  const blockedUsers = users.filter(
    (user) => user.status !== "Active"
  ).length;


  useEffect(() => {
  setSettingsName(adminName);
  setSettingsEmail(adminEmail);
}, [adminName, adminEmail]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">

      {/* ================= Sidebar ================= */}

      <aside className="w-full bg-gray-900 p-6 text-white md:w-64">

          <h1 className="mb-8 text-2xl font-bold">
            Admin Panel
          </h1>

          <nav className="grid grid-cols-2 gap-3 md:block md:space-y-3">

            <button
              onClick={() => setActivePage("dashboard")}
              className={`block w-full rounded-lg px-4 py-3 text-left ${
                activePage === "dashboard"
                  ? "bg-gray-800"
                  : "hover:bg-gray-800"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActivePage("users")}
              className={`block w-full rounded-lg px-4 py-3 text-left ${
                activePage === "users"
                  ? "bg-gray-800"
                  : "hover:bg-gray-800"
              }`}
            >
              Users
            </button>

            <button
              onClick={() => setActivePage("products")}
              className={`block w-full rounded-lg px-4 py-3 text-left ${
                activePage === "products"
                  ? "bg-gray-800"
                  : "hover:bg-gray-800"
              }`}
            >
              Products
            </button>

            <button
              onClick={() => setActivePage("settings")}
              className={`block w-full rounded-lg px-4 py-3 text-left ${
                activePage === "settings"
                  ? "bg-gray-800"
                  : "hover:bg-gray-800"
              }`}
            >
              Settings
            </button>
    </nav>
</aside>


      {/* ================= Main Content ================= */}

      <main className="min-w-0 flex-1 p-4 md:p-8">

        {/* ================= Header ================= */}

        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {activePage === "dashboard" && "Dashboard"}
            {activePage === "users" && "Users"}
            {activePage === "products" && "Products"}
            {activePage === "settings" && "Settings"}
          </h2>

          <p className="mt-2 text-gray-500">
            Welcome back, {adminName}!
          </p>
        </header>


        {/* ================= Statistics ================= */}

      {activePage === "dashboard" && (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Total Users */}

          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-sm font-medium text-gray-500">
              Total Users
            </p>

            <h3 className="mt-2 text-3xl font-bold text-gray-900">
              {users.length}
            </h3>

          </div>


          {/* Total Products */}

          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-sm font-medium text-gray-500">
              Total Products
            </p>

            <h3 className="mt-2 text-3xl font-bold text-gray-900">
              {products.length}
            </h3>

          </div>


          {/* Active Users */}

          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-sm font-medium text-gray-500">
              Active Users
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {activeUsers}
            </h3>

          </div>


          {/* Blocked Users */}

          <div className="rounded-xl bg-white p-6 shadow">

            <p className="text-sm font-medium text-gray-500">
              Blocked Users
            </p>

            <h3 className="mt-2 text-3xl font-bold text-red-600">
              {blockedUsers}
            </h3>

          </div>

          

        </section>
      )}


        {/* ================= Add / Edit User ================= */}

      {activePage === "users" && (

        <section className="mt-8 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-6 text-xl font-bold text-gray-900">
            {editingUserId === null
              ? "Add New User"
              : "Edit User"}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Name */}

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Save User */}

            <button
              type="button"
              onClick={handleSaveUser}
              className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
            >
              {editingUserId === null
                ? "Add User"
                : "Save User"}
            </button>

          </div>

        </section>

      )}

        {/* ================= Users Table ================= */}

      {activePage === "users" && (

        <section className="mt-8 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Recent Users
          </h3>

          {/* User Search */}

          <input
            type="text"
            placeholder="Search users..."
            value={change}
            onChange={SearchChange}
            className="mb-6 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 md:w-96"
          />

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b">

                  <th className="px-4 py-3">
                    Name
                  </th>

                  <th className="px-4 py-3">
                    Email
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                  <th className="px-4 py-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b"
                  >

                    <td className="px-4 py-3 font-medium">
                      {user.name}
                    </td>

                    <td className="px-4 py-3 text-gray-500">
                      {user.email}
                    </td>

                    <td className="px-4 py-3">
                      {user.status}
                    </td>

                    <td className="px-4 py-3">

                      {/* Edit */}

                      <button
                        onClick={() => handleEdit(user)}
                        className="mr-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      {/* Delete */}

                        <button
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Are you sure you want to delete ${user.name}?`
                            );

                            if (confirmed) {
                              deleteUser(user.id);
                            }
                          }}
                          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>

                      {/* Block / Unblock */}

                      <button
                        onClick={() =>
                          toggleUserStatus(user.id)
                        }
                        className="ml-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                      >
                        {user.status === "Active"
                          ? "Block"
                          : "Unblock"}
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>
      )}

        {/* ================= Add / Edit Product ================= */}

      {activePage === "products" && (

        <section className="mt-8 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-6 text-xl font-bold text-gray-900">
            {editingProductId === null
              ? "Add New Product"
              : "Edit Product"}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Product Name */}

            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) =>
                setProductName(e.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Product Price */}

            <input
              type="number"
              placeholder="Enter price"
              value={productPrice}
              onChange={(e) =>
                setProductPrice(e.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Save Product */}

            <button
              type="button"
              onClick={handleSaveProduct}
              className="rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700"
            >
              {editingProductId === null
                ? "Add Product"
                : "Save Product"}
            </button>

          </div>

        </section>

      )}

        {/* ================= Products Table ================= */}

      {activePage === "products" && (

        <section className="mt-8 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Products
          </h3>

          {/* Product Search */}

          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) =>
              setProductSearch(e.target.value)
            }
            className="mb-6 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 md:w-96"
          />

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b">

                  <th className="px-4 py-3">
                    Product
                  </th>

                  <th className="px-4 py-3">
                    Price
                  </th>

                  <th className="px-4 py-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b"
                  >

                    <td className="px-4 py-3 font-medium">
                      {product.name}
                    </td>

                    <td className="px-4 py-3 text-gray-500">
                      ₹{product.price}
                    </td>

                    <td className="px-4 py-3">

                      {/* Edit Product */}

                      <button
                        onClick={() =>
                          handleEditProduct(product)
                        }
                        className="mr-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      {/* Delete Product */}

                      <button
                        onClick={() => {
                          const confirmed = window.confirm(
                            `Are you sure you want to delete ${product.name}?`
                          );

                          if (confirmed) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>
      )}

      {/* ================= Settings ================= */}

      {activePage === "settings" && (
  <section className="mt-8 rounded-xl bg-white p-6 shadow">

    <h3 className="mb-6 text-xl font-bold text-gray-900">
      Admin Settings
    </h3>

    <div className="space-y-4">

      <input
        type="text"
        placeholder="Enter admin name"
        value={settingsName}
        onChange={(e) => setSettingsName(e.target.value)}
        className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        placeholder="Enter admin email"
        value={settingsEmail}
        onChange={(e) => setSettingsEmail(e.target.value)}
        className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={handleSaveSettings}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Save Settings
      </button>

    </div>

  </section>
)}

      </main>

    </div>
  );
}

export default App;