<template lang="html">
  <f7-view>
    <f7-page>
      <f7-navbar title="Alışveriş Listesi Oluştur">
        <f7-nav-right>
          <f7-link popup-close @click="clearOrderCreatePopup">Kapat</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <div v-if="isProcessing" class="display-flex" style="flex:1;align-items: center;justify-content: center;height: 50%">
        <f7-progressbar infinite color="multi"></f7-progressbar>
        <f7-preloader style="flex:1, align-items: center;justify-content: center;" color="green" size="44px"></f7-preloader>
      </div>
      <div v-if="isDone">
        <h4>Başarılı</h4>
        <p>Alışveriş listen başarıyla oluşturuldu, etrafındaki kuryelere iletildi..</p>
        <p>Alışveriş listeni bir kurye hazırlamaya başlarsa anlık olarak takip edebileceksin.</p>
      </div>
      <f7-block v-if="!isSubmitted" inset>
        Alışveriş listenizi şu anki konumunuza göre veya daha önceki konumlarınıza göre verebilirsiniz.
        <f7-button big style="margin-top: 5px" @click="locationPicker.open()">Konum seç</f7-button>
          <div class="block-title" style="font-weight: bold" v-if="this.selectedLocation">{{this.selectedLocation.full_adress}}</div>

          <div class="block-title" style="text-transform: none !important;">Ürün seçimi</div>
          <div class="list no-hairlines-md">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-input-wrap">
                      <input type="text" placeholder="Ne arzu edersiniz?" readonly="readonly" id="pick-item"/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <f7-button big style="margin-top: 5px" @click="addItem(this)">Ürünü alışveriş listeme ekle</f7-button>
          </div>
        </f7-list>
        <div class="data-table" v-if="totalOrderPrice > 0">
          <table>
            <thead>
              <tr>
                <th class="label-cell">Ürün</th>
                <th class="numeric-cell">Birim</th>
                <th class="numeric-cell">Kaldır</th>
                <th class="numeric-cell">Tutar (₺)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order">
                <td class="label-cell">{{ item.name }}</td>
                <td class="numeric-cell">x{{ item.count }}</td>
                <td class="numeric-cell" ><f7-button @click="removeItemFromOrderList(item)" style="border: none !important;" icon-f7="delete_round"></f7-button></td>
                <td class="numeric-cell">{{ item.price }} ₺</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="label-cell">Toplam alışveriş listesi tutarı</td>
                <td class="label-cell"></td>
                <td class="label-cell"></td>
                <td class="numeric-cell">{{totalOrderPrice}} ₺</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </f7-block>
    </f7-page>
    <f7-fab color="pink" @click="putOrder()">
      <f7-icon f7="check"></f7-icon>
    </f7-fab>
  </f7-view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import locationDetail from '../util/location'

  export default {
    computed: {
      ...mapGetters([
        'items'
      ]),
    },
    data() {
      return {
        order: [],
        totalOrderPrice: 0,
        itemPicker: null,
        isSubmitted: false,
        isProcessing: false,
        isDone: false,
        locationPicker: null,
        selectedLocation: {},
        location: null,
        orderList: [
          {
            id: "123",
            name: "Alışveriş 1",
            location: {
              latitude: 12,
              longitude: 12,
              full_adress: 'Denizli'
            }
          },
          {
            id: "321",
            name: "Alışveriş 2",
            location: {
              latitude: 12,
              longitude: 12,
              full_adress: 'İzmir'
            }
          }
        ],
        // items: [
        //   {
        //     id: 1,
        //     title: 'Süt',
        //     price: 1
        //   },
        //   {
        //     id: 2,
        //     title: 'Kola',
        //     price: 2
        //   },
        //   {
        //     id: 3,
        //     title: 'Çikolata',
        //     price: 3
        //   },
        //   {
        //     id: 4,
        //     title: 'Dondurma',
        //     price: 2
        //   },
        // ]
      }
    },
    methods: {
      clearOrderCreatePopup () {
        this.order = []
        this.totalOrderPrice = 0
        this.itemPicker = null
        this.isSubmitted = false
        this.isProcessing = false
        this.isDone = false
        this.locationPicker = null
        this.selectedLocation = {}
      },
      putOrder () {
        if (this.order.length === 0 || Object.keys(this.selectedLocation).length === 0) {
          alert('Lütfen adresi ve ürünleri seçiniz..')
          return
        }
        if (!this.isSubmitted) {
          this.isSubmitted = true
          this.isProcessing = true
          console.log('ORDER', this.order);
          console.log('LOCATION', this.selectedLocation);
          console.log('TOTAL', this.totalOrderPrice);

          // SEND HERE

          setTimeout(() => {
            this.isProcessing = false
            this.isDone = true
          }, 5 * 1000);
        } else {
          return
        }

      },
      removeItemFromOrderList (item) {
        const originalItem = this.items.find(i => i.name === item.name)
        let order = this.order.find(o => o.name === item.name)
        if (order && order.count > 0) {
          this.$set(order, 'count', --order.count)
          this.$set(order, 'price', order.price - originalItem.price)
          this.totalOrderPrice -= originalItem.price
        } else {
          this.order = this.order.filter(o => o.name !== item.name)
        }
      },
      addItem () {
        if (!this.itemPicker.getValue()) {
          alert('Lütfen bir ürün seçiniz..')
          return
        }
        let [name, count] = this.itemPicker.getValue()
        count = parseFloat(count.split('x')[1])
        const item = this.items.find(i => i.name === name)
        let order = this.order.find(o => o.name === name)

        if (order) {
          this.$set(order, 'count', count + order.count)
          this.$set(order, 'price', order.price + (count * item.price))
          this.totalOrderPrice += (count * item.price)
        } else {
          this.order.push({
            id: item.id,
            name: item.name,
            count,
            price: (count * item.price)
          })
        }
      },
      getCurrentLocation () {
        if (!navigator.geolocation) {
          alert('Tarayıcının bildirim özelliği malesef bulunmamakta. Tüm özelliklerimizi kullanamayacak olmana üzüldük.');
          return;
        }
        navigator.geolocation.watchPosition( async ({coords: {latitude, longitude}}) => {
          this.location = await locationDetail({latitude, longitude})
          this.$store.dispatch('location', this.location);
        }, ({code, message}) => {
          if (code === 1) {
            alert(`Lokasyon iznini almadan sana yardımcı olamam :(`)
          }
        });
      },
    },
    watch: {
      order: function () {
        this.totalOrderPrice = this.order
          .map(o => o.price)
          .reduce((a, b) => a + b, 0)
      }
    },
    created() {
      this.getCurrentLocation()
      setTimeout( () => {
        this.itemPicker = this.$f7.picker.create({
           inputEl: '#pick-item',
             rotateEffect: true,
             cols: [
               {
                 textAlign: 'left',
                 values: this.items
                  .map(i => i.name)
               },
               {
                 values: ('x1 x2 x3 x4 x5 x6 x7 x8 x9 x10').split(' ')
               },
             ]
         });

         let orderList = this.orderList.map(o => {
           return {
             text: o.name,
             onClick: () => {
               this.selectedLocation = o.location
             },
           }
         })

         this.locationPicker = this.$f7.actions.create({
            buttons: [
              [
                {
                  text: 'Ürünlerinizi nereye göndermemizi istersiniz?',
                  label: true
                },
                {
                  text: 'Şu anki konumuma istiyorum',
                  onClick: () => {
                    this.selectedLocation = this.$store.state.location
                  }
                }
              ],
              [
                {
                  text: 'Son adresler',
                  label: true
                },
                ...orderList
              ],
              [
                {
                  text: 'İptal',
                  color: 'red'
                }
              ]
            ],
          });
      }, 10);

    }
  }
</script>
