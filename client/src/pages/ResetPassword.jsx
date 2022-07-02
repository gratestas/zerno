import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../api/auth";

import Button from "../components/button";
import Input from "../components/input";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    await resetPassword(password, id, token);
    setSent(true);
    navigate("/auth", { replace: true });
  };
  return (
    <>
      <div className=" flex flex-col justify-center mt-20 mx-20">
        {!sent ? (
          <>
            <h1 className="mb-4 font-bold">Reset passowrd?</h1>
            <p>Please enter a new passowrd</p>
            <Input
              name="New password"
              label="New Password"
              onChange={handleChange}
            />
            <div onClick={handleClick}>
              <Button
                type="submit"
                color="white"
                bgColor="black"
                borderRadius="10px"
                size="md"
                text="Confirm"
              />
            </div>
          </>
        ) : (
          <h1>Your password was updated successfully!</h1>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
