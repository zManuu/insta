import { State } from 'vue'
import { createStore } from 'vuex'
import { toLevel } from '@shared/Helper'
import { logger } from '@/main'

export const store = createStore({
  state() {
    return {
      fetchingLevel: 0,
      uniqueName: ''
    }
  },
  mutations: {
    setFetching(state: State, val: boolean) {
      const asLevel = toLevel(val)
      logger.log('Changing fetch-level from $0 to $1', state.fetchingLevel, state.fetchingLevel + asLevel)
      state.fetchingLevel += asLevel
    },
    setUniqueName(state: State, val: string) {
      logger.log('Setting unique name in store to $0', val)
      state.uniqueName = val
    }
  }
})