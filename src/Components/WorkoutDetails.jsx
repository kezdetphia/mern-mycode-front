const WorkoutDetails = ({workout}) => {
  return (
    <div className='workoutdetails bg-slate-50 mb-3 mx-16 '>
      <div className='mx-8 '>
      <h4 className='text-purple-400 font-bold pb-3  '>{workout.title}</h4>
      <p><strong>Load(kg): </strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      </div>
    </div>
  );
};

export default WorkoutDetails;