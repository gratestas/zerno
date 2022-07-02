const Button = ({
  color,
  bgColor,
  size,
  text,
  borderRadius,
  type = "button",
}) => {
  return (
    <button
      type={type}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} font-semibold p-5 hover:drop-shadow-xl w-full my-10`}
    >
      {text}
    </button>
  );
};
export default Button;
