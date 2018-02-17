<template lang="html">
  <f7-view>
    <f7-page>
      <f7-navbar title="Alışveriş Listesi Oluştur">
        <f7-nav-right>
          <f7-link popup-close>Kapat</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-block>
        Alışveriş listenizi şu anki konumunuza göre veya daha önceki konumlarınıza göre verebilirsiniz.
        <f7-button big style="margin-top: 5px" @click="locationPicker.open()">Konum seç</f7-button>


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
                <td class="label-cell">{{ item.title }}</td>
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
    <f7-fab color="pink">
      <f7-icon f7="check"></f7-icon>
    </f7-fab>
  </f7-view>
</template>

<script>
  export default {
    data() {
      return {
        order: [],
        totalOrderPrice: 0,
        itemPicker: null,
        locationPicker: null,
        location: null,
        items: [
          {
            id: 1,
            title: 'Süt',
            price: 1
          },
          {
            id: 2,
            title: 'Kola',
            price: 2
          },
          {
            id: 3,
            title: 'Çikolata',
            price: 3
          },
          {
            id: 4,
            title: 'Dondurma',
            price: 2
          },
        ]
      }
    },
    methods: {
      removeItemFromOrderList (item) {
        const originalItem = this.items.find(i => i.title === item.title)
        let order = this.order.find(o => o.title === item.title)
        if (order && order.count > 0) {
          this.$set(order, 'count', --order.count)
          this.$set(order, 'price', order.price - originalItem.price)
          this.totalOrderPrice -= originalItem.price
        } else {
          this.order = this.order.filter(o => o.title !== item.title)
        }
      },
      addItem () {
        if (!this.itemPicker.getValue()) {
          alert('Lütfen bir ürün seçiniz..')
          return
        }
        let [title, count] = this.itemPicker.getValue()
        count = parseFloat(count.split('x')[1])
        const item = this.items.find(i => i.title === title)
        let order = this.order.find(o => o.title === title)

        if (order) {
          this.$set(order, 'count', count + order.count)
          this.$set(order, 'price', order.price + (count * item.price))
          this.totalOrderPrice += (count * item.price)
        } else {
          this.order.push({
            id: item.id,
            title: item.title,
            count,
            price: (count * item.price)
          })
        }
      }
    },
    watch: {
      order: function () {
        this.totalOrderPrice = this.order
          .map(o => o.price)
          .reduce((a, b) => a + b, 0)
      }
    },
    created() {
      window.order = this.order
      setTimeout( () => {
        this.itemPicker = this.$f7.picker.create({
           inputEl: '#pick-item',
             rotateEffect: true,
             cols: [
               {
                 textAlign: 'left',
                 values: this.items
                  .map(i => i.title)
               },
               {
                 values: ('x1 x2 x3 x4 x5 x6 x7 x8 x9 x10').split(' ')
               },
             ]
         });

         this.locationPicker = this.$f7.actions.create({
            buttons: [
              [
                {
                  text: 'Ürünlerinizi nereye göndermemizi istersiniz?',
                  label: true
                },
                {
                  text: 'Şu anki konumuma',
                  onClick: function () {
                    alert('Şu anki konumu al..')
                  }
                }
              ],
              [
                {
                  text: 'Son adresler',
                  label: true
                },
                {
                  text: 'Alışveriş 1 - 1 hafta önce',
                  onClick: function () {
                    alert('Alışveriş 1..')
                  }
                },
                {
                  text: 'Alışveriş 2 - 3 hafta önce',
                  onClick: function () {
                    alert('Alışveriş 2..')
                  }
                }
              ],
              [
                {
                  text: 'İptal',
                  color: 'red'
                }
              ]
            ],
          });
         window.itemPicker = this.itemPicker
         window.locationPicker = this.locationPicker
      }, 10);

    }
  }
</script>
