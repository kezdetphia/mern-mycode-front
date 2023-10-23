import { BsFillTrashFill } from "react-icons/bs";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const DeleteBtn = ({ workoutId }) => {
  const {workouts, dispatch} = useWorkoutsContext();

   
  const handleClick= async () => {
    try{
      console.log(workoutId)
      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
      })
      
      if (res.ok){
        const resDatas = await res.json();
        if (resDatas && resDatas._id) {
          dispatch({ type: "DELETE_WORKOUT", payload: workoutId});
          console.log("new workout deleted", resDatas);
        }
      }else{
        console.error("delete failed with status: ". res.status, res.statusText)
      }
    } catch(err){
      console.log('Error:', err)
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
