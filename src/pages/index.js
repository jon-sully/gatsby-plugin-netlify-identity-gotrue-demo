import React, { useState } from "react"
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import Layout from "../components/Layout"

export default () => {
  const identity = useIdentityContext()
  const [processing, setProcessing] = useState(false)

  const updateRoles = ({ add, remove }) => {
    setProcessing(true)
    identity.authorizedFetch('/api/update-role', {
      method: 'POST',
      body: JSON.stringify({
        action: add ? 'add' : 'remove',
        role: add || remove
      })
    })
      .then(identity.refreshUser)
      .finally(() => setProcessing(false))
  }

  return (
    <Layout>
      <main className="max-w-2xl flex-grow mx-auto flex flex-col justify-around">
        <div className="sm:flex sm:flex-row-reverse sm:items-center">
          <div className="sm:px-2">
            <h1 className="px-4 pt-5 text-2xl text-left text-teal-500 font-bold sm:text-3xl">
              Public Homepage
            </h1>
            <p className="px-4 mt-8 text-xl text-gray-700 sm:mt-8">
              This site exists to show you (both in code and UX) how to use the
              <br /><code className="text-pink-800">gatsby-plugin-netlify-identity-gotrue</code><br />gatsby plugin!
            </p>
            <p className="px-4 mt-8 text-xl text-gray-700 sm:mt-8">
              Feel free to sign up for a user account and play around. Nothing on this demo site
              is tracked or monitored, and no emails are retained beyond Netlify Identity.
            </p>
            <p className="px-4 mt-8 text-xl text-gray-700 sm:mt-8">
              This site fully implements Netlify Identity - creating new users, exposing workflow steps to complete
              registrations, implementing recovery emails and invite tokens, and exposing important data-points in
              React. <code className="text-pink-800">gatsby-plugin-netlify-identity-gotrue</code> is a Gatsby-specific
              wrapper for <code className="text-pink-800">react-netlify-identity-gotrue</code>, which is written exclusively
              in React (Hooks) and carries <em>no</em> dependencies.
            </p>
            {identity.user &&
              <div className="pt-8 flex justify-around">
                {!identity.user.app_metadata?.roles?.includes('member') &&
                  <button
                    className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                    disabled={processing}
                    onClick={() => updateRoles({ add: 'member' })}
                  >
                    Make me a Member!
                  </button>
                }
                {identity.user.app_metadata?.roles?.includes('member') &&
                  <button
                    className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                    disabled={processing}
                    onClick={() => updateRoles({ remove: 'member' })}
                  >
                    Revoke Member!
                  </button>
                }
                {!identity.user.app_metadata?.roles?.includes('admin') &&
                  <button
                    className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                    disabled={processing}
                    onClick={() => updateRoles({ add: 'admin' })}
                  >
                    Make me an Admin!
                  </button>
                }
                {identity.user.app_metadata?.roles?.includes('admin') &&
                  <button
                    className={`bg-blue-500 text-white p-2 m-2 rounded text-m font-bold ${processing && 'opacity-50'}`}
                    disabled={processing}
                    onClick={() => updateRoles({ remove: 'admin' })}
                  >
                    Revoke Admin!
                  </button>
                }
              </div>
            }
          </div>
        </div>
      </main>
    </Layout>
  )
}
