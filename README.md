# Gatsby Plugin Netlify Identity GoTrue Demo

### See it in action! ✨ https://gatsby-id-demo.jonsully.net ✨

---

This repository is the source behind https://gatsby-id-demo.jonsully.net - a demo website that shows off the deep integration possibilities behind using Netlify Identity with [`gatsby-plugin-netlify-identity-gotrue`][1]. For documentation on the `identity` API used throughout this application, see [`react-netlify-identity-gotrue`][2] - the underlying library that [`gatsby-plugin-netlify-identity-gotrue`][1] just wraps to add Gatsby-specific bindings.

Here are a few features this site implements to prove out a fully working use-case of an expressive Identity suite:

- Sign up and automatic email workflow
  - When a user signs up with the public sign-up form, the subsequent account confirmation email they will receive contains a link. Upon clicking that link, [`gatsby-plugin-netlify-identity-gotrue`][1] will automatically process and confirm the account without any additional effort from the Gatsby-site developer.
  - This also works for Netlify's Invite workflow, where a user is invited to join the site from Netlify's admin UI. In this case, the `identity.urlToken` will be exposed with a `identity.urlToken.type` of `'invite'`. This is because completing a site invitation requires more than just clicking a link! The user needs to configure their password (and any other information you're wanting to store on their account; full name, phone number, etc.). You can read more about this workflow in the [`react-netlify-identity-gotrue`][2] docs. You can also see how this two-step workflow is implemented in [src/components/AuthOverlay.jsx](src/components/AuthOverlay.jsx).
- Refreshed, authorized requests out of the box
  - Any request made to a Netlify Function can be made with `identity.authorizedFetch` (a small wrapper around `fetch`) in order to gain `clientContext` in the Function (an automatic and secure way to guarantee that the User calling the Function is who they say they are)!
- Built-in PrivateContent guarding and callback behavior without complex client-side routing
  - The [src/components/PrivateContent.jsx](src/components/PrivateContent.jsx) and [src/components/LoginForm.jsx](src/components/LoginForm.jsx) components work together to provide a fantastic user experience for ensuring that content is only viewable by those with permissions to see it! Adding authorized Functions to the mix means tons of flexibility for safe-guarding content and tools to _only_ those who should be able to access them

And much more! Play around on the site and then give the code a read to understand how the `identity` API provides fully-featured Auth with simplified Gatsby code 😁

---

The demo site itself is based on the Gatsby Tailwind Starter and leverages a semi-transparent overlay to coerce the user into completing a few key auth steps (like when they click the "Reset your password" link from email - they need to reset their password before doing anything else) but this could be accomplished using Gatsby `navigate` or otherwise rather than an overlay too. 

---

#### Note ❗

**This repository, the underlying [`gatsby-plugin-netlify-identity-gotrue`][1] repository, and its underlying [`react-netlify-identity-gotrue`][2] repository are _not_ related to Netlify's [`netlify-identity-widget`][3] stack _or_ @sw-yx's [`react-netlify-identity`][4] stack, both of which ultimately sit on [`gotrue-js`][5]. *This* stack is written in pure React and interfaces with Netlify Identity directly without any dependencies. You can read some history about the three stacks here: https://jonsully.net/blog/announcing-react-netlify-identity-gotrue.**

[2]:https://github.com/jon-sully/react-netlify-identity-gotrue
[3]:https://github.com/netlify/netlify-identity-widget
[4]:https://github.com/netlify-labs/react-netlify-identity
[5]:https://github.com/netlify/gotrue-js

[1]: https://github.com/jon-sully/gatsby-plugin-netlify-identity-gotrue