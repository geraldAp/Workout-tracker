import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// getting access to the user
import { useAuthContext } from '../hooks/useAuthContext'
// the url
import { url } from './url'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  // getting the user
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }
    // 'http://localhost:4000/api/workouts/' + workout._id
    const response = await fetch(`${url}/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails