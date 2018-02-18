<template lang="html">
  <f7-view>
    <f7-page>
      <f7-navbar title="Alışveriş Listesi Oluştur">
        <f7-nav-right>
          <f7-link popup-close>Kapat</f7-link>
        </f7-nav-right>
      </f7-navbar>

      <f7-block inset>
        Alışveriş listenizi şu anki konumunuza göre veya daha önceki konumlarınıza göre verebilirsiniz.
        <!-- Location Picker  -->
        <f7-button big @click="selectLocationActionSheet()">Konum seç</f7-button>
        <!-- Location Picker  -->

        <f7-list form>
          <f7-list-item>
            <f7-label>Başlık</f7-label>
            <f7-input :value="title" @input="title = $event.target.value" type="text" placeholder="Alışveriş listenize bir başlık giriniz" clear-button></f7-input>
          </f7-list-item>
        </f7-list>

        <f7-list form>
          <f7-list-item>
            <f7-label>Ürün Seçin</f7-label>
            <f7-input type="select" :value="selectedItem" @input="selectedItem = $event.target.value" >
              <option v-for="item in items" :value="item.id" :key="item.id" selected>{{item.name}}</option>
            </f7-input>
          </f7-list-item>
          <f7-list-item>
            <f7-label>Ürün Adedi</f7-label>
            <f7-input type="select" :value="count" @input="count = $event.target.value">
              <option value="1" selected>1</option>
              <option value="2" >2</option>
              <option value="3" >3</option>
              <option value="4" >4</option>
              <option value="5" >5</option>
              <option value="6" >6</option>
              <option value="7" >7</option>
              <option value="8" >8</option>
              <option value="9" >9</option>
              <option value="10" >10</option>
            </f7-input>
          </f7-list-item>
        </f7-list>
        <f7-button big style="margin-top: 5px" @click="addItem()">Ürünü alışveriş listeme ekle</f7-button>


        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th class="label-cell">Ürün</th>
                <th class="numeric-cell">Birim</th>
                <th class="numeric-cell">Tutar (₺)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in basket" :key="item.product">
                <td class="label-cell">{{ itemDetail(item.product).name }}</td>
                <td class="numeric-cell">x{{ item.count }}</td>
                <td class="numeric-cell">{{ itemDetail(item.product).price }} ₺</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="label-cell">Toplam alışveriş listesi tutarı</td>
                <td class="numberic-cell"></td>
                <td class="numeric-cell">{{total}} ₺</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- Table -->
      </f7-block>
      <f7-fab color="pink" @click="putOrder()">
        <f7-icon f7="check"></f7-icon>
      </f7-fab>
    </f7-page>
  </f7-view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import locationDetail from '../util/location'

  export default {
    computed: {
      ...mapGetters([
        'items',
      ]),
    },
    data() {
      return {
        title: '',
        selectedItem: '',
        count: 0,
        selectedLocation: null,
        location: null,
        basket: [],
        total: 0
      }
    },
    methods: {
      async putOrder () {
        let { title, basket } = this
        let { location, token } = this.$store.state
        if (title.trim().length === 0) {
          this.$f7.dialog.alert('Başlık giriniz')
        } else if (basket.length === 0) {
          this.$f7.dialog.alert('Alışveriş listeniz boş')
        } else {
          let body = {
            title,
            items: basket,
            address: this.$store.state.location,
            destination: {
              lat: location.latitude,
              lng: location.longitude
            },
            status: 0
          }
          const order = await fetch(`${BASE_URL}/order`, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
              },
              method: "PUT",
              body: JSON.stringify(body)
          })
          .then(res => res.json())
          .then(({id, createdAt} )=> {
            body.createdAt = createdAt
            body.updatedAt = createdAt
            body.id = id
            this.$store.dispatch('addOrder', body)
            this.$f7.dialog.alert('Alışveriş listeniz oluşturuldu, yakındaki kuryelere bildirim gönderildi..')
            vue.$f7.popup.close('#createShoppingListPopup')
          })
          .catch(console.log)
        }
      },
      itemDetail (productId) {
        return this.items.find(i => i.id === productId)
      },
      addItem () {
        let check = this.basket.find(b => b.product === this.selectedItem)
        if (!check) {
          this.basket.push({
            product: this.selectedItem,
            count: this.count
          })
        } else {
          this.$f7.dialog.alert('Bu üründen daha önce eklediniz..')
        }
      },
      selectLocationActionSheet () {
        this.$f7.actions.create({
          buttons: [
            {
              text: 'Konum seç',
              label: true
            },
            {
              text: 'Şu anki konum',
              bold: true,
              onClick: () => {
                this.selectedLocation = this.$store.state.location
              },
            },
            {
              text: 'İptal',
              color: 'red'
            },
          ]
        }).open()
      },
      getCurrentLocation () {
        if (!navigator.geolocation) {
          this.$f7.dialog.alert('Tarayıcının bildirim özelliği malesef bulunmamakta. Tüm özelliklerimizi kullanamayacak olmana üzüldük.')
          return;
        }
        navigator.geolocation.watchPosition( async ({coords: {latitude, longitude}}) => {
          this.location = await locationDetail({latitude, longitude})
          this.$store.dispatch('location', this.location);
        }, ({code, message}) => {
          if (code === 1) {
            this.$f7.dialog.alert('Lokasyon iznini almadan sana yardımcı olamam :(')
          }
        });
      }
    },
    watch: {
      basket: function () {
        this.total = this.basket
          .map(o => {
            return this.itemDetail(o.product).price * o.count
          })
          .reduce((a, b) => a + b, 0)
      }
    },
    created () {
      this.getCurrentLocation()
      if (this.$store.state.token) {
        this.$socket.emit('login', this.$store.state.token)
      }

    }
  }
</script>
