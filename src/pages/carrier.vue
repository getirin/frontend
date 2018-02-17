<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-title>Kurye Detayı</f7-nav-title>
    </f7-navbar>
    <google-map
      :center="center"
      :zoom="7"
      :options="options"
      style="height: 50%"
      >
      <google-marker
        :position="center"
        :clickable="false"
        :draggable="false"
        >
      </google-marker>
    </google-map>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      center: {
        lat: 10.0,
        lng: 10.0
      },
      options: {
        disableDefaultUI: true,
        zoomControl: false,
        zoomControlOptions: {
            position: 12
        },
        streetViewControl: false,
        scrollwheel: true
      }
    }
  }
}
</script>
