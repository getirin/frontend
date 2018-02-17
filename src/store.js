const get = param => window.localStorage.getItem(param)
const set = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

const state = {
  logged: get('logged') || false,
  location: get('location') || {},
  init: false,
  token: get('token') || null,
  username: get('username') || '',
  items: get('items') || []
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
  },
  items (state) {
    return state.items
  }
}

const mutations = {
  logIn: (state, {token, username}) => {
    state.token = token
    state.username = username
    state.logged = true

    set('token', token)
    set('username', username)
    set('logged', true)
  },
  setLocation: (state, obj) => {
    state.init = true
    state.location = obj
    set('location', obj)
  },
  init: (state, items) => {
    state.items = items
    set('items', items)
  }
}

const actions = {
  async logIn (context, {username, password}) {
    const {token} = await fetch('https://api.getir.in/user/login',
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({name:username, password})
      })
      .then(res => res.json())
      .catch(console.log)
      vue.$f7.loginScreen.close('#login-screen', true)
    context.commit('logIn', {token, username})
  },
  location (context, obj) {
    context.commit('setLocation', obj)
  },
  async getInitialData (context) {
    const items = await fetch('https://api.getir.in/product')
      .then(res => res.json())
      .catch(console.log)
    context.commit('init', items)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
