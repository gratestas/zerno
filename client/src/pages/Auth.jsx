import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import Input from "../components/input";
import Button from "../components/button";

const initialState = { firstName: "", lastName: "", email: "", password: "" };

const Auth = () => {
  const { signup, signin, rememberMe, setRememberMe } = useAuth();

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const greeting = isSignup ? "Create an account" : " Welcome back";
  const cta = isSignup
    ? "Let's get started with your 30-days free trial!"
    : "Welcome back! Please enter your details";

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup ? signup(form) : signin(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);
  }, [rememberMe]);

  return (
    <div className=" flex justify-center mt-20">
      <div>
        <form
          className="w-[25rem] xl:w-[30rem] h-[30rem] rounded-2xl  px-4 "
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl xl:text-4xl font-bold tracking-tight mt-20 mb-2">
            {greeting}
          </h1>
          <h4 className="text-sm font-medium  mb-5 text-gray-500">{cta}</h4>
          <div className="flex flex-col flex-wrap  ">
            {isSignup && (
              <div className="flex justify-between">
                <Input
                  name="firstName"
                  label="First Name"
                  onChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  half
                />
              </div>
            )}
            <Input name="email" label="Email" onChange={handleChange} />
            <Input name="password" label="Password" onChange={handleChange} />
          </div>
          <div className="flex justify-end mt-3 mb-6 text-sm font-semibold cursor-pointer">
            Forgot password?
          </div>
          <Button
            type="submit"
            color="white"
            bgColor="black"
            borderRadius="10px"
            size="md"
            text={isSignup ? "Sign up" : "Sing in"}
          />
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              onChange={() => setRememberMe((prevState) => !prevState)}
              checked={rememberMe}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="flex justify-center mt-6 text-sm font-semibold text-gray-400">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              className="ml-2 text-bold text-gray-900 cursor-pointer"
              onClick={() => setIsSignup(!prevState)}
            >
              {!isSignup ? "Sign up" : "Sing in"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
