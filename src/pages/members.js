import React from "react"
import Layout from "../components/Layout"
import PrivateContent from '../components/PrivateContent'

export default () => {
  return (
    <Layout>
      <PrivateContent
        as={MembersDashboard}
        callbackPath="/members"
        rolesAllowed={['member']}
      />
    </Layout>
  )
}

const MembersDashboard = () => {
  return (
    <main className="max-w-2xl flex-grow mx-auto flex flex-col justify-around">
      <div className="sm:flex sm:flex-row-reverse sm:items-center">
        <div className="sm:px-2">
          <h1 className="px-4 pt-5 text-2xl text-left text-teal-500 font-bold sm:text-3xl">
            Members Dashboard
          </h1>
        </div>
      </div>
    </main>
  )
}
