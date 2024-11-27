import { AppBar } from "../AppBar/AppBar"
import { Navbar } from "../Navbar/Navbar"

/**
 * Wraps the child component in the side navigation bar and the top application bar.
 * Formats the layout so that only the inner child component is scrollable.
 */
export const NavContentWrapper = ({children}) => {
  return (
    <div>
      <AppBar />
      <Navbar />
      <div className="child-container">
        {children}
      </div>
    </div>
  )
}