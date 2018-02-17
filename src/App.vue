<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>

    <f7-view id="main-view" url="/" main></f7-view>

    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Giriş Yap && Kayıt Ol</f7-login-screen-title>
          <f7-list form>
            <f7-list-item>
              <f7-label>Kullanıcı Adı</f7-label>
              <f7-input name="username" placeholder="Kullanıcı adınız" @input="username = $event.target.value" type="text"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Parola</f7-label>
              <f7-input name="password" type="password" @input="password = $event.target.value"  placeholder="Parolanız"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button title="Giriş yap" @click="login" @keyup.enter="login"></f7-list-button>
            <!-- <f7-block-footer>
              <p>Click Sign In to close Login Screen</p>
            </f7-block-footer> -->
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>

  </div>
</template>

<script>
export default {
  data () {
    return {
      requestSent: false,
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (!this.requestSent) {
        const {username, password} = this
        this.$store.dispatch('logIn', {username, password});
        this.requestSent = true
      }
    }
  },
  created() {
    this.$store.dispatch('getInitialData')
    this.$store.dispatch('getOrders')
  }
}
</script>
