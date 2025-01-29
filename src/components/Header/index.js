import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Cookies} from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartIcon = () => (
    <div className="cart-icon-link">
      <Link to="/cart">
        <button type="button" className="cart-icon-button" data-testid="cart">
          <AiOutlineShoppingCart className="cart-icon" />
        </button>
      </Link>
      <div className="cart-count-badge ">
        <p className="cart-count">{cartList.length}</p>
      </div>
    </div>
  )

  return (
    <header className="nav-header">
      <Link to="/">
        <h1 className="logo-heading">{restaurantName}</h1>
      </Link>
      <div className="my-order-text-container">
        <p className="my-orders-text">My Orders</p>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
        {renderCartIcon()}
      </div>
    </header>
  )
}

export default withRouter(Header)
