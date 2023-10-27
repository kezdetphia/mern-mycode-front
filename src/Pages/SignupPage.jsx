import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {

  const intialForm = {
    email: "",
    password: "",
  };

  const [signupForm, setSignupForm] = useState(intialForm);
  const {signup, error, isLoading} = useSignup()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupForm)
    await signup(signupForm);
  }

  return (
    <div className="flex justify-center mt-40  ">
      <div className="  bg-gray-200 border rounded-md ">
        <div className="text-md text-white text-bold flex justify-center py-2  rounded-lg bg-gray-400">
          Register
        </div>
        <form className="flex flex-col m-2  " onSubmit={handleSubmit}>
          <label className="p-1 text-gray-600">Email</label>
          <input
            className="p-1 rounded-lg bg-gray-300"
            placeholder="Email"
            type="email"
            value={signupForm.email}
            name="email"
            onChange={handleChange}
          />
          <label className="p-1 text-gray-600 ">Password</label>
          <input
            className="p-1 rounded-lg bg-gray-300"
            placeholder="Password"
            type="password"
            value={signupForm.password}
            name="password"
            onChange={handleChange}
          />
          <div className="flex justify-center flex-col py-5">
            <button
              className="bg-blue-500 text-white rounded-md  px-4 py-1"
              type="submit"
              disabled={isLoading}
            >
              Register
            </button>
            <div className="flex justify-center pt-5 text-red-500">
              {error && <div>{error}</div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
