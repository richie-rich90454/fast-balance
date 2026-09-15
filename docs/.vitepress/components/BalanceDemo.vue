<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { balance } from "fast-balance";
import type { BalanceResult } from "fast-balance";

const inputEquation = ref("H2 + O2 -> H2O");
const selectedFormat = ref<"text" | "html" | "latex">("text");
const showOne = ref(true);
const result = ref<BalanceResult | null>(null);
const error = ref<string | null>(null);

let balanceTimeout: ReturnType<typeof setTimeout> | null = null;

const debouncedBalance = () => {
    error.value = null;

    if (balanceTimeout) {
        clearTimeout(balanceTimeout);
    }

    balanceTimeout = setTimeout(() => {
        const raw = inputEquation.value.trim();
        if (!raw) {
            result.value = null;
            return;
        }

        try {
            result.value = balance(raw, {
                format: selectedFormat.value,
                showOne: showOne.value,
            });
            error.value = null;
        } catch (e) {
            result.value = null;
            error.value = e instanceof Error ? e.message : "Failed to balance equation";
        }
    }, 150);
};

watch([inputEquation, selectedFormat, showOne], debouncedBalance);

const examples = [
    { label: "Synthesis", equation: "H2 + O2 -> H2O" },
    { label: "Combustion + N2", equation: "C3H8 + O2 + N2 -> CO2 + H2O + N2" },
    { label: "Redox", equation: "MnO4- + H+ + e- -> Mn2+ + H2O" },
    { label: "Complex ion", equation: "[Cu(NH3)4]2+ + Cl- -> [Cu(NH3)4]Cl2" },
    { label: "Underdetermined", equation: "C + O2 -> CO + CO2" },
    { label: "Unicode", equation: "H₂ + O₂ -> H₂O" },
    { label: "Complex", equation: "Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO" },
];

const loadExample = (equation: string) => {
    inputEquation.value = equation;
};

const arrowMarkup = computed(() => {
    switch (selectedFormat.value) {
        case "html":
            return "&rarr;";
        case "latex":
            return "\\rightarrow";
        default:
            return "->";
    }
});

const isExampleActive = (equation: string) => inputEquation.value.trim() === equation;

debouncedBalance();
</script>

<template>
    <div class="balance-demo fb-card">
        <div class="toolbar">
            <div class="toolbar-group">
                <label for="format-select" class="fb-form-label">Output format</label>
                <select id="format-select" v-model="selectedFormat" class="fb-select format-select">
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="latex">LaTeX</option>
                </select>
            </div>

            <div class="toolbar-group checkbox-group">
                <label class="fb-checkbox">
                    <input type="checkbox" v-model="showOne" />
                    <span class="fb-checkbox__mark"></span>
                    <span>Show coefficient of 1</span>
                </label>
            </div>
        </div>

        <div class="input-section">
            <div class="label-row">
                <span
                    class="fb-icon demo-icon fb-icon--mask"
                    style="--fb-icon: url(&quot;/icons/flask.svg&quot;)"
                    role="img"
                    aria-label="Equation"
                ></span>
                <label for="equation-input" class="fb-form-label">Chemical equation</label>
            </div>

            <textarea
                id="equation-input"
                v-model="inputEquation"
                placeholder="H2 + O2 -> H2O"
                rows="3"
                class="fb-input fb-input--mono equation-input"
            ></textarea>

            <p class="fb-helper-text">
                Use -> to separate reactants and products. Charges: Fe2+, SO4^2-. Groups: Ca3(PO4)2.
            </p>

            <p v-if="error" class="fb-error-message" role="alert">{{ error }}</p>
        </div>

        <div class="examples-section">
            <div class="examples-row">
                <button
                    v-for="example in examples"
                    :key="example.equation"
                    type="button"
                    class="fb-chip"
                    :class="{ 'fb-chip--active': isExampleActive(example.equation) }"
                    @click="loadExample(example.equation)"
                >
                    {{ example.label }}
                </button>
            </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
            <div v-if="result" class="result-section fb-card">
                <div class="result-header">
                    <span
                        class="fb-icon demo-icon fb-icon--mask"
                        style="--fb-icon: url(&quot;/icons/reaction-arrow.svg&quot;)"
                        role="img"
                        aria-label="Balanced equation"
                    ></span>
                    <span class="fb-form-label result-title">Balanced equation</span>
                </div>

                <div class="equation-output">
                    <code
                        v-if="selectedFormat === 'html'"
                        class="chemical-formula"
                        v-html="result.equation"
                    ></code>
                    <code v-else class="chemical-formula">{{ result.equation }}</code>
                </div>

                <p v-if="result.underdetermined" class="fb-helper-text">
                    Multiple independent balances exist — showing the minimal one.
                </p>
                <p v-if="result.warnings && result.warnings.length" class="fb-helper-text">
                    {{ result.warnings.join(" ") }}
                </p>

                <div class="breakdown">
                    <div class="breakdown-side">
                        <span class="breakdown-title">Reactants</span>
                        <template
                            v-for="(species, index) in result.reactants"
                            :key="species.formula + '-r'"
                        >
                            <span v-if="index > 0" class="plus">+</span>
                            <span class="coefficient">{{ species.coefficient }}</span>
                            <code class="chemical-formula">{{ species.formula }}</code>
                        </template>
                    </div>

                    <span class="arrow" v-html="arrowMarkup"></span>

                    <div class="breakdown-side">
                        <span class="breakdown-title">Products</span>
                        <template
                            v-for="(species, index) in result.products"
                            :key="species.formula + '-p'"
                        >
                            <span v-if="index > 0" class="plus">+</span>
                            <span class="coefficient">{{ species.coefficient }}</span>
                            <code class="chemical-formula">{{ species.formula }}</code>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.balance-demo {
    display: flex;
    flex-direction: column;
    gap: var(--fb-spacing-05);
}

.toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--fb-spacing-05);
    align-items: flex-end;
}

.toolbar-group {
    display: flex;
    flex-direction: column;
    gap: var(--fb-spacing-02);
    min-width: 160px;
}

.checkbox-group {
    justify-content: flex-end;
    padding-bottom: var(--fb-spacing-01);
}

.format-select {
    min-width: 140px;
}

.label-row {
    display: flex;
    align-items: center;
    gap: var(--fb-spacing-02);
    margin-bottom: var(--fb-spacing-02);
}

.label-row .fb-form-label {
    margin-bottom: 0;
}

.demo-icon {
    width: 20px;
    height: 20px;
    color: var(--fb-text-secondary);
}

.equation-input {
    height: auto;
    min-height: 96px;
    padding: var(--fb-spacing-04);
    resize: vertical;
}

.examples-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--fb-spacing-03);
}

.result-section {
    background: var(--fb-layer-01);
}

.result-header {
    display: flex;
    align-items: center;
    gap: var(--fb-spacing-03);
    margin-bottom: var(--fb-spacing-04);
}

.result-title {
    margin-bottom: 0;
}

.equation-output {
    margin-bottom: var(--fb-spacing-05);
    min-width: 0;
}

.equation-output .chemical-formula {
    display: inline-block;
    font-size: var(--fb-body-large);
    padding: var(--fb-spacing-04);
    max-width: 100%;
    overflow-wrap: anywhere;
    word-break: break-word;
    white-space: normal;
}

.breakdown {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--fb-spacing-05);
    align-items: center;
}

.breakdown-side {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--fb-spacing-03);
    min-width: 0;
}

.chemical-formula {
    overflow-wrap: anywhere;
    word-break: break-word;
    max-width: 100%;
}

.breakdown-title {
    width: 100%;
    font-size: var(--fb-caption);
    font-weight: 600;
    color: var(--fb-text-helper);
    text-transform: uppercase;
    letter-spacing: 0.01em;
    margin-bottom: var(--fb-spacing-02);
}

.coefficient {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 var(--fb-spacing-02);
    background: var(--fb-background);
    border: 1px solid var(--fb-border-subtle);
    border-radius: var(--fb-radius-sm);
    font-size: var(--fb-caption);
    font-weight: 600;
    color: var(--fb-text-primary);
}

.plus {
    color: var(--fb-text-helper);
    font-weight: 500;
}

.arrow {
    font-family: var(--fb-font-mono);
    font-size: var(--fb-body-large);
    color: var(--fb-text-secondary);
    padding: 0 var(--fb-spacing-02);
}

@media (max-width: 640px) {
    .toolbar {
        flex-direction: column;
        align-items: stretch;
    }

    .toolbar-group {
        min-width: auto;
    }

    .breakdown {
        grid-template-columns: 1fr;
        gap: var(--fb-spacing-04);
    }

    .arrow {
        justify-self: start;
        padding: 0;
    }
}
</style>
