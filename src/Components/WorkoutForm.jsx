import { useState } from "react";


const WorkoutForm = () => {
  
  const initialForm = {
    title: '',
    reps: '',
    load: ''
  }
  
  const [workout, setWorkout] = useState(initialForm)


  const handleSubmit = async(workout, e) =>{
    try{
      e.preventDefault()
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  console.log(name,value)
 }

  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(workout, e)}>
        <label>Title</label>
        <input
          placeholder="Title"
          type="text"
          value={workout.title}
          name="title"
          onChange={handleChange}
        />
        <label>Load</label>
        <input
          placeholder="Load"
          value={workout.load}
          name="load"
          onChange={handleChange}
        />
        <label>Reps</label>
        <input
          placeholder="Reps"
          value={workout.reps}
          name="reps"
          onChange={handleChange}
        />
      <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkoutForm;