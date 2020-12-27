# gatsby-plugin-netlify-identity-gotrue Demo

### See it in action! ✨ https://gatsby-identity-demo.jonsully.net ✨

Demo site status: [![Netlify Status](https://api.netlify.com/api/v1/badges/5aa804c6-93d0-46cb-8091-e7de647c6372/deploy-status)](https://app.netlify.com/sites/gatsby-plugin-netlify-identity-gotrue-demo/deploys)

---

This repository is the source behind https://gatsby-identity-demo.jonsully.net - a demo website that shows off the deep integration possibilities behind using Netlify Identity with [`gatsby-plugin-netlify-identity-gotrue`][1]. For documentation on the `identity` API used throughout this application, see [`react-netlify-identity-gotrue`][2] - the underlying library that [`gatsby-plugin-netlify-identity-gotrue`][1] just wraps to add Gatsby-specific bindings.

Here are a few features this site implements to prove out a fully working use-case of an expressive Identity suite:

- Sign up and automatic email workflow
  - When a user signs up with the public sign-up form, the subsequent account confirmation email they will receive contains a link. Upon clicking that link, [`gatsby-plugin-netlify-identity-gotrue`][1] will automatically process and confirm the account without any additional effort from the Gatsby-site developer.
  - This also works for Netlify's Invite workflow, where a user is invited to join the site from Netlify's admin UI. In this case, the `identity.urlToken` will be exposed with a `identity.urlToken.type` of `'invite'`. This is because completing a site invitation requires more than just clicking a link! The user needs to configure their password (and any other information you're wanting to store on their account; full name, phone number, etc.). You can read more about this workflow in the [`react-netlify-identity-gotrue`][2] docs. You can also see how this two-step workflow is implemented in [src/components/AuthOverlay.jsx](src/components/AuthOverlay.jsx).
- Refreshed, authorized requests out of the box
  - Any request made to a Netlify Function can be made with `identity.authorizedFetch` (a small wrapper around `fetch`) in order to gain `clientContext` in the Function (an automatic and secure way to guarantee that the User calling the Function is who they say they are)!
  - This site runs an Auth'd Function to automatically change a user's `role` - something only an admin can do! Check out the code [here](./serverless/update-role/update-role.js)
- Built-in PrivateContent guarding and callback behavior without complex client-side routing
  - The [src/components/PrivateContent.jsx](src/components/PrivateContent.jsx) and [src/components/LoginForm.jsx](src/components/LoginForm.jsx) components work together to provide a fantastic user experience for ensuring that content is only viewable by those with permissions to see it! Adding authorized Functions to the mix means tons of flexibility for safe-guarding content and tools to _only_ those who should be able to access them. Yay authentication and authorization! 💯
- Expressive, definable freedom for values set by/on each user
  - The `user` objects used across Netlify Identity and [`gatsby-plugin-netlify-identity-gotrue`][1] are flexible and can include all sorts of custom data. This demo displays those capabilities by having a user's phone number and address be part of the `user` object, but we can put anything we'd like in there.
  - NOTE: Remember that any data the `user` object contains _can_ ultimately be seen my the client. That which is in `user_metadata` can be _edited_ by the client directly (conveniently via [`gatsby-plugin-netlify-identity-gotrue`][1]'s `.update()`, I might add) and that which is in `app_metadata` can only be edited via an Authorized Function (similar to how the user `roles` are edited by this demo's Functions) or from the Netlify Admin UI (which only exposes `roles` for editing anyway)

And much more! Play around on the site and then give the code a read to understand how the `identity` API provides fully-featured Auth with simplified Gatsby code 😁

---

The demo site itself is based on the Gatsby Tailwind Starter and leverages a semi-transparent overlay to coerce the user into completing a few key auth steps (like when they click the "Reset your password" link from email - they need to reset their password before doing anything else) but this could be accomplished using Gatsby `navigate` or other methods. [`gatsby-plugin-netlify-identity-gotrue`][1] does _not_ enforce, imply, or encourage any particular _display_ layer. It remains un-opinionated and doesn't contain any display logic to begin with.

---

#### Note ❗

**This repository, the underlying [`gatsby-plugin-netlify-identity-gotrue`][1] repository, and its underlying [`react-netlify-identity-gotrue`][2] repository are _not_ related to Netlify's [`netlify-identity-widget`][3] stack _or_ @sw-yx's [`react-netlify-identity`][4] stack, both of which ultimately sit on [`gotrue-js`][5]. *This* stack is written in pure React and interfaces with Netlify Identity directly without any dependencies. You can read some history about the three stacks here: https://jonsully.net/blog/announcing-react-netlify-identity-gotrue.**

[2]:https://github.com/jon-sully/react-netlify-identity-gotrue
[3]:https://github.com/netlify/netlify-identity-widget
[4]:https://github.com/netlify-labs/react-netlify-identity
[5]:https://github.com/netlify/gotrue-js

[1]: https://github.com/jon-sully/gatsby-plugin-netlify-identity-gotrue
