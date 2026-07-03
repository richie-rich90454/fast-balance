import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "fast-balance",
    description: "Blazing fast chemical equation balancer - handles complex formulas, redox, charges, hydrates, all arrow styles",
    base: '/fast-balance/',
    cleanUrls: true,

    vite: {
        publicDir: '.vitepress/public'
    },

    // Head configuration for SEO and deployment
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: 'fast-balance | Chemical Equation Balancer' }],
        ['meta', { name: 'twitter:description', content: 'Blazing fast chemical equation balancer - handles complex formulas, redox, charges, hydrates, all arrow styles' }],
        ['meta', { name: 'twitter:image', content: '/fast-balance/logo.svg' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'fast-balance | Chemical Equation Balancer' }],
        ['meta', { property: 'og:description', content: 'Blazing fast chemical equation balancer - handles complex formulas, redox, charges, hydrates, all arrow styles' }],
        ['meta', { property: 'og:image', content: '/fast-balance/logo.svg' }],
        ['meta', { property: 'og:url', content: 'https://richie-rich90454.github.io/fast-balance/' }],
        ['meta', { name: 'keywords', content: 'chemistry, chemical equation, balancer, stoichiometry, redox, chemical reaction, equation balancing, chemistry library, javascript, typescript' }]
    ],

    // Theme configuration
    themeConfig: {
        logo: '/logo.svg',

        // Navigation
        nav: [
            { text: 'Guide', link: '/' },
            { text: 'Installation', link: '/installation' },
            { text: 'Demo', link: '/demo' },
            { text: 'Examples', link: '/examples' },
            {
                text: 'API Reference',
                items: [
                    { text: 'API Reference', link: '/api-reference' },
                    { text: 'Notation', link: '/notation' }
                ]
            }
        ],

        // Sidebar
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Introduction', link: '/' },
                    { text: 'Installation', link: '/installation' },
                    { text: 'Demo', link: '/demo' },
                    { text: 'Examples', link: '/examples' }
                ]
            },
            {
                text: 'API Reference',
                items: [
                    { text: 'API Reference', link: '/api-reference' },
                    { text: 'Notation', link: '/notation' }
                ]
            }
        ],

        // Social links
        socialLinks: [
            { icon: 'github', link: 'https://github.com/richie-rich90454/fast-balance' }
        ],

        // Footer
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present fast-balance contributors'
        },

        // Edit link
        editLink: {
            pattern: 'https://github.com/richie-rich90454/fast-balance/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },

        // Search
        search: {
            provider: 'local'
        }
    },

    // Sitemap for SEO
    sitemap: {
        hostname: 'https://richie-rich90454.github.io/fast-balance/'
    },

    // Last updated
    lastUpdated: true
});