<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { balance } from 'fast-balance';

const equation = ref('H2 + O2 -> H2O');
const format = ref<'text' | 'html' | 'latex'>('text');
const showOne = ref(true);
const result = ref('');
const error = ref('');
const isProcessing = ref(false);
const hasChanged = ref(false);

const balanceEquation = () => {
    if (!equation.value.trim()) {
        result.value = '';
        error.value = '';
        return;
    }
    
    hasChanged.value = true;
    isProcessing.value = true;
    
    // Simulate processing delay for visual feedback
    setTimeout(() => {
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
        } finally {
            isProcessing.value = false;
            setTimeout(() => {
                hasChanged.value = false;
            }, 300);
        }
    }, 150);
};

watch([equation, format, showOne], () => {
    balanceEquation();
});

const examples = [
    { label: 'Combustion', equation: 'C3H8 + O2 -> CO2 + H2O', category: 'nonmetal' },
    { label: 'Synthesis', equation: 'Fe + O2 -> Fe2O3', category: 'metal' },
    { label: 'Redox', equation: 'MnO4- + H+ + e- -> Mn2+ + H2O', category: 'halogen' },
    { label: 'Complex', equation: 'Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO', category: 'noble-gas' }
];

const loadExample = (example: string) => {
    equation.value = example;
};

const formatTooltip = computed(() => {
    const tooltips = {
        text: 'Plain text format (e.g., 2H2 + O2 -> 2H2O)',
        html: 'HTML format with proper subscripts for web display',
        latex: 'LaTeX format for scientific documents (e.g., 2H_2 + O_2 \\rightarrow 2H_2O)'
    };
    return tooltips[format.value];
});

const showOneTooltip = 'Display coefficient "1" for single molecules (e.g., 1H2O instead of H2O)';

const processHtmlResult = (html: string) => {
    // Add chemical-formula class to styled spans
    return html.replace(/<span/g, '<span class="chemical-formula"');
};

const getCoefficientColor = (index: number) => {
    const colors = [
        'var(--chem-primary)',
        'var(--chem-secondary)',
        'var(--chem-accent)',
        'var(--chem-alkali)',
        'var(--chem-transition)'
    ];
    return colors[index % colors.length];
};
</script>

<template>
    <div class="balance-demo" :class="{ processing: isProcessing, changed: hasChanged }">
        <div class="input-section">
            <div class="section-header">
                <label for="equation-input" class="input-label">
                    Chemical Equation
                </label>
                <span class="helper-text">Enter reactants and products separated by → or -></span>
            </div>
            <div class="textarea-wrapper">
                <textarea
                    id="equation-input"
                    v-model="equation"
                    :placeholder="'Example: H2 + O2 -> H2O\nOr: Fe + O2 -> Fe2O3\nOr: CH4 + O2 -> CO2 + H2O'"
                    rows="3"
                    class="chemistry-textarea"
                    :class="{ 'has-error': error }"
                ></textarea>
                <div v-if="isProcessing" class="processing-overlay">
                    <div class="molecule-spinner"></div>
                </div>
            </div>
            <div class="input-hints">
                <span class="hint">Use arrow (→) or -> for reaction direction</span>
                <span class="hint">Support for ions (e.g., MnO4-, H+)</span>
                <span class="hint">Parentheses supported (e.g., Ca3(PO4)2)</span>
            </div>
        </div>

        <div class="examples-section">
            <div class="section-header">
                <span class="examples-label">Try these examples:</span>
            </div>
            <div class="examples-list">
                <button
                    v-for="(example, index) in examples"
                    :key="example.equation"
                    @click="loadExample(example.equation)"
                    class="example-btn"
                    :class="example.category"
                    :title="example.equation"
                >
                    <span class="example-category">{{ example.label }}</span>
                    <code class="chemical-formula">{{ example.equation }}</code>
                </button>
            </div>
        </div>

        <div class="options-section">
            <div class="option-group format-group">
                <label for="format-select" class="option-label">
                    Output Format
                </label>
                <div class="select-wrapper">
                    <select id="format-select" v-model="format" class="chemistry-select">
                        <option value="text">Plain Text</option>
                        <option value="html">HTML (with subscripts)</option>
                        <option value="latex">LaTeX</option>
                    </select>
                    <div class="select-arrow">▼</div>
                </div>
                <span class="tooltip">{{ formatTooltip }}</span>
            </div>
            
            <div class="option-group checkbox-group">
                <label class="chemistry-checkbox">
                    <input type="checkbox" v-model="showOne" />
                    <span class="checkbox-custom"></span>
                    <span class="checkbox-label">
                        Show coefficient of 1
                    </span>
                </label>
                <span class="tooltip">{{ showOneTooltip }}</span>
            </div>
        </div>

        <div v-if="error" class="error-section">
            <div class="error-icon">!</div>
            <div class="error-content">
                <p class="error-title">Balancing Error</p>
                <p class="error-message">{{ error }}</p>
            </div>
        </div>

        <div v-if="result && !error" class="result-section">
            <div class="section-header">
                <label class="result-label">
                    Balanced Equation
                </label>
            </div>
            <div class="result-card">
                <div v-if="format === 'html'" 
                     class="result-display html-result" 
                     v-html="processHtmlResult(result)">
                </div>
                <div v-else class="result-display">
                    <code class="chemical-formula">{{ result }}</code>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.balance-demo {
    padding: 2rem;
    border: 2px solid var(--vp-c-border);
    border-radius: 12px;
    background: var(--vp-c-bg-soft);
    box-shadow: var(--chem-shadow-sm);
    transition: border-color var(--chem-transition-base), box-shadow var(--chem-transition-base);
    position: relative;
}

.balance-demo.processing {
    border-color: var(--chem-primary);
}

.section-header {
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.input-label,
.result-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--chem-primary);
    letter-spacing: -0.01em;
}

.helper-text {
    font-size: 0.85rem;
    color: var(--vp-c-text-3);
    font-weight: 400;
}

.textarea-wrapper {
    position: relative;
    margin-bottom: 1rem;
}

.chemistry-textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--vp-c-border);
    border-radius: 8px;
    font-family: var(--vp-font-family-mono);
    font-size: 1rem;
    line-height: 1.6;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    resize: vertical;
    transition: border-color var(--chem-transition-base), box-shadow var(--chem-transition-base);
    box-shadow: var(--chem-shadow-sm);
}

.chemistry-textarea:focus {
    outline: none;
    border-color: var(--chem-primary);
    box-shadow: 0 0 0 3px rgba(10, 77, 104, 0.15);
}

.chemistry-textarea.has-error {
    border-color: var(--chem-danger);
    box-shadow: 0 0 0 3px rgba(239, 71, 111, 0.1);
}

.chemistry-textarea::placeholder {
    color: var(--vp-c-text-4);
    opacity: 0.7;
}

.processing-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    z-index: 10;
}

.dark .processing-overlay {
    background: rgba(13, 27, 42, 0.9);
}

.molecule-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--chem-primary);
    border-top-color: var(--chem-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.input-hints {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.5rem;
}

.hint {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.examples-section {
    margin: 1.5rem 0;
}

.examples-label {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--vp-c-text-1);
    letter-spacing: -0.01em;
}

.examples-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.75rem;
    margin-top: 0.75rem;
}

.example-btn {
    padding: 0.75rem 1rem;
    border: 2px solid var(--vp-c-border);
    border-radius: 8px;
    background: var(--vp-c-bg);
    cursor: pointer;
    transition: border-color var(--chem-transition-base), background-color var(--chem-transition-base);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
}

.example-btn:hover {
    border-color: var(--chem-primary);
    background: var(--vp-c-bg-soft);
}

.example-btn.metal {
    border-left: 4px solid var(--chem-metals);
}

.example-btn.nonmetal {
    border-left: 4px solid var(--chem-nonmetals);
}

.example-btn.noble-gas {
    border-left: 4px solid var(--chem-noble-gases);
}

.example-btn.halogen {
    border-left: 4px solid var(--chem-halogens);
}

.example-category {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--chem-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.example-btn code.chemical-formula {
    font-size: 0.85rem;
    padding: 0.3em 0.5em;
}

.options-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 1.25rem;
    background: var(--vp-c-bg);
    border-radius: 8px;
    border: 2px solid var(--vp-c-border);
    margin: 1.5rem 0;
}

.option-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.option-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    letter-spacing: -0.01em;
}

.select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.chemistry-select {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 2px solid var(--vp-c-border);
    border-radius: 8px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color var(--chem-transition-base), box-shadow var(--chem-transition-base);
    appearance: none;
    -webkit-appearance: none;
}

.chemistry-select:hover {
    border-color: var(--chem-primary);
}

.chemistry-select:focus {
    outline: none;
    border-color: var(--chem-primary);
    box-shadow: 0 0 0 3px rgba(10, 77, 104, 0.15);
}

.select-arrow {
    position: absolute;
    right: 1rem;
    pointer-events: none;
    color: var(--chem-primary);
    font-size: 0.8rem;
    transition: transform var(--chem-transition-fast);
}

.chemistry-select:focus + .select-arrow {
    transform: rotate(180deg);
}

.tooltip {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
    font-style: italic;
    padding: 0.5rem 0;
    display: block;
}

.chemistry-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;
}

.chemistry-checkbox input[type="checkbox"] {
    display: none;
}

.checkbox-custom {
    width: 22px;
    height: 22px;
    border: 2px solid var(--vp-c-border);
    border-radius: 4px;
    background: var(--vp-c-bg);
    position: relative;
    transition: background-color var(--chem-transition-base), border-color var(--chem-transition-base);
}

.chemistry-checkbox input[type="checkbox"]:checked + .checkbox-custom {
    background: var(--chem-primary);
    border-color: var(--chem-primary);
}

