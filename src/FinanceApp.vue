<template>
    <div class="p-32">
        <div class="flex items-center mb-12">
            <h2 class="font-semibold uppercase tracking-wide mr-3">Доступная сумма:</h2>
            <input type="text" v-model.number="totalFunds" class="total-funds border rounded px-3 outline-none">
        </div>

        <div>
            <div class="mb-4">
                <h3 class="font-semibold mb-2">Расходы:</h3>
                <div v-for="(spending, index) in spendings" class="py-3 border-b">
                    <div class="flex">
                        <input type="text"
                               v-model="spending.name"
                               placeholder="Расход"
                               class="spending-name px-2 outline-none"
                               @input="onTypeSpendingName(index)">

                        <input type="text"
                               v-model.number="spending.size"
                               placeholder="Размер"
                               class="spending-size px-2 outline-none">

                        <div v-if="totalFunds" class="spending-as-percent-from-total-funds">
                            {{ (spending.size / totalFunds * 100).toFixed(1) }}%
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-8">
                <button type="button" @click="addSpending" class="add-spending px-4 py-1 bg-blue-500 rounded text-white">Добавить</button>
            </div>

            <div class="free-funds flex">
                <div class="mr-5">Остаток: {{ freeFunds }} тг</div>
                <div v-if="totalFunds" class="free-funds-percent">{{ (freeFunds / totalFunds * 100).toFixed(1) }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                totalFunds: null,
                spendings: [
                    {
                        name: '',
                        size: null
                    }
                ]
            }
        },

        computed: {
            freeFunds() {
                return this.totalFunds - this.spendings.reduce((sum, spending) => sum += spending.size, 0)
            }
        },

        methods: {
            addSpending() {
                this.spendings.push({
                    name: '',
                    size: null
                })
            },

            onTypeSpendingName(index) {
                if (index == (this.spendings.length - 1)) {
                    this.addSpending()
                }
            }
        }
    }
</script>
