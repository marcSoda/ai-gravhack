import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    axios.get('/api/hello/')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage('Error: ' + err.message))
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default App
