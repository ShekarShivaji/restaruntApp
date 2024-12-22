import './index.css'
import {useState} from 'react'

const Dishes = props => {
  const {each, countingCartPlus, countingCartMinus} = props
  const [score, setScore] = useState(0)
  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    addonCat,
  } = each
  const addonCatLen = addonCat.length > 1 ? 'Customizations available' : ''
  const onclickDishMinusButton = () => {
    setScore(prevState => prevState - 1)
    countingCartMinus(dishId)
  }
  const onclickDishPlusButton = () => {
    setScore(prevState => prevState + 1)
    countingCartPlus(dishId)
  }
  const disable = score === 0
  const isdishAvailable = dishAvailability === true ? '' : 'ifdishNotAvailabel'
  const ifdishNotAvailable = dishAvailability === false ? 'Not available' : ''
  const dishtypeBorder = dishType === 1 ? 'dishtype1' : 'dishtype2'
  const dishtype = dishType === 1 ? 'type1' : 'type2'
  return (
    <li className="dishes">
      <div className="dishesDetailsContainer">
        <div className={`dishTypeContainer ${dishtypeBorder}`}>
          <div className={`type ${dishtype}`} />
        </div>
        <div className="dishSpesification">
          <h1 className="dishname">{dishName}</h1>
          <p className="currency">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dishDescription">{dishDescription}</p>
          <div className={`countContainer ${isdishAvailable}`}>
            <button
              onClick={onclickDishMinusButton}
              disabled={disable}
              className="minusButton"
              type="button"
            >
              -
            </button>
            <p className="count">{score}</p>

            <button
              type="button"
              onClick={onclickDishPlusButton}
              className="plusButton"
            >
              +
            </button>
          </div>
          <p className="notAvailable">{ifdishNotAvailable}</p>
          <p className="custom">{addonCatLen}</p>
        </div>
        <div className="caloriesContainer">
          <p className="calories">{dishCalories} calories</p>
        </div>
        <div className="dishImgCategory" />
        <img src={dishImage} alt={dishName} className="dishImg" />
      </div>
    </li>
  )
}

export default Dishes
