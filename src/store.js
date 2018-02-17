const get = param => window.localStorage.getItem(param)
const set = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

const BASE_URL = 'https://api.getir.in'

const state = {
  logged: get('logged') || false,
  location: JSON.parse(get('location')) || {},
  init: false,
  token: get('token') || null,
  username: get('username') || '',
  items: JSON.parse(get('items')) || [],
  order: JSON.parse(get('order')) || []
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
  },
  order (state) {
    return state.order
  },
}

const mutations = {
  logIn: (state, {token, username, order}) => {
    state.token = token
    state.order = order
    state.username = username
    state.logged = true

    set('token', token)
    set('username', username)
    set('logged', true)
    set('order', order)
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
    const {token} = await fetch(`${BASE_URL}/user/login`,
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
    const order = await fetch(`${BASE_URL}/order/list`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        method: "POST"
    })
    .then(res => res.json())
    .catch(console.log)
    context.commit('logIn', {token, username, order})
  },
  location (context, obj) {
    context.commit('setLocation', obj)
  },
  async getInitialData (context) {
    const items = await fetch(`${BASE_URL}/product`)
      .then(res => res.json())
      .catch(console.log)
    context.commit('init', items)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
