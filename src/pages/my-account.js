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
        callbackPath="/my-account/"
      />
    </Layout>
  )
}

const MyAccount = () => {
  const identity = useIdentityContext()
  const { register, handleSubmit, errors, watch, setValue } = useForm()
  const [formProcessing, setFormProcessing] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const onSubmit = async (data) => {
    setFormProcessing(true)

    await identity.update(data)

    setValue('newPasswordOne', '')
    setValue('newPasswordTwo', '')
    setFormProcessing(false)
    setFormSubmitted(true)
    setTimeout(() => (setFormSubmitted(false)), 2000)
  }

  const reSendEmailChangeConfirmation = async () => {
    if (!identity.pendingEmailUpdate || formProcessing) return

    setFormProcessing(true)

    await identity.update({ email: identity.pendingEmailUpdate })

    setFormProcessing(false)
    setFormSubmitted(true)
    setTimeout(() => (setFormSubmitted(false)), 2000)
  }

  useEffect(() => {
    setValue('email', identity.user.email)
    setValue('user_metadata.full_name', identity.user?.user_metadata?.full_name)
    setValue('user_metadata.phone_number', identity.user?.user_metadata?.phone_number)
    setValue('user_metadata.address.street', identity.user?.user_metadata?.address?.street)
    setValue('user_metadata.address.city', identity.user?.user_metadata?.address?.city)
    setValue('user_metadata.address.state', identity.user?.user_metadata?.address?.state)
    setValue('user_metadata.address.zip', identity.user?.user_metadata?.address?.zip)
  }, [identity.user, setValue])

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
              <label htmlFor="user_metadata.full_name" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                ref={register({ required: true })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                disabled={formProcessing}
                placeholder="Johnny Appleseed"
                name="user_metadata.full_name">
              </input>
              {errors.user_metadata?.full_name && <p className="text-red-500 text-xs italic">Name is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="user_metadata.phone_number" className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                ref={register({ pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/ })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                disabled={formProcessing}
                placeholder="800-500-2323"
                name="user_metadata.phone_number">
              </input>
              {errors.user_metadata?.phone_number && <p className="text-red-500 text-xs italic">Phone number not required, but must be formatted correctly: 123-123-1234</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="user_metadata.address.street" className="block text-gray-700 text-sm font-bold mb-2">
                Street
              </label>
              <input
                ref={register({ required: true })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                disabled={formProcessing}
                placeholder="123 Main St."
                name="user_metadata.address.street">
              </input>
              {errors.user_metadata?.address.street && <p className="text-red-500 text-xs italic">Address Required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="user_metadata.address.city" className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                ref={register({ required: true })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                disabled={formProcessing}
                placeholder="Columbus"
                name="user_metadata.address.city">
              </input>
              {errors.user_metadata?.address.city && <p className="text-red-500 text-xs italic">City Required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="user_metadata.address.state" className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input
                ref={register({ required: true })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                disabled={formProcessing}
                placeholder="OH"
                name="user_metadata.address.state">
              </input>
              {errors.user_metadata?.address.state && <p className="text-red-500 text-xs italic">State Required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="user_metadata.address.zip" className="block text-gray-700 text-sm font-bold mb-2">
                Zip Code
              </label>
              <input
                ref={register({ required: true })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                disabled={formProcessing}
                placeholder="43081"
                name="user_metadata.address.zip">
              </input>
              {errors.user_metadata?.address.zip && <p className="text-red-500 text-xs italic">Zip code Required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                ref={register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                disabled={formProcessing}
                type="text"
                name="email">
              </input>
              {identity.pendingEmailUpdate && <p className="text-red-500 text-xs italic">Pending email update to {identity.pendingEmailUpdate}; please check your inbox or <a className="text-blue-500 underline" onClick={reSendEmailChangeConfirmation}>resend confirmation</a>. </p>}
              {errors.email && <p className="text-red-500 text-xs italic">Email is required, use correct format</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                ref={register()}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                disabled={formProcessing}
                name="password"
                type="password"
                placeholder="******************">
              </input>
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                New Password (Repeat)
              </label>
              <input
                ref={register({ validate: value => value === watch('password') })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                disabled={formProcessing}
                name="confirmPassword"
                type="password"
                placeholder="******************">
              </input>
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">Passwords Must Match</p>}
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
