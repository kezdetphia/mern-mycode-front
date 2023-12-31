import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {
  const intialForm = {
    email: "",
    password: "",
  };

  const [signupForm, setSignupForm] = useState(intialForm);

  const {
    signup,
    error,
    isLoading,
  } = useSignup();

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
    <div className="flex justify-center h-screen sm:pt-20 sm:pb-40  bg-backg  ">
      <div className="bg-gray-100 border rounded-md sm:w-96  w-full px-7 shadow-[inset_10px_0px_200px_] shadow-lightpink ">
        <div className="text-2xl text-gray-600 font-bold mt-10 mx-2 ">
          Create an account
        </div>
        <div className="border border-lightpink mt-4" />

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

          <div className="flex justify-center items-center flex-col pt-8">
            <button
              className="w-1/3 bg-lightpink text-gray-700 font-bold rounded-md p-3 mt-1 text-xs transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            <div className="flex items-center text-md pt-1 hover:text-highlight ">
              <Link to="/login">
                <span className="px-4 text-gray-400 text-xs pt-3">
                  Already a member?{" "}
                  <span className=" hover:text-lightpink">Login </span>
                </span>
              </Link>
            </div>

            <div className="flex justify-center  text-error text-sm">
              <div className="">{error && <div>{error}</div>}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
