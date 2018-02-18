import createPersistedState from 'vuex-persistedstate'
const get = param => window.localStorage.getItem(param)
const set = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

window.BASE_URL = 'https://api.getir.in'


const state = {
  connect: false,
  logged: false,
  location: {},
  init: false,
  token: null,
  username: '',
  items: [],
  order: [],
  basket: [], // New basket
  carriers: {
    "5a89090ce4545a00149cc493": {
      lastSeen: { lat: 41, lng: 29 },
      name: "cagatay-carrrier"
    }
  }
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
  carriers (state) {
    return state.carriers
  }
}

const mutations = {
  SOCKET_CONNECT: (state, status) => {
    state.connect = true
  },
  SOCKET_CONNECT_ERROR: (state, status) => {
    state.connect = false
  },
  SOCKET_LOCATION: (state, carrier) => {
    state.carriers = {
      ...state.carriers,
      ...carrier[0]
    }
  },
  SOCKET_REQUEST: (state, payload) => {

    let order = state.order.find(o => o.id === payload.order_id)

    if (order) {

      let g = vue.$f7.actions.create({
        buttons: [
          {
            text: `${payload.name} sizin ${order.title} isimi alışveriş listenizi derleme isteği gönderdi`,
            label: true
          },
          {
            text: 'KABUL ET',
            onClick: function () {
              const order = fetch(`${BASE_URL}/request/${payload.request_id}/accept`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': token,
                },
                method: 'PATCH'
              })
              .then(res => res.json())
              .then(() => {
                vue.$f7.dialog.alert('Kuryeyi onayladınız.')
              })
              .catch(() => {
                vue.$f7.dialog.alert('Kuryeyi onaylarken hata oluştu.')
              })
            }
          },
          {
            text: 'REDDET',
            color: 'red',
            onClick: function () {
              const order = fetch(`${BASE_URL}/request/${payload.request_id}/reject`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': token,
                },
                method: 'PATCH'
              })
              .then(res => res.json())
              .then(() => {
                vue.$f7.dialog.alert('Kuryeyi reddettiniz.')
              })
              .catch(() => {
                vue.$f7.dialog.alert('Kuryeyi reddederken hata oluştu.')
              })
            }
          },
        ]
      })
      g.open()

    }
    const orderUpdate = fetch(`${BASE_URL}/order/list`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      method: "GET"
    })
    .then(res => res.json())
    .catch(console.log)

    state.order = orderUpdate
  },
  SOCKET_FINISH: (state, {order_id}) => {
    let order = state.order.find(o => o.id === order_id)
    vue.$f7.dialog.alert('Alışverişiniz teslim edildi!')
  },
  logIn: (state, {token, username, order}) => {
    state.token = token
    state.order = order
    state.username = username
    state.logged = true
  },
  setLocation: (state, obj) => {
    state.init = true
    state.location = obj
  },
  init: (state, items) => {
    state.items = items
  },
  addOrder: (state, order) => {
    let orders = state.order;
    orders.push(order)
    state.order = orders;
  },
  setCarriers: (state, carriers) => {
    // state.carriers
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
      method: "GET"
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
  addOrder (context, order) {
    context.commit('addOrder', order)
  },
  nearByCarriers (context, carriers) {
    console.log('ACTION', carriers);
    context.commit('setCarriers', carriers)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
}
