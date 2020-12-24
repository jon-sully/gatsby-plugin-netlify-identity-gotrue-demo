const fetch = require('node-fetch')

exports.handler = async (event, context) => {

  const { user, identity } = context.clientContext
  const { action, role } = JSON.parse(event.body)

  const userUrl = `${identity.url}/admin/users/${user.sub}`
  const adminAuthorization = `Bearer ${identity.token}`

  const currentRoles = user.app_metadata.roles || []
  console.log(`Current roles: ${currentRoles}`)
  console.log(`Action: ${action} ${role}`)
  const newRoles = action == 'add'
    ? currentRoles.concat(role)
    : currentRoles.filter(r => r !== role)
  console.log(`New roles: ${newRoles}`)

  const payload = {
    app_metadata: {
      ...user.app_metadata,
      roles: newRoles
    }
  }

  // console.log(`payload: ${JSON.stringify(payload)}`)
  // console.log(`PUT'ing to ${userUrl}`)
  // console.log(`Auth: ${adminAuthorization}`)

  await fetch(userUrl, {
    method: 'PUT',
    headers: {
      Authorization: adminAuthorization,
    },
    body: JSON.stringify(payload)
  })
    // .then(resp => resp.json())
    // .then(user => console.log(JSON.stringify(user)))

  return {
    statusCode: 200
  }
}
