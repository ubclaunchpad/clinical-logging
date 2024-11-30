import "./CLButtons.css"

const DEFAULT_PRIMARY_CLASSNAME = "primary-variant-button"
const DEFAULT_SECONDARY_CLASSNAME = "secondary-variant-button"

const DEFAULT_HEIGHT = "54px"
const DEFAULT_WIDTH = "fit-content"
const DEFAULT_TYPE = "button"
const DEFAULT_ON_CLICK = () => {}

/**
 * PRIMARY variant of the clinical logging button.
 * Should work out of the box for most use cases (with the exception of onClick which does nothing by default).
 * The height and width are customizable if necessary.
 */
export const CLButtonPrimary = ({
  children,
  className,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  type = DEFAULT_TYPE,
  onClick = DEFAULT_ON_CLICK
}) => {

  const updatedClassName = className
    ? DEFAULT_PRIMARY_CLASSNAME + " " + className
    : DEFAULT_PRIMARY_CLASSNAME

  return (
    <button 
      className={updatedClassName}
      type={type}
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
  className,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  type = DEFAULT_TYPE,
  onClick = DEFAULT_ON_CLICK
}) => {

  const updatedClassName = className
  ? DEFAULT_SECONDARY_CLASSNAME + " " + className
  : DEFAULT_SECONDARY_CLASSNAME
  
  return (
    <button 
      className={updatedClassName}
      type={type}
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