import { useState } from "react";


const WorkoutForm = () => {
  
  const initialForm = {
    title: '',
    reps: '',
    load: ''
  }
  
  const [workout, setWorkout] = useState(initialForm)

  const handleSubmit = async(e) =>{
    try{
      e.preventDefault()
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(workout),
      });
      setWorkout(initialForm);

      if (response.ok){
        const responseData = await response.json();
      } else {
        console.error('Request failed with status: ', response.status)
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
    // <div className=" flex justify-center ">
      <div className="flex flex-col justify-center mx-auto w-96 shadow-lg shadow-darkgray  ">
        <form className="flex flex-col mx-7 my-4 " onSubmit={(e) => handleSubmit(e)}>
          <label className="text-lightgray">Title</label>
          <input
            placeholder="Title"
            type="text"
            value={workout.title}
            name="title"
            onChange={handleChange}
            className="mb-3 pl-1"
          />
          <label>Load (kg)</label>
          <input
            placeholder="Load"
            value={workout.load}
            name="load"
            onChange={handleChange}
            className="mb-3 pl-1"
          />
          <label>Reps</label>
          <input
            placeholder="Reps"
            value={workout.reps}
            name="reps"
            onChange={handleChange}
            className="mb-3 pl-1"
          />

          <div className="flex justify-center ">
          <button className="rounded-lg bg-stone-400 px-4 py-1" type="submit">Submit</button>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default WorkoutForm;