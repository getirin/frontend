<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>

    <f7-panel right cover theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <f7-view id="main-view" url="/" main></f7-view>

    <f7-popup id="createShoppingListPopup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Alışveriş Listesi Oluştur">
            <f7-nav-right>
              <f7-link popup-close>Kapat</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            Alışveriş listenizi şuan ki konumunuza göre veya daha önceki konumlarınıza göre verebilirsiniz.
            <!-- <li>
              <a href="#" class="item-link smart-select">
                <select name="car" multiple>
                  <optgroup label="Japanese">
                    <option value="honda" selected>Honda</option>
                    <option value="lexus">Lexus</option>
                  </optgroup>
                  <optgroup label="German">
                    <option value="audi" selected>Audi</option>
                    <option value="bmw">BMW</option>
                  </optgroup>
                  <optgroup label="American">
                    <option value="cadillac">Cadillac</option>
                    <option value="chrysler">Chrysler</option>
                  </optgroup>
                </select>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Car</div>
                  </div>
                </div>
              </a>
            </li> -->
            <f7-list form>
              <f7-list-item>
                <f7-label>Konum</f7-label>
                <f7-input
                  type="text"
                  :value="location"
                  @input="location = $event.target.value"
                  placeholder="Konumunuz"
                  clear-button
                >
                </f7-input>
              </f7-list-item>

              <f7-list-item smart-select :smart-select-params="{ closeOnSelect: true }" title="Ürünlerinizi nereye getirelim?">
                <select name="location">
                  <option value="currentLocation">Şu anki konum</option>
                  <option value="list1">Alışverış 1</option>
                  <option value="list2">Alışverış 2</option>
                  <option value="list3">Alışverış 3</option>
                  <option value="list4">Alışverış 4</option>
                </select>
              </f7-list-item>

              <f7-list-item smart-select title="Ürün Seçin">
                <select name="items" multiple="multiple">
                  <optgroup label="İçecek">
                    <option value="su">Su</option>
                    <option value="süt">Süt</option>
                    <option value="kola">Kola</option>
                  </optgroup>
                  <optgroup label="Tatlı">
                    <option value="cikolata">Çikolata</option>
                    <option value="turta">Turta</option>
                  </optgroup>
                  <optgroup label="Tuzlu">
                    <option value="cekirdek">Çekirdek</option>
                    <option value="kurabiye">Kurabiye</option>
                  </optgroup>
                </select>
              </f7-list-item>
            </f7-list>

          </f7-block>
        </f7-page>
        <f7-fab color="pink">
          <f7-icon f7="check"></f7-icon>
        </f7-fab>
      </f7-view>
    </f7-popup>

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
import { mapGetters } from 'vuex';
export default {
  computed: {
      ...mapGetters([
       'isLoggedIn'
     ])
   },
   data() {
     return {
       location: ""
     }
   },
   created () {
     // ${this.$moment(new Date()).fromNow()}
     // this.isLoggedIn || setTimeout( () => {
     //   this.$f7.loginScreen.open('#login-screen', true)
     // }, 10)
   },
   methods: {

   }
}
</script>
