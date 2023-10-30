import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const {dispatch } = useWorkoutsContext();
  const {user}  = useAuthContext()

  const initialForm = {
    title: "",
    reps: "",
    load: "",
  };

  const [emptyFields, setEmptyFields] = useState([]);
  const [workout, setWorkout] = useState(initialForm);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if(!user) {
        setError('You must be logged in')
        return
      }
      
      const res = await fetch(
        "http://localhost:4000/api/workouts",
        // `https://mern-workout-back.onrender.com/api/workouts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(workout),
        }
      );

      const resJson = await res.json();

      if (!res.ok) {
        setError(resJson.error);
        // setEmptyFields(resJson.emptyFields);
      }

      if (res.ok) {
        setWorkout(initialForm);
        console.log("new workout added", resJson);
        setEmptyFields([]);
        setError(null);
        dispatch({ type: "CREATE_WORKOUT", payload: resJson });
      } else {
        console.error("Request failed with status: ", res.status);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  return (
    <div className="flex flex-col pr-10 shadow-lg shadow-darkgray  ">
      <p className="px-7 py-4 text-xl font-bold text-texcolor">
        Add a new workout
      </p>
      <form
        className="flex flex-col mx-7 my-4   "
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="pb-2 text-textcolor">Exercise Title:</label>
        <input
          placeholder="Title"
          type="text"
          value={workout.title}
          name="title"
          onChange={handleChange}
          className={`mb-7 pl-1 ${
            emptyFields.includes("title") && focusedField !== "title"
              ? "border shadow-sm shadow-red-500 border-red-500"
              : "border-transparent"
          }`}
          onFocus={() => setFocusedField("title")}
        />
        <label className="text-textcolor pb-2">Load: (in kg)</label>
        <input
          placeholder="Load"
          value={workout.load}
          name="load"
          onChange={handleChange}
          className={`mb-7 pl-1 ${
            emptyFields.includes("load") && focusedField !== "load"
              ? "border shadow-sm shadow-red-500 border-red-500"
              : "border-black"
          }`}
          onFocus={() => setFocusedField("load")}
        />
        <label className="text-textcolor pb-2">Reps: </label>
        <input
          placeholder="Reps"
          value={workout.reps}
          name="reps"
          onChange={handleChange}
          className={`mb-7 pl-1 ${
            emptyFields.includes("reps") && focusedField !== "reps"
              ? "border shadow-sm shadow-red-500 border-red-500"
              : "border-black"
          }`}
          onFocus={() => setFocusedField("reps")}
        />

        <div className="flex justify-start items-center ">
          <button
            className="rounded-lg text-textcolor hover:bg-highlight bg-secondary px-4 py-1"
            type="submit"
          >
            Add Workout
          </button>
        </div>
        <div className="pt-4 text-red-500">{error}</div>
      </form>
    </div>
    // </div>
  );
};

export default WorkoutForm;
