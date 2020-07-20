import React from 'react'
import { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten the link</h1>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Authorization</span>
                <div>
                  <div className="input-field">
                    <input
                      placeholder="Enter email"
                      id="email"
                      name="email"
                      type="text"
                      className="yellow-input"
                      value={form.email}
                      onChange={changeHandler}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input
                      placeholder="Enter password"
                      id="password"
                      type="password"
                      name="password"
                      className="yellow-input"
                      value={form.password}
                      onChange={changeHandler}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <button
                  className="btn yellow darken-4"
                  style={{ marginRight: 10 }}
                  disabled={loading}
                  onClick={loginHandler}
                >
                  Login
                </button>
                <button
                  className="btn grey ligthen-1 black-text"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}