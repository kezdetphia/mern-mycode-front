import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const intialForm = {
    email: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(intialForm);

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
      <div className="h-full w-full sm:pt-20 sm:pb-35 flex justify-center  ">
        <div className="bg-gray-100 border rounded-md sm:w-96 sm:mb-40    w-full px-7 shadow-[inset_10px_0px_200px_] shadow-lightpink    ">
          <div className="text-2xl font-bold mt-10 mx-2 text-gray-600 ">
            Login with email
          </div>
          <div className="border border-lightpink mt-4  " />

          <form
            className="flex flex-col mx-2 mt-10 sm:pb-60  "
            onSubmit={handleSubmit}
          >
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
                className="w-1/3 bg-lightpink text-gray-700 font-bold rounded-md p-3 mt-6 text-xs transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out "
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="flex items-center text-md pt-1 hover:text-highlight ">
                <Link to="/signup">
                  <span className="px-4 text-gray-400 text-xs pt-3">
                    Don't have an account yet?{" "}
                    <span className=" hover:text-lightpink">Sign Up </span>
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
    </div>
  );
};

export default LoginPage;
