import { useState } from 'react'
import axios from 'axios'

import useRequest from '../../hooks/use_request'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password
      })
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  }

  return (
    <form submit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors.length > 0 && (
        
      )}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}
