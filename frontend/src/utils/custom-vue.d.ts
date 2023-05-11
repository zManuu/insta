import config from '@shared/config.json'
import { IPost } from '@shared/models/IPost'

declare module 'vue' {
  interface State {
    fetchingLevel: number
    uniqueName: string
  }

  interface ComponentCustomProperties {
    $config: typeof config
    getImgSrc(post: IPost): string
  }
}

export {}
