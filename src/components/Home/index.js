import './index.css'
import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import MenuList from '../MenuList/index'
import Dishes from '../Dishes/index'

class Home extends Component {
  state = {
    headDetails: {},
    categoryDishes: [],
    menuList: [],
    categoryList: [],
    activetabid: '',
    countOfCart: 0,
  }

  componentDidMount() {
    this.getrestorentDetails()
  }

  getrestorentDetails = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()

    const jsonData = data[0].table_menu_list.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
      categoryDishes: each.category_dishes.map(dishes => ({
        addonCat: dishes.addonCat.map(addoncat => ({
          addonCategory: addoncat.addon_category,
          addonCategoryId: addoncat.addon_category_id,
          addonSelection: addoncat.addon_selection,
          nexturl: addoncat.nexturl,
          addons: addoncat.addons.map(add => ({
            dishAvailability: add.dish_Availability,
            dishType: add.dish_Type,
            dishCalories: add.dish_calories,
            dishCurrency: add.dish_currency,
            dishDescription: add.dish_description,
            dishId: add.dish_id,
            dishImage: add.dish_image,
            dishName: add.dish_name,
            dishPrice: add.dish_price,
          })),
        })),
        dishAvailability: dishes.dish_Availability,
        dishType: dishes.dish_Type,
        dishCalories: dishes.dish_calories,
        dishCurrency: dishes.dish_currency,
        dishDescription: dishes.dish_description,
        dishId: dishes.dish_id,
        dishImage: dishes.dish_image,
        dishName: dishes.dish_name,
        dishPrice: dishes.dish_price,
        nexturl: dishes.nexturl,
      })),
    }))
    console.log(jsonData)

    const tabsList = jsonData.map(each => ({
      menuCategoryId: each.menuCategoryId,
      menuCategory: each.menuCategory,
    }))
    const head = {
      branchName: data[0].branch_name,
      nexturl: data[0].nexturl,
      restaurantId: data[0].restaurant_id,
      restaurantImage: data[0].restaurant_image,
      restaurantName: data[0].restaurant_name,
      tableId: data[0].table_id,
      tableName: data[0].table_name,
    }
    this.setState({
      headDetails: head,
      menuList: jsonData,
      categoryList: tabsList,
      activetabid: tabsList[0].menuCategoryId,
      categoryDishes: jsonData[0].categoryDishes,
    })
  }

  countingCartMinus = () => {
    this.setState(prevState => ({countOfCart: prevState.countOfCart - 1}))
  }

  countingCartPlus = () => {
    this.setState(prevState => ({countOfCart: prevState.countOfCart + 1}))
  }

  clickTabId = tabId => {
    const {menuList} = this.state
    const filterMenuList = menuList.filter(
      each => each.menuCategoryId === tabId,
    )
    console.log(filterMenuList[0].categoryDishes)
    this.setState({
      activetabid: tabId,
      categoryDishes: filterMenuList[0].categoryDishes,
    })
  }

  render() {
    const {
      headDetails,
      countOfCart,
      activetabid,
      categoryDishes,
      categoryList,
    } = this.state
    return (
      <div className="bg-Conatiner">
        <div className="headMaincontainer">
          <div className="headContainer">
            <div className="head">
              <h1 className="heading">{headDetails.restaurantName}</h1>
              <div className="head2">
                <p className="myOrder">My Orders</p>
                <AiOutlineShoppingCart color="#474747" size="25" />
                <div className="countConntainer">
                  <p className="cartcount">{countOfCart}</p>
                </div>
              </div>
            </div>
            <ul className="head3">
              {categoryList.map(each => (
                <MenuList
                  key={each.menuCategoryId}
                  clickTabId={this.clickTabId}
                  each={each}
                  isActive={activetabid === each.menuCategoryId}
                />
              ))}
            </ul>
          </div>
        </div>
        <ul className="dishesCategory">
          {categoryDishes.map(each => (
            <Dishes
              key={each.dishId}
              countingCartMinus={this.countingCartMinus}
              each={each}
              countOfCart={countOfCart}
              countingCartPlus={this.countingCartPlus}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
