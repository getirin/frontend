<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-title>Getir.in</f7-nav-title>
    </f7-navbar>
    <div v-if="!isInitialized">
      <f7-progressbar infinite color="multi"></f7-progressbar>
    </div>
    <google-map
      :center="isInitialized ? currentLocation : {lat: 41.0781274, lng: 29.0224651}"
      :zoom="zoom"
      :options="options"
      :style="mapSize"
      @zoom_changed="zoomChange($event)"
      >
      <google-marker
        :position="isInitialized ? currentLocation : {lat: 41.0781274, lng: 29.0224651}"
        :clickable="false"
        :draggable="false"
        >
      </google-marker>
      <google-marker
        v-for="m in markers"
        :key="m.id"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
        :icon= "{
          anchor: {x: m.position.lat, y: m.position.lng},
          url: `/static/logo.svg`,
          scaledSize: {b: 'px', f: 'px', height: 60, width: 80}
        }"
        >
      </google-marker>
    </google-map>
    <div v-if="isLoggedIn">
      <div class="display-flex"
        style=
          "
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 55%;
          "
        >
        <h3 class="order-list">Alışveriş listelerim</h3>
        <f7-list accordion style="width: 100%" inset>
          <f7-list-item
            accordion-item
            v-for="list in order"
            :title="list.title"
          >
            <f7-accordion-content>
              <f7-block block block-strong>
                <p>Alışveriş listeniz {{ list.createdAt | moment("from", "now") }} önce {{ statusGenerator(list.status) }}</p>

                <!-- <p v-if="list.status !== 0">Alışverişinizi gerçekleştiren kurye:
                  <f7-link :href="carrierPath(list.carrier)">{{ list.carrier.name }}</f7-link>
                </p> -->
                <div class="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th class="label-cell">Ürün</th>
                        <th class="numeric-cell">Birim</th>
                        <th class="numeric-cell">Fiyat (₺)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in list.items">
                        <td class="label-cell">{{ getItem(item.id).name }}</td>
                        <td class="numeric-cell">{{ item.count }}</td>
                        <td class="numeric-cell">{{ getItem(item.id).price * item.count }} ₺</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td class="label-cell">Alışveriş tutarı</td>
                        <td class="numeric-cell"></td>
                        <td class="numeric-cell">{{ list.totalPrice }} ₺</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </f7-block>
            </f7-accordion-content>
          </f7-list-item>
        </f7-list>
        <f7-fab color="green" @click="createShoppingList()">
          <f7-icon f7="address"></f7-icon>
        </f7-fab>
      </div>
    </div>
    <f7-popup id="createShoppingListPopup">
      <CreateList />
    </f7-popup>
  </f7-page>
</template>
<script>
import { mapGetters } from 'vuex'
import CreateList from '../components/createList'

export default {
  methods: {
    statusGenerator (status) {
      switch (status) {
        case 0:
          return 'kuryelere bildirim gönderildi..'
          break;
        case 1:
          return 'bir kuryenin isteği karşılama durumu mevcut..'
          break;
        case 2:
          return 'alışveriş isteği sizin tarafınızdan kapatıldı..'
          break;
        case 3:
          return 'alışveriş isteği kurye tarafınızdan reddedildi..'
          break;
        case 4:
          return 'alışveriş başarıyla gerçekleşti..'
          break;
        default:
          return 'HATA'
      }
    },
    zoomChange(event) {
      this.zoom = event;
    },
    sum (list) {
      return list.items
        .map(i => i.price)
        .reduce((a, b) => a + b, 0)
    },
    carrierPath (carrier) {
      return `/carrier/${carrier.slug}`
    },
    createShoppingList () {
      if (this.$store.state.logged) {
        this.$f7.popup.open('#createShoppingListPopup')
      } else {
        this.$f7.loginScreen.open('#login-screen')
      }
    },
    getItem (itemId) {
      return this.items.find(i => i.product === itemId)
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'isInitialized',
      'currentLocation',
      'order',
      'items'
    ]),
    mapSize: function () {
      return `height: ${this.isLoggedIn ? 50 : 100}%`
    }
  },
  created() {
    const loginScreenToast = this.$f7.toast.create({
      text: 'Hoşgeldin, şu anda etrafında 20 adet kuryemiz var, bir alışveriş listesi oluşturup en kısa sürede bunları sana getirebilirler. Hemen tıkla ve giriş yap!',
      closeButton: true,
      closeButtonText: 'Giriş Yap',
      closeButtonColor: 'green',
      on: {
          close: () => {
            this.$f7.loginScreen.open('#login-screen')
          },
        }
    });
    if (!this.isLoggedIn) {
      loginScreenToast.open()
    }
  },
  components: {
    CreateList
  },
  data () {
    return {
      center: {
        lat: 10.0,
        lng: 10.0
      },
      markers: [
        {
          id: 1,
          position: {
            lat: 41.080481,
            lng: 29.033895
          }
        },
        {
          id: 2,
          position: {
            lat: 41.078015,
            lng: 29.029893
          }
        }
      ],
      zoom: 13,
      options: {
        disableDefaultUI: true,
        zoomControl: false,
        zoomControlOptions: {
            position: 6
        },
        streetViewControl: false,
        scrollwheel: true,
        styles: [ { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [ { "color": "#f7f1df" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#d0e3b4" } ] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.medical", "elementType": "geometry", "stylers": [ { "color": "#fbd3da" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#bde6ab" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#ffe15f" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#efd151" } ] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "color": "black" } ] }, { "featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [ { "color": "#cfb2db" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#a2daf2" } ] } ]
      }
    }
  }
}
</script>

<style media="screen">
  .gm-style-cc {
    display: none;
  }
  .gm-style-iw {
    color: #353535
  }
  @media screen and (max-width: 500px) {
    .gm-style-cc {
      display: none;
    }
    .gm-style-iw {
      color: #353535
    }
    img[src="https://maps.gstatic.com/mapfiles/api-3/images/google_white5_hdpi.png"]{display:none}
  }
</style>
