import { useEffect, useState } from "react";
import { useCodesContext } from "../hooks/useCodesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//pages & components
import CodeInfo from "../Components/CodeInfo";
import CodeForm from "../Components/CodeForm";

const HomeCode = () => {
  const { codes, dispatch } = useCodesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LIVE}/api/codes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CODE", payload: data });
      }
    };

    if (user) fetchCodes();
  }, [dispatch, user]);

  return (
    <div className="Home h-full bg-backg flex flex-col sm:flex-col md:flex-col xl:flex-row space-between ">
      <div className=" flex justify-center  lg:max-w-4xl   ">
        <CodeForm />
      </div>
      <div className="codes p-5 pt-5 sm:pt-0  w-full overflow-scroll lg:max-w-4xl xl:max-w-full ">
        {codes &&
          codes.map((code) => <CodeInfo key={code._id} code={code} />)}
      </div>
    </div>
  );
};

export default HomeCode;
