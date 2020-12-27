import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import Layout from "../components/Layout"
import PrivateContent from '../components/PrivateContent'
import { useIdentityContext } from 'react-netlify-identity-gotrue'

export default () => {
  return (
    <Layout>
      <PrivateContent
        as={MyAccount}
        callbackPath="/my-account"
      />
    </Layout>
  )
}

const MyAccount = () => {
  const identity = useIdentityContext()
  const { register, handleSubmit, errors, watch, setValue } = useForm()
  const [formProcessing, setFormProcessing] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const onSubmit = async ({ fullName, email, newPasswordOne, newPasswordTwo }) => {
    setFormProcessing(true)

    await identity.update({
      email: email,
      password: newPasswordOne && newPasswordTwo,
      user_metadata: {
        full_name: fullName
      }
    })

    setValue('newPasswordOne', '')
    setValue('newPasswordTwo', '')
    setFormProcessing(false)
    setFormSubmitted(true)
    setTimeout(() => (setFormSubmitted(false)), 2000)
  }

  useEffect(() => {
    setValue('email', identity.user.email)
    setValue('fullName', identity.user.user_metadata?.full_name)
  }, [identity.user, identity.user.email, setValue])

  return (
    <main className="max-w-2xl flex-grow mx-auto flex flex-col justify-around">
      <div className="sm:flex sm:flex-row-reverse sm:items-center">
        <div className="sm:px-2">
          <h1 className="px-4 pt-5 text-2xl text-left text-teal-500 font-bold sm:text-3xl">
            My Account
          </h1>
          <p className="px-4 mt-8 text-xl text-gray-700 sm:mt-8">
            Feel free to change any of your account information here. Only changes you make will apply
          </p>
          <form className="pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                ref={register()}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                disabled={formProcessing}
                type="text"
                name="fullName">
              </input>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                ref={register({ pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                disabled={formProcessing || identity.pendingEmailUpdate}
                type="text"
                name="email">
              </input>
              {identity.pendingEmailUpdate && <p className="text-red-500 text-xs italic">Pending email update to {identity.pendingEmailUpdate}; please check your inbox</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="newPasswordOne" className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                ref={register()}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                disabled={formProcessing}
                name="newPasswordOne"
                type="password"
                placeholder="******************">
              </input>
              {errors.newPasswordOne && <p className="text-red-500 text-xs italic">Password is required</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="newPasswordTwo" className="block text-gray-700 text-sm font-bold mb-2">
                New Password (Repeat)
              </label>
              <input
                ref={register({ validate: value => value === watch('newPasswordOne') })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                disabled={formProcessing}
                name="newPasswordTwo"
                type="password"
                placeholder="******************">
              </input>
              {errors.newPasswordTwo && <p className="text-red-500 text-xs italic">Passwords Must Match</p>}
            </div>


            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-50 cursor-not-allowed'}`}
                disabled={formProcessing}
                type="submit">
                Update
              </button>
            </div>
            <div>
              {formSubmitted && <p className="text-green-500 text-xs italic">Update Complete</p>}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
