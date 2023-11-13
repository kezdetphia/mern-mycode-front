import {Link} from 'react-router-dom'

const LandingPage = () => {
  const messages = [
    "Store your code snippets and projects securely in one place for quick and easy access.",
    "Retrieve the blueprint of your code within seconds, eliminating the need to start from scratch.",
    "Whether you're a newbie or a pro, our app is designed to help programmers at every level of expertise.",
    "Add comments and notes to your code for better understanding and knowledge retention.",
    " Your code is stored securely, and you have full control over who can access it.",
    "We're committed to improving our app and adding new features based on user feedback.",
    "Say goodbye to code hunting and repetitive tasks, and focus on what you do best: programming.",
    "Efficiently search and retrieve your code when you need it most, reducing the time spent on code hunting and increasing productivity.",
    "Enhance your team's collaboration with a dedicated hub for sharing, reviewing, and optimizing code together.",
  ];
  const titles = [
    "Secure Code Storage",
    "Rapid Code Retrieval",
    "Programming for All Skill Levels",
    "Code Comments and Notes",
    "Control Over Code Access",
    "User-Driven Feature Development",
    "Efficiency in Programming",
    "Intuitive Code Search",
    "Code Collaboration",
  ];

  const description = "Have you ever found yourself stumbling upon a brilliant code snippet, one that could be a lifesaver for your future projects, but you ended up losing track of it in the labyrinth of your GitHub repositories? br It's a common challenge we all face when dealing with code repositories. The struggle to recall where you saved that invaluable piece of code or which project it belonged to can be frustrating.And what about those times when you tried to save a code snippet in your notes or a different document, only to find it to be a jumbled mess? br No proper indentations, no consistent color schemes it's a nightmare for anyone trying to maintain clean, organized code. br That's where our tool comes into play. We've designed a solution to effortlessly save your favorite code snippets, making them accessible in a matter of seconds. With a few simple steps, you can give your code a recognizable name, specify the programming language, and add a helpful description for future reference. br No more hunting through lengthy GitHub repositories or sifting through complex project structures. No more dealing with disorganized code snippets. br Our application empowers you to take control of your code, ensuring you can revisit, reuse, and share it with ease. Simplify your coding journey and make the most out of your snippets. br Say goodbye to code-hunting woes and the chaos of disorganized notes. Embrace a more organized and efficient coding experience with our code-saving tool."
  const descWithLineBreaks =
    "Discover brilliant code snippets effortlessly! Say goodbye to code hunting in the GitHub labyrinth. Our tool empowers you to save, organize, and share your favorite code with ease. Enhance your coding journey and make the most of your snippets. Embrace an organized and efficient coding experience with our code-saving tool.";
  const messagesWithTitles={}

  titles.forEach((title,index)=>{
    messagesWithTitles[title] = messages[index]
  })



  return (
    <div className="h-full w-full flex flex-col bg-backg ">
      <div className="text-center flex flex-col sm:flex-col py-10 px-3 sm:py-40">
        <span className="text-gray-400 relative">
          <span className="border-b border-lightpink text-6xl">Welc</span>
          <span className="text-6xl">ome to </span>{" "}
          <span className="text-6xl text-white "> myCode</span>
        </span>

        <span className="text-white text-bold text-xl  pt-5">
          Where Your Code Finds a Home{" "}
        </span>
        <span className="text-xl sm:text-4xl text-gray-400 pt-6 px-3">
          Effortlessly store your code snippets for easy access when you need
          them, making your coding journey smoother and more efficient.
        </span>
        <div className="sm:pt-36 pt-20 ">
          <Link
            to="/login"
            className="mr-1 border border-mediumpink shadow-md shadow-lightpink rounded-md px-3 py-1 sm:px-9 sm:py-2 text-gray-300 transition-shadow hover:shadow-mediumpink"
          >
            {" "}
            Login
          </Link>
          <Link
            to="/signup"
            // className=" rounded-md px-3 py-1 sm:px-9 sm:py-2 text-gray-600 hover:bg-mediumpink ml-1 bg-gradient-to-r from-gray-200 to-lightpink transition-all duration-300 ease-in-out hover:from-gray-50 hover:to-lightpink transform hover:scale-105"
            className="ml-1 border border-mediumpink shadow-md shadow-lightpink rounded-md px-3 py-1 sm:px-9 sm:py-2 text-gray-300 transition-shadow hover:shadow-mediumpink"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="sm:pt-58 md:pt-50 lg:pt-30 xl:pt-31  ">
        <div className="text-center flex flex-col ">
          <span className="text-gray-100 text-2xl pr-2 ">
            What's Inside myCode?
          </span>
          <span className="text-gray-400 text-xl">
            Your Key to Effortless Code Management.
          </span>
        </div>

        <div className="flex sm:pt-20 flex-col">
          <div className=" text-gray-400 text-lg ">
            <div className="p-4 leading-relaxed tracking-wide text-center">
              <span>{descWithLineBreaks} </span>
            </div>
          </div>

          <div className=" ">
            <div className="grid grid-cols-1  sm:grid-cols-2  xl:grid-cols-3 gap-5 py-5 px-4  ">
              {Object.entries(messagesWithTitles).map(
                ([titles, messages], id) => (
                  <div
                    key={id}
                    className="border rounded-2xl border-lightpink p-2 flex flex-col justify-center text-start bg-search hover:bg-backg text-gray-400 text-md  "
                  >
                    <h2 className="text-lg font-semibold py-2  text-gray-200 sm:text-start text-center ">
                      {titles}
                    </h2>
                    <p className="pb-2 sm:text-start text-center ">
                      {messages}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
