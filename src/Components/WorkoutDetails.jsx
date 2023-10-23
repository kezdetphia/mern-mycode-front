import { BsFillTrashFill } from "react-icons/bs";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      console.log(workout._id);
      const res = await fetch(`/api/workouts/${workout._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const resDatas = await res.json();
        dispatch({ type: "DELETE_WORKOUT", payload: resDatas });
        console.log("New workout deleted", resDatas);
      } else {
        console.error(
          "Delete failed with status: ",
          res.status,
          res.statusText
        );
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="mx-16">
      <div className="flex bg-slate-50 mb-3">
        <div className="mx-8 my-5">
          <h4 className="text-purple-400 font-bold pb-3">{workout.title}</h4>
          <p>
            <strong>Load(kg): </strong>
            {workout.load}
          </p>
          <p>
            <strong>Reps: </strong>
            {workout.reps}
          </p>
          <p>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="mt-4 mr-2">
          <button onClick={handleClick}>
            <BsFillTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
