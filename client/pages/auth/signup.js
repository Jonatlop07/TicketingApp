import { useState } from 'react'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault();
  }
  
  return (
    <form submit={}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}
