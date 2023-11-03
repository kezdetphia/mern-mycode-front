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
    <div className=" h-screen w-screen  bg-backg  ">
      <div className="h-full w-full sm:pt-20 flex justify-center ">
        <div className="bg-gray-100 border rounded-md sm:w-96 sm:mb-40  w-full px-7">
          <div className="text-2xl font-bold mt-10 mx-2 text-textcolor ">
            {headerInstruction}
          </div>
          <div className="border bg-background mt-4  " />

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
            <div className="flex justify-center items-center flex-col pt-3 ">
              <button
                className="w-1/3 bg-mygreen text-gray-700 font-bold rounded-md p-3 mt-6 text-xs transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out"
                type="submit"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-center pt-3">
              <Link to="/SIGNUP">
                <span className="px-4 text-gray-400 text-xs pt-3">
                  Don't have an account yet?{" "}
                  <span className=" hover:text-mygreen">Sign Up </span>
                </span>
              </Link>

              <span className="text-error">{error && <div>{error}</div>}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
