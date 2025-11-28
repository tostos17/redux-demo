import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectNotificationsCount, selectResetStatus } from './store/notifications/notifications.selectors'
import { increment, resetCountViaApi } from './store/notifications/notifications.slice'
import type { AppDispatch } from './store'

function App() {

  const count = useSelector(selectNotificationsCount);
  const resetStatus = useSelector(selectResetStatus);
  const dispatch = useDispatch<AppDispatch>();

  const resetButtonText = () => {
    switch(resetStatus) {
      case 'error':
      case 'idle':
        return 'Reset';
      case 'loading':
        return 'Loading...';
    }
  }

  return (
    <>
      <h1>Notifications Count: {count}</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button onClick={() => dispatch(resetCountViaApi ())}>
          {resetButtonText()}
        </button>
      </div>
      
    </>
  )
}

export default App
