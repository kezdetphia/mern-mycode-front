import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const intialForm = {
    email: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(intialForm);

  const [headerInstruction, setHeaderInstruction] =
    useState("Login with email");

  const { login, error, isLoading } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(loginForm);
  };

  return (
    <div className="flex justify-center sm:pt-40  bg-background  ">
      <div className="bg-white border rounded-md sm:w-96 sm:h-1/2 w-full px-7   ">
        <div className="text-2xl font-bold mt-10 mx-2 ">
          {headerInstruction}
        </div>
        <div className="border bg-background mt-4" />

        <form className="flex flex-col mx-2 my-10  " onSubmit={handleSubmit}>
          <input
            className="p-3 rounded-lg bg-background mb-3 text-xs"
            placeholder="Email"
            type="email"
            value={setLoginForm.email}
            name="email"
            onChange={handleChange}
          />
          <input
            className="p-3 rounded-lg bg-background text-xs"
            placeholder="Password"
            type="password"
            value={setLoginForm.password}
            name="password"
            onChange={handleChange}
          />
          <div className="flex justify-center items-center flex-col ">
            <button
              className="bg-mygreen text-white font-bold rounded-md p-3 text-xs mt-5 w-1/3 "
              type="submit"
              disabled={isLoading}
            >
              Login
            </button>
          </div>
          <span className="text-xs flex justify-center sm:pt-5 pt-3">
            Don't have an account yet?
          </span>
          <Link
            className="text-xs flex justify-center pt-1 mb-5  hover:text-mygreen"
            to="/signup"
          >
            Register
          </Link>

          <span className="">{error && <div>{error}</div>}</span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
