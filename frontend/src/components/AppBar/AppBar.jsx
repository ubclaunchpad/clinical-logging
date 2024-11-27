import Logo from "../../assets/flow-leaflets-logo.svg";
import {
  AdjustmentsHorizontalIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import "./AppBar.css"

export const AppBar = () => {
  return (
    <div className="app-bar">
      <div className="icon-search-filter-container">
        <img src={Logo} className="logo" />
        <div className="search-filter-container">
          <input type="text" className="search-input" name="search" placeholder="Search..." />
          <button className="filter-button">
            <AdjustmentsHorizontalIcon className="app-bar-icon" />
            <p>Filter</p>
          </button>
        </div>
      </div>
      <div>
      <div className="small-icon-buttons-container">
        <button className="small-icon-button">
          <BellIcon className="app-bar-icon" />
        </button>
        <button className="small-icon-button">
          <UserCircleIcon className="app-bar-icon" />
        </button>
      </div>
      </div>
    </div>
  )
}