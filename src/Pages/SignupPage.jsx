import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {

  const [headerInstruction, setHeaderInstruction] = useState('Create an account')


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
    signup(signupForm);
  }

  return (
    <div className="flex justify-center pt-40 w-screen h-screen bg-background  ">
      <div className="bg-white border rounded-md w-96 h-1/2 px-7  ">
        <div className="text-2xl font-bold mt-10 mx-2 ">
          {headerInstruction}
        </div>
        <div className="border bg-background mt-4" />
        <form className="flex flex-col mx-2 my-10  " onSubmit={handleSubmit}>

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

          <div className="flex justify-center flex-col py-10">
            <button
              className="bg-mygreen text-white font-bold rounded-md p-3 text-xs"
              type="submit"
              disabled={isLoading}
            >
              Register
            </button>

            <div className="flex justify-center mt-10 text-red-400 text-sm">
            <div className="">
              {error && <div>{error}</div>}
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
