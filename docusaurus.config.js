// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "MetaCall Docs",
  tagline: "Documentation for MetaCall",
  favicon: "img/metacall-logo.png",

  // Set the production url of your site here
  url: "https://github.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/doc/",

  // GitHub pages deployment config.
  organizationName: "metacall", // your GitHub user/org
  projectName: "doc", // repo name
  deploymentBranch: "gh-pages",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

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
          sidebarPath: "./sidebars.js",
          tagsBasePath: "tags",
          breadcrumbs: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      customCss: "./src/css/custom.css",
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Metacall Docs",
        logo: {
          alt: "My Site Logo",
          src: "img/metacall-logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
          },
          // Use "to" for internal Docusaurus routes
          {
            label: "Install",
            to: "/docs/category/installating-metacall-cli",
            position: "left",
          },
          {
            label: "Tutorials",
            to: "/docs/category/tutorials",
            position: "left",
          },
          {
            href: "/starred",
            label: "⭐ Stars",
            position: "right",
          },
          {
            href: "https://github.com/metacall",
            label: "GitHub",
            position: "right",
          },
        ],
      },

      footer: {
        style: "dark",
        links: [
          {
            title: "Intro",
            items: [
              { label: "Getting Started", to: "/docs/getting-started" },
              {
                label: "Install",
                to: "/docs/category/installating-metacall-cli",
              },
            ],
          },
          {
            title: "Use MetaCall",
            items: [
              { label: "Tutorials", to: "/docs/category/tutorials" },
              { label: "Deployment", to: "/docs/deployment" },
            ],
          },
          {
            title: "Community",
            items: [
              { label: "Discord", href: "https://discord.gg/upwP4mwJWa" },
              {
                label: "Telegram",
                href: "https://t.me/joinchat/BMSVbBatp0Vi4s5l4VgUgg",
              },
              {
                label: "Matrix",
                href: "https://matrix.to/#/#metacall:matrix.org",
              },
            ],
          },
          {
            title: "More",
            items: [
              { label: "GitHub", href: "https://github.com/metacall/" },
              {
                label: "Changelog",
                href: "https://github.com/metacall/core/releases",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MetaCall. All Rights Reserved.`,
      },

      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
      },
    }),
};

export default config;
