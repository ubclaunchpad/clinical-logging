import "./CLButtons.css"

const DEFAULT_HEIGHT = "54px"
const DEFAULT_WIDTH = "fit-content"
const DEFAULT_ON_CLICK = () => {}

/**
 * PRIMARY variant of the clinical logging button.
 * Should work out of the box for most use cases (with the exception of onClick which does nothing by default).
 * The height and width are customizable if necessary.
 */
export const CLButtonPrimary = ({
  children,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  onClick = DEFAULT_ON_CLICK
}) => {

  return (
    <button 
      className="primary-variant-button"
      onClick={onClick}
      style={{
        height: height,
        width: width
      }}
    >
      {children}
    </button>
  )
}

/**
 * SECONDARY variant of the clinical logging button.
 * Should work out of the box for most use cases (with the exception of onClick which does nothing by default).
 * The height and width are customizable if necessary.
 */
export const CLButtonSecondary = ({
  children,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  onClick = DEFAULT_ON_CLICK
}) => {
  
  return (
    <button 
      className="secondary-variant-button"
      onClick={onClick}
      style={{
        height: height,
        width: width
      }}
    >
      {children}
    </button>
  )
}