import config from '@shared/config.json'

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
