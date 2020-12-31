import React from "react"
import Layout from "../components/Layout"
import PrivateContent from '../components/PrivateContent'

export default () => {
  return (
    <Layout>
      <PrivateContent
        as={MembersDashboard}
        callbackPath="/members/"
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
          <p className="px-4 mt-8 text-xl text-gray-700 sm:mt-8">
            Congratulations! You've made it to 'member' status. Yay! 😎
          </p>
          <p className="px-4 mt-8 text-xl text-gray-700 sm:mt-8">
            There's not actually much here, but the <em>ONLY</em> way you
              can see it is by logging in and having the `member` role set for
              your user! (Something you generally can't just click a button
              for ordinarily)
          </p>
        </div>
      </div>
    </main>
  )
}
