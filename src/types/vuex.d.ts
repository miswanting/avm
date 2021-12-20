import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    theme: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
