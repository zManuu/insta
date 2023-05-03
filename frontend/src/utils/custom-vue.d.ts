import config from '@config'

declare module 'vue' {
  interface State {
    fetchingLevel: number
  }

  interface ComponentCustomProperties {
    $store: State
    $config: typeof config
  }
}

export {}
