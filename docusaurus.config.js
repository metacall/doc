// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

const { themes } = require("prism-react-renderer");
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MetaCall Tutorial',
  tagline: 'Documentation for MetaCall',
  favicon: 'img/metacall-logo.png',
  organizationName: "MetaCall",

  // Set the production url of your site here
  url: 'https://github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/doc/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'metacall', // Usually your GitHub org/user name.
  projectName: 'doc', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          
          
          tagsBasePath: "tags",
          breadcrumbs: true, 
          
          
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      customCss: './src/css/custom.css', // Correct placement for customCss
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Metacall Docs',
        logo: {
          alt: 'My Site Logo',
          src: 'img/metacall-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            label: "Install",
            href: "/docs/category/installating-metacall-cli",
            position: "left",
          },
          {
            label: "Tutorials",
            href: "/docs/category/tutorials",
            position: "left",
          },
          {
            href: 'https://github.com/metacall',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
     
      footer: {
        style: "dark",
        links: [
          {
            title: "Intro",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "Install",
                to: "/docs/category/installating-metacall-cli",
              },
              
            ],
          },
          {
            title: "Use MetaCall",
            items: [
              {
                label: "Configuration",
                to: "/docs/running-bracket/configuration",
              },
              {
                label: "Deployment",
                to: "/docs/deployment",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Examples",
                to: "/docs/community/contributing",
              },
              {
                label: "Developing",
                to: "/docs/community/development",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/metacall/",
              },
             
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