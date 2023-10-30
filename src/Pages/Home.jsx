import { useEffect } from "react";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

//pages & components
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";


const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkout = async () => {
        const response = await fetch(
          // `https://mern-workout-back.onrender.com/api/workouts`
          'http://localhost:4000/api/workouts', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          }
        )
        const data = await response.json();

      if (response.ok) {
        dispatch({type: "SET_WORKOUTS", payload: data})
      }
    };

    if (user) fetchWorkout();

  }, [dispatch, user]);



  return (
    <div className="Home bg-background flex flex-col sm:flex-row my-10 w-screen h-full md:px-10 space-between">

      <div className=" flex justify-center sm:pl-5 ">
          <WorkoutForm />
      </div>
      <div className="workouts w-full pt-5 sm:pt-0">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}
      </div>

    </div>
  );
};

export default Home;
