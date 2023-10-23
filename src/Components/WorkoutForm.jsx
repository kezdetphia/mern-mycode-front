import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutForm = () => {
  const {state, dispatch} = useWorkoutsContext()
  
  const initialForm = {
    title: '',
    reps: '',
    load: ''
  }
  
  const [workout, setWorkout] = useState(initialForm)

  const handleSubmit = async(e) =>{
    try{
      e.preventDefault()
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(workout),
      });
      
      const resData = await res.json();
      
      if (res.ok){
        setWorkout(initialForm);
        console.log('new workout added', resData)
        dispatch({ type: "CREATE_WORKOUT", payload: resData });
      } else {
        console.error('Request failed with status: ', res.status)
      }
    }catch(err){
      console.log("Error:", err)
    }   
  }

 const handleChange = (e)=>{
  const {name,value} = e.target
  setWorkout({...workout, [name]:value})
 }

  return (
    <div className="flex flex-col h-[400px] mr-10   shadow-lg shadow-darkgray  ">
      <p className="mx-7 my-4 text-xl font-bold">Add a new workout</p>
      <form
        className="flex flex-col mx-7 my-4   "
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="text-lightgray pb-2">Exercise Title:</label>
        <input
          placeholder="Title"
          type="text"
          value={workout.title}
          name="title"
          onChange={handleChange}
          className="mb-7 pl-1"
        />
        <label className="text-lightgray pb-2">Load: (in kg)</label>
        <input
          placeholder="Load"
          value={workout.load}
          name="load"
          onChange={handleChange}
          className="mb-7 pl-1"
        />
        <label className="text-lightgray pb-2">Reps: </label>
        <input
          placeholder="Reps"
          value={workout.reps}
          name="reps"
          onChange={handleChange}
          className="mb-7 pl-1"
        />

        <div className="flex justify-start items-center ">
          <button
            className="rounded-lg text-white bg-green-500 px-4 py-1"
            type="submit"
          >
            Add Workout
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default WorkoutForm;