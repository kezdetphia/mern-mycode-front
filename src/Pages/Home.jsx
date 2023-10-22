import { useEffect } from "react";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//pages & components
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts"); //it works without the full url cause proxy base-backend-url was added to the frontend json
      const data = await response.json();

      if (response.ok) {
        dispatch({type: "SET_WORKOUTS", payload: data})
      }
    };
    fetchWorkout();
  }, [workouts]);

  return (
    <div className="Home flex my-10">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}
      </div>
      <div className="">
          <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
