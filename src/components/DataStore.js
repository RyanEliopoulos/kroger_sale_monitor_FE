import create from 'zustand'

const DataStore = (set) => ({
  email: '',
  chain: '',
  address1: '',
  city: '',
  state: '',
  zipcode: '',
  products: [],

  initialIngest: (data) => {
    set((state) => ({
      email: data.email,
      chain: data.chain,
      address1: data.address1,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      products: data.products
    }))
  },

  updateSelectedStore: (storeObject) => {
    set((state) => ({
      chain: storeObject.chain,
      address1: storeObject.address.addressLine1,
      city: storeObject.address.city,
      state: storeObject.address.state,
      zipcode: storeObject.address.zipCode
    }))
  },

  updateEmailLocal: (updatedEmail) => {
    set((state) => ({
      email: updatedEmail
    }))
  },

  addProduct: (newProduct) => {
    set((state) => ({
      products: [...state.products, newProduct]
    }))
  },

  updateTargetPrice: (productUPC, newTargetPrice) => {
    set((state) => ({
      products: state.products.map(product => {
        if(product.product_upc === productUPC) {
          product.target_price = newTargetPrice
        }
        return product
      })
    }))
  },

  removeProduct: (watchedProductID) => {
    set((state) => ({
      products: state.products.filter(product => (
        product.watched_product_id !== watchedProductID
      ))
    }))
  }
});

const useDataStore = create(DataStore)
export default useDataStore;
