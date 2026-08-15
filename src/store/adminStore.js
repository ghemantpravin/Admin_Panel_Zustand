import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAdminStore = create(
    persist(
    (set) => ({
  // =========================
  // State
  // =========================

  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      status: "Blocked",
    },
  ],

  products: [
    {
      id: 1,
      name: "Tie",
      price: 100,
    },
    {
      id: 2,
      name: "Socks",
      price: 50,
    },
    {
      id: 3,
      name: "Jeans",
      price: 200,
    },
  ],

  // =========================
  // Actions
  // =========================

  // Add User
  addUser: (name, email) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          id: Date.now(),
          name: name,
          email: email,
          status: "Active",
        },
      ],
    })),

  // Delete User
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

  // toggleUserStatus
  toggleUserStatus:(id)=>
        set((state)=>({
        users: state.users.map((user)=>
            user.id === id
            ? {
                ...user, 
                status: 
                user.status === "Active" ? 
                "Blocked" : 
                "Active",
            }
            : user
        )    
    })),

    //updateUser
    updateUser: (id, name, email) =>
        set((state)=>({
            users: state.users.map((user)=>
                user.id === id
                ? {     
                    ...user,
                    name: name,
                    email: email,   
                }
                : user
            )
        })),

    // addproduct
    addProduct: (name, price) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          id: Date.now(),
          name: name,
          price: price,
        },
      ],
    })),

    // Delete Product
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),

    //updateUser
    updateProduct: (id, name, price) =>
        set((state)=>({
            products: state.products.map((product)=>
                product.id === id
                ? {     
                    ...product,
                    name: name,
                    price: price,   
                }
                : product
            )
        })),

  // =========================
  // Settings
  // =========================

  adminName: "Admin",
  adminEmail: "admin@example.com",

  updateSettings: (name, email) =>
    set({
      adminName: name,
      adminEmail: email,
    }),
})));

export default useAdminStore;