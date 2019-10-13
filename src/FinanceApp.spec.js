import { shallowMount } from '@vue/test-utils'
import FinanceApp from './FinanceApp'

describe('FinanceApp', () => {
    let wrapper, vm

    let click = (selector) => {
        let element = selector ? wrapper.find(selector) : wrapper
        element.trigger('click')
    }

    let type = (selector, text) => {
        let input = wrapper.find(selector)
        input.element.value = text
        input.trigger('input')
    }

    let keydown = key => {
        wrapper.trigger('keydown.' + key)
    }

    beforeEach(() => {
      wrapper = shallowMount(FinanceApp)
      vm = wrapper.vm
    })

    it('persists total funds', () => {
        type('.total-funds', 1000)

        expect(vm.totalFunds).toEqual(1000)
    })

    it('persists spendings', () => {
        type('.spending-name', 'Buy advanced vue coomponent design course')
        type('.spending-size', 199)

        expect(vm.spendings[0].name).toBe('Buy advanced vue coomponent design course')
        expect(vm.spendings[0].size).toBe(199)
    })

    it('has one spending by default', () => {
        expect(vm.spendings.length).toBe(1)
    })

    it('add new spendings', () => {
        expect(vm.spendings.length).toBe(1)
        click('.add-spending')
        expect(vm.spendings.length).toBe(2)
    })

    it('counts free funds', () => {
        type('.total-funds', 1000)

        // expect(wrapper.find('.free-funds').html()).toContain(1000)

        type('.spending-size', 200)
        expect(wrapper.find('.free-funds').html()).toContain(800)
    })

    it('shows free fund percent', () => {
        type('.total-funds', 1000)

        type('.spending-size', 200)

        expect(wrapper.find('.free-funds-percent').html()).toContain('80.0%')
    })

    it('doesnt show free fund percent when total funds are not set', () => {
        type('.total-funds', '')
        expect(wrapper.find('.free-funds-percent').exists()).toBe(false)
    })

    it('count spending as percent of all total funds', () => {
        type('.total-funds', 1000)
        type('.spending-size', 200)
        expect(wrapper.find('.spending-as-percent-from-total-funds').html()).toContain(`20.0%`)
    })

    it('doesnt show spending percent if total funds are not set', () => {
        type('.total-funds', '')
        expect(wrapper.find('.spending-as-percent-from-total-funds').exists()).toBe(false)
    })

    it('shows only shows 1 digit after point', () => {
        type('.total-funds', 2000)
        type('.spending-size', 17)
        expect(wrapper.find('.spending-as-percent-from-total-funds').html()).toContain(`0.9%`)
    })

    it('adds new spending when spending name is typed into last spending', () => {
        expect(vm.spendings.length).toBe(1)
        type('.spending-name', 'some spending')
        expect(vm.spendings.length).toBe(2)
    })
})
