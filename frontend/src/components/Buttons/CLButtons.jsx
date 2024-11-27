const DEFAULT_HEIGHT = "54px"
const DEFAULT_WIDTH = "fit-content"
const DEFAULT_BORDER_RADIUS = "20px"
const DEFAULT_ON_CLICK = () => {}

// PRIMARY specific styles
const PRIMARY_COLOR = "#F7FAFF"
const PRIMARY_BACKGROUND_COLOR = "#244B94"

// SECONDARY specific styles
const SECONDARY_COLOR = "#4F607E"
const SECONDARY_BACKGROUND_COLOR = "#F7FAFF"
const SECONDARY_BORDER = "1px solid #9AB0E1"

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
      onClick={onClick}
      style={{
        height: height,
        width: width,
        color: PRIMARY_COLOR,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        borderRadius: DEFAULT_BORDER_RADIUS
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
      onClick={onClick}
      style={{
        height: height,
        width: width,
        color: SECONDARY_COLOR,
        backgroundColor: SECONDARY_BACKGROUND_COLOR,
        border: SECONDARY_BORDER,
        borderRadius: DEFAULT_BORDER_RADIUS
      }}
    >
      {children}
    </button>
  )
}