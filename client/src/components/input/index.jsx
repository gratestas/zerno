import {useState} from "react";

const Input = ({ name, label, onChange, half=false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isPassword = name === "password";
  return (
    <div className={`${half ? 'w-[48%]' : 'w-full'} flex flex-col mt-6`}>
      <label htmlFor={name} className="text-sm font-semibold mb-1 text-gray-700">
        {label}
      </label>
      <div className='relative'>
      <input
        type={`${isPassword && !isVisible ? "password" : "text"}`}
        name={name}
        onChange={onChange}
        className=' w-full border rounded-lg p-3 border-gray-200 hover:border-gray-400 outline-none'
      />
      {isPassword && (
      <div 
        className='absolute text-xs right-4 bottom-4 font-semibold text-gray-400 cursor-pointer'
        onClick={() => setIsVisible((prevState) => !prevState)}
      >
        {isVisible ? "hide" : "show" }
        </div>
      )}
      </div>

    </div>
  );
};

export default Input;