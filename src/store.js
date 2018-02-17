const state = {
  logged: true,
  location: {},
  init: false
}

const getters = {
  isLoggedIn (state) {
    return state.logged
  },
  isInitialized (state) {
    return state.init
  },
  currentLocation ({ location }) {
    let { latitude: lat, longitude: lng } = location
    return { lat, lng } || { lat: 10, lng: 10 }
  }
}

const mutations = {
  logIn: (state, bool) => {
    state.logged = bool
  },
  setLocation: (state, obj) => {
    state.init = true
    state.location = obj
  }
}

const actions = {
  logIn (context, bool) {
    context.commit('logIn', bool)
  },
  location (context, obj) {
    context.commit('setLocation', obj)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
