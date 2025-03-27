import { AppBar } from "../AppBar/AppBar"
import { Navbar } from "../Navbar/Navbar"
import "./NavContentWrapper.css"

/**
 * Wraps the child component in the side navigation bar and the top application bar.
 * Formats the layout so that only the inner child component is scrollable.
 */
export const NavContentWrapper = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className="child-container">
        <AppBar />
        {children}
      </div>
    </div>
  )
}