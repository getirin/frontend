const state = {
  logged: false
}

const getters = {
  isLoggedIn (state) {
    return state.logged
  }
}

const mutations = {
  logIn: (state, bool) => {
    state.logged = bool
  }
}

const actions = {
  logIn (context, bool) {
    context.commit('logIn', bool)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
