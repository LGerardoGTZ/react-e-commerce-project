import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price)
    maxPrice = Math.max(...maxPrice)

    return {
      ...state,
      all_products: [...action.payload],//we make use of spread operator to make a copy of the products array and avoid referencing to the same data location memory space
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice
      }//first, make sure to copy the previous filters values within our state to prevent overwriting
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    /* the long way to compare */
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {//a represents current item and b is the next item, the one that you are going to compare with
        //this is the long way to do it 
        if (a.price < b.price) {
          return -1
        }
        if (a.price > b.price) {
          return 1
        }
        return 0
      })
    }
    /* the short way to compare */
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters

    let tempProducts = [...all_products]

    //filtering (a bunch of if statements)
    //text filter search
    if (text) {//when I clear the search input this condition is not met, thats why...
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    //category search
    if(category !== 'all'){
      tempProducts = tempProducts.filter((product)=> product.category === category);
    }
   
    //company search
    if(company !== 'all'){
      tempProducts = tempProducts.filter((product)=> product.company === company);
    }

    //colors
    if(color !== 'all'){
      tempProducts = tempProducts.filter((product)=>{
        return product.colors.find((c) => c === color);//as color is an array that's why I need to use find method
      })
    }
  
    //price
    tempProducts = tempProducts.filter((product)=> product.price <= price)
    

    //shipping
    if(shipping){
      tempProducts = tempProducts.filter((product)=> product.shipping === true);
    }

    return { ...state, filtered_products: tempProducts }//... this return will clear the filters if any of the previous conditions are met
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
