const Button = ({color,bgColor, size, text, borderRadius, type="button"}) => {
  return (
    <button
    type={type}
    style={{backgroundColor: bgColor, color, borderRadius}}
    className={`text-${size} font-semibold p-3 hover:drop-shadow-xl w-full`}
    >
      {text}
    </button>
  )
}
export default Button