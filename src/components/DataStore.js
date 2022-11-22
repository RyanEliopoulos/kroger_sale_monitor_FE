import create from 'zustand'

const DataStore = (set) => ({
  // Account state.
  email: '',
  chain: '',
  address1: '',
  city: '',
  state: '',
  zipcode: '',
  locationID: '',
  receiveAlerts: null,
  products: [],
  // Product search state.
  totalPages: 0,
  searchResults: [],
  searchTerm: '',
  // Store search
  storeSearchZipcode: '',
  storeSearchResults: [],

  initialIngest: (data) => {
    set((state) => ({
      email: data.email,
      locationID: data.location_id,
      chain: data.chain,
      address1: data.address1,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      products: data.products,
      receiveAlerts: data.receive_alerts === 1
    }))
  },

  updateSelectedStore: (storeObject) => {
    set((state) => ({
      locationID: storeObject.locationId,
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
  },

  toggleAlertStatus: () => {
    set((state) => ({
      receiveAlerts: !state.receiveAlerts
    }))
  },

  // Search state functions
  setTotalPages: (pages) => {
    set((state) => ({
      totalPages: pages
    }))
  },
  setSearchResults: (results) => {
    set((state) => ({
      searchResults: results
    }))
  },
  setSearchTerm: (searchTerm) => {
    set((state) => ({
      searchTerm: searchTerm
    }))
  },

  // Store search functions
  setStoreSearchZipcode: (storeSearchZipcode) => {
    set((state) => ({
      storeSearchZipcode: storeSearchZipcode
    }))
  },

  setStoreSearchResults: (storeResults) => {
      set((state) => ({
        storeSearchResults: storeResults
      }))
  }

});

const useDataStore = create(DataStore)
export default useDataStore;
