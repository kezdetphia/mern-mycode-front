import {useEffect, useState} from 'react'



const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch('/api/workouts/'); //it works without the full url cause proxy base-backend-url was added to the frontend json
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      }

    };
    fetchWorkout();
  }, []);

  return (
    <div className="Home">
      {workouts &&
        workouts.map((workout) => <p key={workout._id}>{workout.title}</p>)}
    </div>
  );
};

export default Home;