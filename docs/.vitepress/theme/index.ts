import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import BalanceDemo from "../components/BalanceDemo.vue";
import "./custom.css";
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component("BalanceDemo", BalanceDemo);
    },
} satisfies Theme;
