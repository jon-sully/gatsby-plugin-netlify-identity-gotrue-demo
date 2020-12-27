const fetch = require('node-fetch')

exports.handler = async (event, context) => {

  // When you make a request to a Netlify Function using identity.authorizedFetch()
  // client-side, context.clientContext becomes available in the function (here),
  // and contains the user object, which is the verified, authorized user that is
  // calling the function. This is validated with the JWT signing key used by GoTrue
  // so if the .user object is there, we can know for certain that the calling client
  // is indeed the authorized user. Yay!
  const { user, identity } = context.clientContext
  const { action, role } = JSON.parse(event.body)

  const userUrl = `${identity.url}/admin/users/${user.sub}`
  const adminAuthorization = `Bearer ${identity.token}`

  const currentRoles = user.app_metadata.roles || []
  const newRoles = action === 'add'
    ? currentRoles.concat(role)
    : currentRoles.filter(r => r !== role)

  const payload = {
    app_metadata: {
      ...user.app_metadata,
      roles: newRoles
    }
  }

  // Conversely to above, we can leverage the 'admin' abilities granted to Functions
  // to make admin-level changes to users in our Netlify Identity instance. This is
  // similar to logging into the Netlify UI and manually adding or removing a role.
  //
  // See this thread for more info on what the 'admin' context means:
  // https://community.netlify.com/t/questions-about-netlify-identity-serverless-functions/20755/13?u=jonsully
  await fetch(userUrl, {
    method: 'PUT',
    headers: {
      Authorization: adminAuthorization,
    },
    body: JSON.stringify(payload)
  })

  return {
    statusCode: 200
  }
}
