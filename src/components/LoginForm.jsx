import React, { useState, useEffect } from 'react'
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useForm } from "react-hook-form";
import { navigate, Link } from 'gatsby';


export default function LoginForm({ navigateTarget }) {

  const identity = useIdentityContext()
  const { register, handleSubmit, errors } = useForm()
  const [formError, setFormError] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

  // When cold-loading a PrivateContent page, the user can get redirected to
  // /login, but once the User hydrates from LocalStorage, we want to send them
  // back ASAP
  useEffect(() => {
    navigateTarget && identity.user && navigate(navigateTarget)
  }, [navigateTarget, identity.user])

  const onSubmit = async (data) => {
    setLoggingIn(true)
    setFormError(false)

    await identity
      .login({ email: data.email, password: data.password })
      .then(() => {
        setLoggingIn(false)
        navigateTarget && navigate(navigateTarget)
      })
      .catch(e => {
        setLoggingIn(false)
        setFormError(e.message)
      })
  }

  return (
    identity.user
      ? <div className="w-full max-w-xs">
        <p>You are already signed in</p>
        <p>You may need to change accounts if you're looking to access further private data</p>
      </div>
      : identity.provisionalUser ?
        <div className="w-full max-w-xs">
          <p>Your account has not yet been confirmed. Please check your email</p>
        </div>
        : <div className="w-full max-w-xs">
          <form className="pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
            </label>
              <input
                ref={register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${loggingIn && 'disabled'}`}
                type="text"
                placeholder="jane@doe.com"
                name="email">
              </input>
              {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
            </label>
              <input
                ref={register({ required: true })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${loggingIn && 'disabled'}`}
                name="password"
                type="password"
                placeholder="******************">
              </input>
              {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loggingIn && 'opacity-50 cursor-not-allowed'}`}
                type="submit">
                Sign In
              </button>
              <Link className="inline-block align-baseline font-bold text-sm text-blue-700 hover:text-blue-800 ml-2" to="/forgot-password/">
                Forgot Password?
              </Link>
            </div>
            <div className="pt-2">
              {formError && <p className="text-red-500 text-xs italic">{formError}</p>}
            </div>
          </form>
        </div>

  )
}