.checkbox-custom::after {
    content: '';
    position: absolute;
    top: 45%;
    left: 50%;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg) scale(0);
    transition: transform var(--chem-transition-base);
}

.chemistry-checkbox input[type="checkbox"]:checked + .checkbox-custom::after {
    transform: translate(-50%, -50%) rotate(45deg) scale(1);
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--vp-c-text-1);
}

.error-section {
    padding: 1.25rem;
    background: rgba(239, 71, 111, 0.08);
    border: 2px solid var(--chem-danger);
    border-radius: 8px;
    margin: 1.5rem 0;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.error-icon {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--chem-danger);
    flex-shrink: 0;
}

.error-content {
    flex: 1;
}

.error-title {
    color: var(--chem-danger);
    font-weight: 700;
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.01em;
}

.error-message {
    color: var(--vp-c-text-1);
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
}

.result-section {
    margin-top: 1.5rem;
}

.result-card {
    position: relative;
    padding: 1.5rem;
    background: var(--vp-c-bg);
    border: 2px solid var(--chem-primary);
    border-radius: 8px;
    overflow: hidden;
}

.result-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--chem-primary);
}

.result-display {
    font-family: var(--vp-font-family-mono);
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.8;
    color: var(--chem-primary);
    position: relative;
    z-index: 1;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.dark .result-display {
    color: var(--chem-primary-light);
}

.html-result {
    padding: 0.75rem;
    background: rgba(10, 77, 104, 0.05);
    border-radius: 8px;
}

.dark .html-result {
    background: rgba(8, 131, 155, 0.1);
}

.result-display code.chemical-formula {
    font-size: 1.2rem;
    padding: 0.5rem 0.75rem;
    display: inline-block;
    background: rgba(10, 77, 104, 0.06);
}

/* Chemical formula styling */
:deep(.chemical-formula) {
    font-family: var(--vp-font-family-mono);
    font-weight: 600;
    background: rgba(10, 77, 104, 0.06);
    border: 1px solid rgba(10, 77, 104, 0.2);
    color: var(--chem-primary);
    padding: 0.25em 0.5em;
    border-radius: 4px;
    display: inline-block;
    transition: background-color var(--chem-transition-fast), border-color var(--chem-transition-fast);
}

.dark :deep(.chemical-formula) {
    background: rgba(8, 131, 155, 0.1);
    border-color: rgba(8, 131, 155, 0.3);
    color: var(--chem-primary-light);
}

:deep(.chemical-formula sub) {
    font-size: 0.75em;
    vertical-align: baseline;
    position: relative;
    top: 0.3em;
}

:deep(.chemical-formula sup) {
    font-size: 0.75em;
    vertical-align: baseline;
    position: relative;
    top: -0.3em;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .balance-demo {
        padding: 1.5rem;
    }
    
    .examples-list {
        grid-template-columns: 1fr;
    }
    
    .options-section {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
    
    .input-hints {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .result-display {
        font-size: 1rem;
    }
}

/* Touch target improvements for accessibility */
@media (max-width: 640px) {
    .example-btn {
        min-height: 44px;
        min-width: 44px;
        padding: 0.875rem 1rem;
    }
    
    .chemistry-select {
        min-height: 44px;
        padding: 0.875rem 2.5rem 0.875rem 1rem;
    }
    
    .chemistry-checkbox .checkbox-custom {
        width: 24px;
        height: 24px;
    }
    
    .chemistry-textarea {
        min-height: 100px;
    }
    
    .result-card {
        padding: 1.25rem;
    }
}

/* Focus states for accessibility */
.example-btn:focus-visible {
    outline: 2px solid var(--chem-primary);
    outline-offset: 2px;
}

.chemistry-textarea:focus-visible {
    outline: none;
    border-color: var(--chem-primary);
    box-shadow: 0 0 0 3px rgba(10, 77, 104, 0.15);
}

.dark .chemistry-textarea:focus-visible {
    box-shadow: 0 0 0 3px rgba(8, 131, 155, 0.2);
}

.chemistry-select:focus-visible {
    outline: 2px solid var(--chem-primary);
    outline-offset: 2px;
}

.chemistry-checkbox:focus-visible .checkbox-custom {
    outline: 2px solid var(--chem-primary);
    outline-offset: 2px;
}

/* High contrast mode support */
@media (forced-colors: active) {
    .example-btn,
    .chemistry-textarea,
    .chemistry-select,
    .result-card,
    .balance-demo {
        border: 2px solid CanvasText;
    }
    
    .chemistry-checkbox .checkbox-custom {
        border: 2px solid CanvasText;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .balance-demo,
    .example-btn,
    .chemistry-textarea,
    .chemistry-select,
    .result-card,
    .molecule-spinner {
        transition: none;
        animation: none;
    }
    
    .balance-demo.changed {
        animation: none;
    }
}
</style>