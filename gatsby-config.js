const resolveConfig = require("tailwindcss/resolveConfig")
const tailwindConfig = require("./tailwind.config.js")

const { theme } = resolveConfig(tailwindConfig)

module.exports = {
  siteMetadata: {
    title: "Gatsby Plugin Netlify Identity GoTrue Demo",
    author: "Jon Sullivan",
    description: "Netlify Identity + Gatsby has never been easier",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Plugin Netlify Identity GoTrue Demo",
        short_name: "Gatsby-Identity-Demo",
        start_url: "/",
        background_color: theme.colors.white,
        theme_color: theme.colors.teal[500],
        icon: "static/icon.svg",
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-identity-gotrue',
      options: {
        url: 'https://gatsby-identity-demo.jonsully.net'
      }
    },
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`],
      },
    }
  ],
}
