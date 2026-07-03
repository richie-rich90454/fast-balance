import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import BalanceDemo from '../components/BalanceDemo.vue';
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('BalanceDemo', BalanceDemo);
    }
} satisfies Theme;