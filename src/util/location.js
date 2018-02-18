export default async ({ latitude, longitude }) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyA8VI7O2qYgTBk6Fymhm-pUm0Qq42IZOSA`
  const response = await fetch(url)
    .then(res => res.json())
    .catch(console.log)

  var locationObj = {};
  locationObj.latitude = latitude;
  locationObj.longitude = longitude;
  locationObj.full_address = response.results[0].formatted_address

  return locationObj
}
