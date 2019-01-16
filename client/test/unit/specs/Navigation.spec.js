import Vue from 'vue'
import Navigation from '@/components/Navigation'

describe('Navigation.vue', () => {
  it(`should render propValue as its text content`, () => {
    // Extend the component to get the constructor, which we can then initialize directly.
    const Constructor = Vue.extend(Navigation)

    const comp = new Constructor({
      propsData: {
        // Props are passed in "propsData".
        navigation: 'Welcome to Your Vue.js App Essential Links Dashboard Posts Add Sign Out'
      }
    }).$mount()

    expect(comp.$el.textContent)
      .to.equal('Welcome to Your Vue.js App Essential Links Dashboard Posts Add Sign Out')
  })
})