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
      style="height: 100%"
      >
      <google-marker v-for="m in markers" :key="m.id" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></google-marker>
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
          zoomControl: true,
          zoomControlOptions: {
              position: 12
          },
          streetViewControl: false,
          scrollwheel: true
        },
    }
  }
}
</script>
