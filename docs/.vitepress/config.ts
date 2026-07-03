import { defineConfig } from 'vitepress';
export default defineConfig({
    title: "fast-balance",
    description: "Blazing fast chemical equation balancer",
    cleanUrls: true,
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
    ],
    themeConfig: {
        logo: '/logo.svg',
        nav: [
            { text: 'Guide', link: '/' },
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
        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Introduction', link: '/' },
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
        socialLinks: [
            { icon: 'github', link: 'https://github.com/richie-rich90454/fast-balance' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present fast-balance contributors'
        }
    }
});