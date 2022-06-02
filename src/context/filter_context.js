import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',//this default value needs to match with one of the value we have in the select options
  filters: {
    text: '',
    company: 'all', 
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
    
  }
}
//create filter context
const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  
  const { products } = useProductsContext();//this code right here is to extract the products from our products context as we are gonna need it in the filter context also
  const [state, dispatch] = useReducer(reducer, initialState);

  //we can not pass the products from our products context rigth away into the initial state, that's why we make use of a useEffect
  useEffect(() => {
    dispatch({type:LOAD_PRODUCTS,payload:products})
  }, [products])

  //
  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type:SORT_PRODUCTS})
  },[products, state.sort, state.filters])

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW})
  }

  const updateSort = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch({type: UPDATE_SORT, payload:value})
  }

  //function to be call every time we want change something in the filters
  const updateFilters=(e) => {
    let name = e.target.name
    let value = e.target.value
    //the code below is a second option to set the value to the text content of each button
    // if (name === 'category') {//if we are clicking on a category, is to say a button, then...
    //   value = e.target.textContent
    // }
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({type: UPDATE_FILTERS, payload:{name, value}})
  }

  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
  }

  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters

    }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
