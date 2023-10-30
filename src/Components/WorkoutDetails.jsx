import { BsFillTrashFill } from "react-icons/bs";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext()

  const handleClick = async () => {
    // if no user don't even bother executing
    if (!user) return
    try {
      console.log(workout._id);
      // `https://mern-workout-back.onrender.com/api/workouts/${workout._id}`,
      const res = await fetch(
        `http://localhost:4000/api/workouts/${workout._id}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        }
      );

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
    <div className="flex flex-col px-5 w-full transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex bg-cardbg mb-3 rounded-md">
        <div className="px-8 my-5 w-full ">
          <div className="flex justify-between w-full ">
            <h4 className="text-secondary font-bold pb-3 pr-3">
              {workout.title}
            </h4>
            <button onClick={handleClick}>
              <BsFillTrashFill />
            </button>
          </div>
          <p className="text-textcolor">
            <strong>Load(kg): </strong>
            {workout.load}
          </p>
          <p className="text-textcolor">
            <strong>Reps: </strong>
            {workout.reps}
          </p>
          <p className="text-textcolor">
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
