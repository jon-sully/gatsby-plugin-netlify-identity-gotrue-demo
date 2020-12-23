import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity-gotrue'

// Component wrapper with optional role-specificity and optional redirect (otherwise
// just shows the unauthorized message)

// Allows the following features:
// - For logged out folks, this component's rendering should force a redirect to /login
//   with a callback so that after the user logs in, they will be pushed back to the content
// - For logged in folks that don't meet the role-gating requirements, the 'Unauthorized'
//   message should be displayed 
const PrivateContent = ({ as: Comp, rolesAllowed, callbackPath, ...props }) => {
  const identity = useIdentityContext()

  return (
    identity.user
      ? ((rolesAllowed && rolesAllowed.some(r => identity.user?.app_metadata?.roles?.indexOf(r) >= 0)) || !rolesAllowed)
        ? <Comp {...props} />
        : <Unauthorized />
      : <Unauthorized callbackPath={callbackPath} />

  )
}


const Unauthorized = ({ callbackPath }) => {

  useEffect(() => {
    callbackPath && navigate('/login', { state: { navigateTarget: callbackPath } })
  }, [callbackPath])

  return (
    callbackPath
      ? <> </>
      : <div>
        <p>Unauthorized</p>
        <p>You may not view this content</p>
      </div>
  )
}

export default PrivateContent
