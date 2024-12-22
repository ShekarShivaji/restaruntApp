import './index.css'

const MenuList = props => {
  const {each, isActive, clickTabId} = props
  const {menuCategory, menuCategoryId} = each
  const gettabId = () => {
    clickTabId(menuCategoryId)
  }
  const activeButton = isActive ? 'isActiveButton' : ''
  return (
    <>
      <li>
        <button
          type="button"
          className={`button ${activeButton}`}
          onClick={gettabId}
        >
          {menuCategory}
        </button>
      </li>
    </>
  )
}

export default MenuList
