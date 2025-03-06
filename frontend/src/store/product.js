import {create} from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message:"please fill in all the fields"}
        };
        const res = await fetch("/products",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set((state) => ({products: [...state.products , data.data]}));
        return {success: true, message: "product created successfully"};
    },
    fetchProducts: async () => {
        const res = await fetch("/products");
        const product = await res.json();
        set({products: product});
    },
    deleteProduct: async (pid) => {
        const data = await fetch(`/products/${pid}`,{
            method: "DELETE",
        })
        const res = await data.json();
        
        if(!res.success) return {success: false, message: res.message};

        set((state) => ({products: state.products.filter((product) => product._id !== pid)}));
        return {success: true, message: "product deleted Successfully"};
    },
    updateProduct: async (pid, product) => {
        if (!product.name || !product.image || !product.price) {
            return { success: false, message: "please fill in all the fields" }
        };
        const res = await fetch(`/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
        const data = await res.json();
        if(!data.success) return {success:false , message: data.message};
        set((state) => ({
            products: state.products.map((product) => (product._id===pid? data.data: product))
        }));
        return { success: true, message: "product updeted Successfully" };

    }
}))