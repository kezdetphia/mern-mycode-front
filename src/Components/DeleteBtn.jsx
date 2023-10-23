import { BsFillTrashFill } from "react-icons/bs";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const DeleteBtn = ({ workoutId }) => {
  const {workouts, dispatch} = useWorkoutsContext();

  
  const handleClick= async () => {
    const res = fetch(`/api/workouts/${workoutId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(workouts.workoutId),
    })

    if (res.ok){
      const resData = await res.json();
      console.log("new workout deleted", resData);
       dispatch({ type: "DELETE_WORKOUT", payload: resData._id });
    }
  }

  return (
    <div>
      <button onClick={handleClick}>
        <BsFillTrashFill />
      </button>
    </div>
  );
};

export default DeleteBtn;
