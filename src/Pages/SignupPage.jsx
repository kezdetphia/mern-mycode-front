import { useState } from "react";
import {Link} from 'react-router-dom'
import { useSignup } from "../hooks/useSignup";


const SignupPage = () => {
  const intialForm = {
    email: "",
    password: "",
  };

  const [signupForm, setSignupForm] = useState(intialForm);

  const [headerInstruction, setHeaderInstruction] = useState("Create an account");

  const { signup, error, isLoading } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(signupForm);
  };

  return (
    <div className="flex justify-center sm:pt-40  bg-background  ">
      <div className="bg-white border rounded-md sm:w-96 w-full px-7 ">
        <div className="text-2xl font-bold mt-10 mx-2 ">
          {headerInstruction}
        </div>
        <div className="border bg-background mt-4" />
        <form className="flex flex-col mx-2 mt-10  " onSubmit={handleSubmit}>
          <input
            className="p-3 rounded-lg bg-background mb-3 text-xs"
            placeholder="Email"
            type="email"
            value={signupForm.email}
            name="email"
            onChange={handleChange}
          />
          <input
            className="p-3 rounded-lg bg-background text-xs"
            placeholder="Password"
            type="password"
            value={signupForm.password}
            name="password"
            onChange={handleChange}
          />

          <div className="flex justify-center items-center flex-col ">
            <button
              className="w-1/3 bg-mygreen text-white font-bold rounded-md p-3 mt-5 text-xs"
              type="submit"
              disabled={isLoading}
            >
              Sign Up
            </button>
            <div className="flex items-center text-sm pt-1 hover:text-mygreen ">
              <Link to="/login">
                <h1 className="px-4"> Login </h1>
              </Link>
            </div>

            <div className="flex justify-center mt-10 text-red-400 text-sm">
              <div className="">{error && <div>{error}</div>}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
