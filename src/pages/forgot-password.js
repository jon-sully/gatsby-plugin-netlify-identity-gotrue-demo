import React, { useState, useEffect } from "react"
import { navigate } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import { useForm } from "react-hook-form";

import Layout from "../components/Layout"

export default () => {
  const identity = useIdentityContext()
  const { register, handleSubmit, errors } = useForm()
  const [formProcessing, setFormProcessing] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const onSubmit = async (data) => {
    setFormProcessing(true)
    await identity
      .sendPasswordRecovery({ email: data.email })
      .catch(_ => _)
    setFormProcessing(false)
    setFormSubmitted(true)
  }

  // Current users don't need to confuse themselves
  useEffect(() => {
    identity.user && navigate('/members')
  }, [identity.user])

  return (
    <Layout>
      <main className="max-w-2xl flex-grow mx-auto flex flex-col justify-around">
        <div className="sm:flex sm:flex-row-reverse sm:items-center">
          <div className="sm:px-2">
            <h1 className="px-4 pt-5 text-2xl text-left text-teal-500 font-bold sm:text-3xl">
              Forgot Password
            </h1>
            <div className="w-full max-w-xs">
              <form className="pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                {formSubmitted ?
                  <div>
                    <p>Thanks! If that account exists, we'll send an email to reset the password.</p>
                  </div>
                  : <>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        ref={register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'disabled'}`}
                        type="text"
                        placeholder="johnny@apple.com"
                        name="email">
                      </input>
                      {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-50 cursor-not-allowed'}`}
                        type="submit">
                        Reset
                      </button>
                    </div>
                  </>
                }
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
