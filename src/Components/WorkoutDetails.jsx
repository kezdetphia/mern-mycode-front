import DeleteBtn from "./DeleteBtn";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  

  return (
    <div className="mx-16">
      {workouts.map((workout) => (
        <div key={workout._id} className="flex bg-slate-50 mb-3">
          <div className="mx-8">
            <h4 className="text-purple-400 font-bold pb-3">{workout.title}</h4>
            <p>
              <strong>Load(kg): </strong>
              {workout.load}
            </p>
            <p>
              <strong>Reps: </strong>
              {workout.reps}
            </p>
            <p>{workout.createdAt}</p>
          </div>
          <div className="mt-4 mr-2">
            <DeleteBtn workoutId={workout._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutDetails;
