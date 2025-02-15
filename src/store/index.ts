import { createStore } from 'vuex'
import taskbarModule from './taskbarModule'
import startMenuModule from './startMenuModule'

export default createStore({
  modules: {
    taskbar: taskbarModule,
    startMenu: startMenuModule
  }
})