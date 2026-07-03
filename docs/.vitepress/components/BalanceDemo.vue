<script setup lang="ts">
import { ref, watch } from 'vue';
import { balance } from 'fast-balance';
const equation = ref('H2 + O2 -> H2O');
const format = ref<'text' | 'html' | 'latex'>('text');
const showOne = ref(true);
const result = ref('');
const error = ref('');
const balanceEquation = () => {
    if (!equation.value.trim()) {
        result.value = '';
        error.value = '';
        return;
    }
    try {
        const balanced = balance(equation.value, {
            showOne: showOne.value,
            format: format.value
        });
        result.value = balanced.equation;
        error.value = '';
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to balance equation';
        result.value = '';
    }
};
watch([equation, format, showOne], () => {
    balanceEquation();
});
const examples = [
    'H2 + O2 -> H2O',
    'Fe + O2 -> Fe2O3',
    'C3H8 + O2 -> CO2 + H2O',
    'MnO4- + H+ + e- -> Mn2+ + H2O',
    'Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO'
];
const loadExample = (example: string) => {
    equation.value = example;
};
</script>
<template>
    <div class="balance-demo">
        <div class="input-section">
            <label for="equation-input">Chemical Equation:</label>
            <textarea
                id="equation-input"
                v-model="equation"
                placeholder="Enter a chemical equation (e.g., H2 + O2 -> H2O)"
                rows="3"
            ></textarea>
        </div>
        <div class="examples-section">
            <span class="examples-label">Try these examples:</span>
            <div class="examples-list">
                <button
                    v-for="example in examples"
                    :key="example"
                    @click="loadExample(example)"
                    class="example-btn"
                >
                    {{ example }}
                </button>
            </div>
        </div>
        <div class="options-section">
            <div class="option-group">
                <label for="format-select">Output Format:</label>
                <select id="format-select" v-model="format">
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="latex">LaTeX</option>
                </select>
            </div>
            <div class="option-group">
                <label>
                    <input type="checkbox" v-model="showOne" />
                    Show coefficient of 1
                </label>
            </div>
        </div>
        <div v-if="error" class="error-section">
            <p class="error-message">{{ error }}</p>
        </div>
        <div v-if="result" class="result-section">
            <label>Balanced Equation:</label>
            <div v-if="format === 'html'" class="result-display" v-html="result"></div>
            <div v-else class="result-display">{{ result }}</div>
        </div>
    </div>
</template>
<style scoped>
.balance-demo {
    padding: 1.5rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
}
.input-section {
    margin-bottom: 1rem;
}
.input-section label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
}
textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    resize: vertical;
}
textarea:focus {
    outline: none;
    border-color: var(--vp-c-brand-1);
}
.examples-section {
    margin-bottom: 1rem;
}
.examples-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}
.examples-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.example-btn {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
}
.example-btn:hover {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
}
.options-section {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: var(--vp-c-bg);
    border-radius: 4px;
}
.option-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.option-group label {
    font-size: 0.9rem;
    font-weight: 500;
}
select {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    font-size: 0.9rem;
    cursor: pointer;
}
select:focus {
    outline: none;
    border-color: var(--vp-c-brand-1);
}
input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
}
.error-section {
    padding: 1rem;
    background: var(--vp-c-danger-soft);
    border: 1px solid var(--vp-c-danger-1);
    border-radius: 4px;
    margin-bottom: 1rem;
}
.error-message {
    color: var(--vp-c-danger-1);
    margin: 0;
    font-weight: 500;
}
.result-section {
    padding: 1rem;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
}
.result-section label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
}
.result-display {
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    padding: 0.5rem;
    background: var(--vp-c-bg-soft);
    border-radius: 4px;
}
</style>