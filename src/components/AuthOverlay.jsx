import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

import { useIdentityContext } from 'react-netlify-identity-gotrue'
import LoginForm from './LoginForm'

const AuthOverlay = () => {
  const identity = useIdentityContext()

  const { register, handleSubmit, errors } = useForm()
  const [formError, setFormError] = useState()
  const [formProcessing, setFormProcessing] = useState(false)
  const [forceShowOverlay, setForceShowOverlay] = useState(false)

  useEffect(() => {
    if (identity.provisionalUser) {
      setForceShowOverlay('Please check your email for an account confirmation email!')
      const timeoutId = setTimeout(() => setForceShowOverlay(false), 5000)
      return () => clearTimeout(timeoutId)
    }
  }, [identity.provisionalUser])

  const onSubmit = async (data) => {
    setFormProcessing(true)
    setFormError()

    await identity.completeUrlTokenTwoStep(data)
      .catch(_ => setFormError('Having an issue.. please try later'))

    setFormProcessing(false)
  }

  return (
    <>
      {(identity.urlToken || forceShowOverlay) &&
        <div className="w-full h-full fixed block top-0 left-0 bg-gray-200 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="w-full p-4 max-w-xs opacity-100 bg-white shadow-xl rounded-lg">

            {identity.urlToken?.type === "confirmation" &&
              <p>Confirming User...</p>
            }
            {identity.urlToken?.type === "email_change" && (
              identity.user
                ? <p>Changing Email...</p>
                : <>
                  <p>In order to confirm your email change, you must log in with your prior credentials.</p>
                  <LoginForm />
                </>
            )}
            {forceShowOverlay &&
              <p>{forceShowOverlay}</p>
            }
            {(identity.urlToken?.type === "passwordRecovery" || identity.urlToken?.type === "invite") &&
              <>
                {identity.urlToken.type === "passwordRecovery" &&
                  <h2>Reset Password</h2>
                }
                {identity.urlToken.type === "invite" &&
                  <>
                    <h2>Welcome</h2>
                    <p className="mb-0">Let's complete the rest of your account info</p>
                  </>
                }
                <form className="pt-6" onSubmit={handleSubmit(onSubmit)}>
                  {identity.urlToken.type === "invite" &&
                    <div className="mb-2">
                      <label htmlFor="user_metadata.full_name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                      </label>
                      <input
                        ref={register({ required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                        disabled={formProcessing}
                        name="user_metadata.full_name"
                        type="text"
                        placeholder="Jane Doe">
                      </input>
                      {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
                    </div>
                  }
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                      New Password
                    </label>
                    <input
                      ref={register({ required: true })}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${formProcessing && 'opacity-75'}`}
                      disabled={formProcessing}
                      name="password"
                      type="password"
                      placeholder="******************">
                    </input>
                    {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${formProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                      disabled={formProcessing}
                      type="submit">
                      Set New Password
                </button>
                  </div>
                  {formError &&
                    <div className="pt-2">
                      <p className="text-red-500 text-xs italic">Oops! We're having trouble right now.</p>
                    </div>
                  }
                </form>
              </>
            }
          </div>
        </div>
      }
    </>
  )
}

export default AuthOverlay
