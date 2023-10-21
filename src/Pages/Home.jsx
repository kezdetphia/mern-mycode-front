import { useEffect, useState } from "react";

//pages & components
import WorkoutDetails from "../Components/WorkoutDetails";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts/"); //it works without the full url cause proxy base-backend-url was added to the frontend json
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      }
    };
    fetchWorkout();
  }, []);

  return (
    <div className="Home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails key={workout.id} workout={workout} />)}
      </div>
    </div>
  );
};

export default Home;
