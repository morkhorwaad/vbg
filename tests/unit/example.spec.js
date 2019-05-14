import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store/index.js'
import Bowl from '@/components/Bowl.vue'

describe('Bowl.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  it('renders', () => {
    const wrapper = mount(Bowl, { 
      store, 
      localVue 
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
