// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "useRepeatable",
  tagline: "React hook and component for easy repeating elements",
  url: "https://userepeatable.goodwork.sg",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "the-good-work", // Usually your GitHub org/user name.
  projectName: "use-repeatable", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/the-good-work/use-repeatable/tree/master/website",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        // title: "useRepeatable",
        // style: "primary",

        logo: {
          alt: "use Repeatable",
          src: "img/logo/logotype-horizontal.png",
          srcDark: "img/logo/logotype-horizontal-darkmode.png",
          // className: "navbar-logo",
        },

        items: [
          {
            position: "left",
            label: "npm",
            href: "https://www.npmjs.com/package/@thegoodwork/use-repeatable",
          },
          { to: "/example", label: "Examples", position: "left" },
          { to: "/docs/getting-started", label: "Docs", position: "left" },
          {
            href: "https://github.com/the-good-work/use-repeatable",
            label: "GitHub",
            position: "right",
          },
        ],
      },

      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      footer: {
        style: "light",

        logo: {
          src: "img/logo/gw-by-gw.png",
          width: "300px",
          style: { position: "right" },
          // srcDark: "img/logo/gw-by-gw-white.png",
        },

        links: [
          {
            title: "Docs",
            items: [
              {
                label: "npm",
                href: "https://www.npmjs.com/package/@thegoodwork/use-repeatable",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/the-good-work/use-repeatable",
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
