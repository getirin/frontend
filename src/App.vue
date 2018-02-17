<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>

    <f7-panel right cover theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <f7-view id="main-view" url="/" main></f7-view>

    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-item>
              <f7-label>Username</f7-label>
              <f7-input name="username" placeholder="Username" type="text"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Password</f7-label>
              <f7-input name="password" type="password" placeholder="Password"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" login-screen-close></f7-list-button>
            <f7-block-footer>
              <p>Click Sign In to close Login Screen</p>
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
      ...mapGetters([
       'isLoggedIn'
     ]),
   },
   data() {
     return {
       location: "",
       selectParams: {
         closeOnSelect: true,
         pageBackLinkText: 'Geri'
       }
     }
   },
   created () {
     // vue.$f7.smartSelect.get().items
     // ${this.$moment(new Date()).fromNow()}
     // this.isLoggedIn || setTimeout( () => {
     //   this.$f7.loginScreen.open('#login-screen', true)
     // }, 10)
   }
}
</script>
