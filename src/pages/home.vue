<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-title>Getir.in</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <google-map
      :center="center"
      :zoom="7"
      :options="options"
      style="height: 50%"
      >
      <google-marker
        v-for="m in markers"
        :key="m.id"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position">
      </google-marker>
    </google-map>
    <div class="display-flex"
    style=
    "
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 50%;
    "
>
      <h3>Geçmiş alışverişlerim</h3>
      <f7-list accordion>
        <f7-list-item
          accordion-item
          v-for="list in lists"
          :title="list.title"
        >
          <f7-accordion-content>
            <f7-block block block-strong>
              <p>Alışveriş listeniz {{ list.date | moment("from", "now") }} önce {{ list.status ? 'teslim edildi' : 'iptal edildi' }}</p>
              <p>Alışverişinizi gerçekleştiren kurye:
                <f7-link :href="carrierPath(list.carrier)">{{ list.carrier.name }}</f7-link>
              </p>
              <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th class="label-cell">Ürün</th>
                    <th class="numeric-cell">Fiyat (₺)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in list.items">
                    <td class="label-cell">{{ item.name }}</td>
                    <td class="numeric-cell">{{ item.price }} ₺</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="label-cell">Yaklaşık alışveriş tutarı ( ₺ )</td>
                    <td class="numeric-cell">{{ sum(list) }} ₺</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            </f7-block>
          </f7-accordion-content>
        </f7-list-item>
      </f7-list>
      <f7-fab color="green" @click="$f7.popup.open('#createShoppingListPopup', true)">
        <f7-icon f7="address"></f7-icon>
      </f7-fab>
      <!-- <f7-button raised popup-open="#createShoppingListPopup">Alışveriş Listesi Oluştur</f7-button> -->
    </div>
  </f7-page>
</template>
<script>
export default {
  methods: {
    sum (list) {
      return list.items
        .map(i => i.price)
        .reduce((a, b) => a + b, 0)
    },
    carrierPath (carrier) {
      return `/carrier/${carrier.slug}`
    }
  },
  data() {
    return {
      center: {
        lat: 10.0,
        lng: 10.0
      },
      markers: [
        {
          id: 1,
          position: {
            lat: 10.0,
            lng: 10.0
          }
        },
        {
          id: 2,
          position: {
            lat: 11.0,
            lng: 11.0
          }
        }
      ],
      options: {
          disableDefaultUI: true,
          zoomControl: false,
          zoomControlOptions: {
              position: 12
          },
          streetViewControl: false,
          scrollwheel: true
        },
      lists: [
        {
          id: 1,
          title: `Alışveriş listem 1`,
          date: new Date(),
          status: true,
          items: [
            {
              id: 'item1',
              name: 'Süt',
              price: 1
            },
            {
              id: 'item2',
              name: 'Çikolata',
              price: 2
            }
          ],
          carrier: {
            id: '1abc',
            name: 'Çağatay Çalı',
            slug: 'cagataycali'
          }
        },
        {
          id: 2,
          title: `Alışveriş listem 2`,
          date: new Date(),
          status: false,
          items: [
            {
              id: 'item3',
              name: 'Kola',
              price: 2
            },
            {
              id: 'item4',
              name: 'Çikolata',
              price: 2
            }
          ],
          carrier: {
            id: '1cba',
            name: 'Yiğitcan Uçum',
            slug: 'yigitcanucum'
          }
        }
      ]
    }
  }
}
</script>
