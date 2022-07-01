import { useState } from "react";

import { forgotPassword } from "../api/auth";

import Button from "../components/button";
import Input from "../components/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [sent, setSent] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleClick = async () => {
    await forgotPassword(email);
    setSent(true);
  };
  return (
    <div className=" flex flex-col justify-center mt-20 mx-20">
      {!sent ? (
        <>
          <h1 className="mb-4">Forgot passowrd?</h1>
          <p>
            We will send you a link to your email address to reset your password
          </p>
          <Input name="Email" label="Email" onChange={handleChange} />
          <div onClick={handleClick}>
            <Button
              type="submit"
              color="white"
              bgColor="black"
              borderRadius="10px"
              size="md"
              text="Send"
            />
          </div>
        </>
      ) : (
        <h1>Check your email</h1>
      )}
    </div>
  );
};
export default ForgotPassword;
