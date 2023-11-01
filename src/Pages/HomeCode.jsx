import { useEffect, useState } from "react";
import { useCodesContext } from "../hooks/useCodesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//pages & components
import CodeDetails from "../Components/CodeDetails";
import CodeForm from "../Components/CodeForm";

const HomeCode = () => {
  const { codes, dispatch } = useCodesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch(
        // `https://mern-workout-back.onrender.com/api/codes`
        "http://localhost:4000/api/codes",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CODE", payload: data });
      }
    };

    if (user) fetchCodes();
  }, [dispatch, user]);

  return (
    <div className="Home bg-backg flex flex-col sm:flex-row  w-screen h-full  space-between ">
      <div className=" flex justify-center   ">
        <CodeForm />
      </div>
      <div className="codes pt-5 sm:pt-0">
        {codes &&
          codes.map((code) => <CodeDetails key={code._id} code={code} />)}
      </div>
    </div>
  );
};

export default HomeCode;
