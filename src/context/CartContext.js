import {createContext} from 'react'

const CartContext = createContext({
  restaurantName: '',
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
