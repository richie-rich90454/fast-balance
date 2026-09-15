import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'fast-balance',
    description: 'Exact-arithmetic chemical equation balancer: redox, charges, hydrates, isotopes, nuclear mode.',
    base: '/fast-balance/',
    cleanUrls: true,

    vite: {
        publicDir: '.vitepress/public',
    },

    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/fast-balance/logo-light.svg' }],
        ['meta', { name: 'theme-color', content: '#9a6700' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: 'fast-balance | Chemical Equation Balancer' }],
        ['meta', { name: 'twitter:description', content: 'Exact-arithmetic chemical equation balancer: redox, charges, hydrates, isotopes, nuclear mode.' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'fast-balance | Chemical Equation Balancer' }],
        ['meta', { property: 'og:description', content: 'Exact-arithmetic chemical equation balancer: redox, charges, hydrates, isotopes, nuclear mode.' }],
        ['meta', { property: 'og:url', content: 'https://richie-rich90454.github.io/fast-balance/' }],
        ['meta', { name: 'keywords', content: 'chemistry, chemical equation, balancer, stoichiometry, redox, isotope, nuclear, chemistry library, javascript, typescript' }],
    ],

    themeConfig: {
        logo: '/logo-light.svg',

        nav: [
            { text: 'Guide', link: '/' },
            { text: 'Installation', link: '/installation' },
            { text: 'Demo', link: '/demo' },
            { text: 'Examples', link: '/examples' },
            {
                text: 'API Reference',
                items: [
                    { text: 'API Reference', link: '/api-reference' },
                    { text: 'Notation', link: '/notation' },
                ],
            },
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Introduction', link: '/' },
                    { text: 'Installation', link: '/installation' },
                    { text: 'Demo', link: '/demo' },
                    { text: 'Examples', link: '/examples' },
                ],
            },
            {
                text: 'API Reference',
                items: [
                    { text: 'API Reference', link: '/api-reference' },
                    { text: 'Notation', link: '/notation' },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/richie-rich90454/fast-balance' },
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present fast-balance contributors',
        },

        editLink: {
            pattern: 'https://github.com/richie-rich90454/fast-balance/edit/main/docs/:path',
            text: 'Edit this page on GitHub',
        },

        search: {
            provider: 'local',
        },
    },

    sitemap: {
        hostname: 'https://richie-rich90454.github.io/fast-balance/',
    },

    lastUpdated: true,
});
