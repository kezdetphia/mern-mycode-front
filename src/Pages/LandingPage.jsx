import React from "react";

const LandingPage = () => {
  const messages = [
    "Store your code snippets and projects securely in one place for quick and easy access.",
    "Retrieve the blueprint of your code within seconds, eliminating the need to start from scratch.",
    "Whether you're a newbie or a pro, our app is designed to help programmers at every level of expertise.",
    "Add comments and notes to your code for better understanding and knowledge retention.",
    " Your code is stored securely, and you have full control over who can access it.",
    "We're committed to improving our app and adding new features based on user feedback.",
    "Say goodbye to code hunting and repetitive tasks, and focus on what you do best: programming.",
  ];

  return (
    <div className="h-screen w-full  ">
      <div className="text-center flex flex-col sm:py-4">

        <span className="text-gray-400 relative">
  
          <span className="border-b border-lightpink text-6xl">Welc</span>
        <span className="text-6xl">ome to </span> <span className="text-6xl text-white"> myCode</span>
        </span>

        <span className="text-gray-400 text-bold text-xl sm:pt-5">
          Where Your Code Finds a Home{" "}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:py-5  ">
        {messages.map((message, id) => (
          <span
            key={id}
            className="border rounded-2xl border-darkpink  p-2 flex justify-center items-center text-center bg-search text-gray-400 text-md"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
