import { useState } from "react";

const SignupPage = () => {

  const intialForm = {
    email: "",
    password: "",
  };

  const [signupForm, setSignupForm] = useState(intialForm);

  const handleChange=(e)=>{
    const {name,value} = e.target.value
    setSignupForm({
      ...signupForm, [name]: value
    })
  }

  onSubmitForm = (e)=>{
    e.preventDefault()
    
    const res = fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupForm),
    });
  }


  return (
    <div className="flex justify-center  ">
      <div className="w-60 h-60  bg-gray-200 border rounded-md ">
        <div className="text-md text-white text-bold flex justify-center py-2  rounded-lg bg-gray-400">
          Register
        </div>
        <form className="flex flex-col m-2" onSubmit={handleSubmit}>
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
            type="text"
            value={signupForm.password}
            name="password"
            onChange={handleChange}
          />
          <div className="flex justify-center py-5">
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-1"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
