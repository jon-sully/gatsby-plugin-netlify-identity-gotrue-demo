import React, { useState } from "react"
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useForm } from "react-hook-form";
import { navigate } from 'gatsby';
import Layout from "../components/Layout"

export default () => {
  const identity = useIdentityContext()
  const { register, handleSubmit, errors } = useForm()
  const [formError, setFormError] = useState(false)
  const [signingUp, setSigningUp] = useState(false)

  const onSubmit = async (data) => {
    setSigningUp(true)
    setFormError(false)

    identity
      .signup({ email: data.email, password: data.password, data: { full_name: data.fullName } })
      .then(() => {
        setSigningUp(false)
        navigate('/')
      })
      .catch(e => setFormError(e.message))
  }

  return (
    <Layout>
      <main className="max-w-2xl flex-grow mx-auto flex flex-col justify-around">
        <div className="sm:flex sm:flex-row-reverse sm:items-center">
          <div className="sm:px-2">
            <h1 className="px-4 pt-5 text-2xl text-left text-teal-500 font-bold sm:text-3xl">
              Sign Up
            </h1>
            {identity.user ?
              <div className="w-full max-w-xs">
                <p>You are already signed in</p>
              </div>
              : <div className="w-full max-w-xs">
                <form className="pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      ref={register({ required: true })}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
                      placeholder="Johnny Appleseed"
                      name="fullName">
                    </input>
                    {errors.fullName && <p className="text-red-500 text-xs italic">Name is required</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      ref={register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
                      placeholder="johnny@apple.com"
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
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      name="password"
                      type="password"
                      placeholder="******************">
                    </input>
                    {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${signingUp && 'opacity-50 cursor-not-allowed'}`}
                      type="submit">
                      Sign Up
                    </button>
                  </div>
                  <div className="pt-2">
                    {formError && <p className="text-red-500 text-xs italic">That didn't seem to work right!</p>}
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </main>
    </Layout>
  )
}
