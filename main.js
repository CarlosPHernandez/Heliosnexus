const userInput = {
  firstName: document.getElementById('fname').value,
  lastName: '',
  address: '',
  utilityProvider: "Duke Energy",
  utilityRate: 0.12,
  sunPeakHours: 4.71,
  panelWattage: 405
};

function calculateSolar(monthlyBill, firstName) {
  const { utilityRate, panelWattage } = userInput;
  const yearlyCost = monthlyBill * 13;

  // calculating the system size now 
  const annualKwh = Math.floor(monthlyBill / utilityRate * 12);
  const panelsNeeded = Math.floor(annualKwh / panelWattage);
  const customerName = document.getElementById('fname').value;
  //Adding more calcuations here like 

  return {
    yearlyCost,
    customerName,
    monthlyKwh: Math.floor(monthlyBill / utilityRate),
    panelsNeeded: Math.floor(annualKwh / panelWattage),
    annualKwh,
  };
}
// here im going to try to display the results.
function displayResults(solarData) {
  const { utilityRate, utilityProvider, fname } = userInput;
  const { yearlyCost, monthlyKwh, annualKwh, panelsNeeded, customerName } = solarData; //added fistname

  document.getElementById("solarResults").innerHTML = `
  <h2>Hi ${customerName}, here are your solar calculations</h2>
  <p>Your Provider is ${utilityProvider}</p>
  <p>The current rate for electricity is ${utilityRate}</p>
  <p>You're spending on average a total of $${yearlyCost} a year and consume a total
  of ${annualKwh} Kwh a year </p>
  <p> Based on this you need ${panelsNeeded} solar panels to meet your energy needs </p>
  `;
}
function calculateAndDisplay() {
  const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
  const solarValues = calculateSolar(monthlyBill, fname);
  displayResults(solarValues);
}
// api key is AIzaSyBDSFL8aL4Vdf1iXFvsurCKRhJjuQQaw58
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 150, // Closer zoom to focus on rooftops
    center: { lat: 36.017638, lng: -75.671440 }, // Default center of the map
    mapTypeId: "satellite"
  });
}

function geocodeAddress() {
  const geocoder = new google.maps.Geocoder();
  const address = document.getElementById('addressInput').value;

  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

      // showing the form data? 
      calculateAndDisplay();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};
