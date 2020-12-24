const fetch = require('node-fetch')

exports.handler = async (event, context) => {

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
