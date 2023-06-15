import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
   // since they are both called dispatch we destructor it and give it another name
  const { dispatch: dispatchWorkouts } = useWorkoutsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
      // next thing for avoiding flashes of other workouts
    dispatchWorkouts({ type: 'SET_PROJECTS', payload: null })
  }

  return { logout }
}