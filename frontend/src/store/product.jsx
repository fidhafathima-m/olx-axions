import axios from "axios";
import { create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    shouldRefresh: false,
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.category) {
            return { success: false, message: "please fill in all fields" }
        }
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`,
            newProduct, {
            headers: {
                "Content-Type": "application/json"
            },
        })
        set((state) => ({ products: [...state.products, res.data.data] }))
        set({ shouldRefresh: true });
        return { success: true, message: "prodcut created successfully" }
    },
    fetchProducts: async () => {
        const respnse = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        set({ products: respnse.data.data, })
    }
}))