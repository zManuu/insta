import config from '@shared/config.json'

declare module 'vue' {
  interface State {
    fetchingLevel: number
    uniqueName: string
  }

  interface ComponentCustomProperties {
    $config: typeof config
  }
}

export {}
