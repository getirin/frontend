export default async ({ latitude, longitude }) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyA8VI7O2qYgTBk6Fymhm-pUm0Qq42IZOSA`
  const response = await fetch(url)
    .then(res => res.json())
    .catch(console.log)

  var locationObj = {};
  locationObj.latitude = latitude;
  locationObj.longitude = longitude;
  locationObj.full_adress = response.results[0].formatted_address

  response.results.forEach(location => {
    if (location.types[0] === location.address_components[0]) {
      eval(`locationObj.${location.types[0]} = location.address_components[0];`)
    } else {
      location.address_components.forEach((adresses) => {
        if (adresses.types[0] == location.types[0] || adresses.types[1] == location.types[0]) {
          if (adresses.long_name) {
            eval(`locationObj.${location.types[0]} = adresses.long_name;`)
          } else {
            eval(`locationObj.${location.types[0]} = adresses.short_name;`)
          }
        }
      })
    }
  })

  return locationObj
}
