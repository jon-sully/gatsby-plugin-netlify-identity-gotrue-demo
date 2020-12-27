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
      .signup(data)
      .then(() => {
        setSigningUp(false)
        navigate('/')
      })
      .catch(e => {
        setFormError(e.message)
        setSigningUp(false)
      })
  }

  return (
    <Layout>
      <div className="flex flex-col w-full items-center">
        <p className="px-4 mt-8 text-xl text-gray-700 sm:mt-8 max-w-2xl">
          This form is an example of Netlify Identity's ability to leverage custom data on users. Feel free
          to sign up - it is fully functional, but do feel free to also put in fake information. While the
          information entered here is secure and dumped into oblivion, the validations are a proof-of-functionality
          and need not be heeded with legitimate data.
        </p>
      </div>
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
              : <div className="w-full max-w-2xl">
                <form className="pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>

                  <div className="mb-4">
                    <label htmlFor="user_metadata.full_name" className="block text-gray-700 text-sm font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      ref={register({ required: true })}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
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
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
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
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
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
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
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
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
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
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
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
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${signingUp && 'disabled'}`}
                      type="text"
                      placeholder="johnny@apple.com"
                      name="email">
                    </input>
                    {errors.email && <p className="text-red-500 text-xs italic">Email is required, use correct format</p>}
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
