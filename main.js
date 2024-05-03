const userInput = {
  firstName: document.getElementById('fname').value,
  lastName: '',
  address: '',
  utilityProvider: "Duke Energy",
  utilityRate: 0.13,
  sunPeakHours: 4.71,
  panelWattage: 405,
  ppW: 1.85,
  itc: 0.30
};

function calculateSolar(monthlyBill, firstName) {
  const { utilityRate, panelWattage, ppW, itc} = userInput; // added ppW (MAY 1st)
  const yearlyCost = monthlyBill * 12;

  // calculating the system size now 
  const annualKwh = Math.floor(monthlyBill / utilityRate * 12);
  const panelsNeeded = Math.floor(annualKwh / panelWattage);
  const customerName = document.getElementById('fname').value;
  //Adding calculation for system size 
  const systemSize = panelsNeeded * (panelWattage / 1000);
  const estimatedProduction = panelWattage * panelsNeeded;
  //calculation for pricing of system
  const systemPrice = ppW * (systemSize * 1000);
  const taxCreditDiscount = systemPrice * itc;
  const adjustedPrice = systemPrice - taxCreditDiscount;
  const formattedPrice = systemPrice.toLocaleString({minimumFractionDigits:2});
  

  return {
    yearlyCost,
    customerName,
    systemPrice,
    taxCreditDiscount,
    adjustedPrice,
    formattedPrice,
    estimatedProduction,
    monthlyKwh: Math.floor(monthlyBill / utilityRate),
    panelsNeeded: Math.floor(annualKwh / panelWattage),
    systemSize: Math.floor(panelsNeeded * (panelWattage / 1000)),
    annualKwh,
  };
}
// here im going to try to display the results.
function displayResults(solarData) {
  const { utilityRate, utilityProvider, fname } = userInput;
  const { yearlyCost, monthlyKwh, annualKwh, panelsNeeded, customerName, systemSize, estimatedProduction, systemPrice, taxCreditDiscount, adjustedPrice, formattedPrice} = solarData; //added fistname

  document.getElementById("solarResults").innerHTML = `
  <h2>Hi ${customerName}, here are your solar calculations! Below are two comparisons between staying with your current
  electric provider vs going solar with Helios!</h2>
  <p>Utility Provider: ${utilityProvider}</p>
  <p>Your Utility Rate is ${utilityRate}</p>
  <p>Annual Electric Bill: $${yearlyCost}</p>
  <p>Estimated Annual Consumption: ${annualKwh}Kwh</p>
  
  `;
  // adding a display results of soalr calculations so its two diffetent sections
  const resultsWS = document.getElementById("resultsWS");
  resultsWS.innerHTML = `
  <h2>Here is your solar proposal</h2>
  <p>System Size: ${systemSize}Kw</p>
  <p>Number of panels ${panelsNeeded}</p> 
  <p>Estimated Annual Production ${estimatedProduction}Kwh</p>
  `;
  
  //adding an inner html for pricing and tax credit
  const totalAmount = document.getElementById("totalAmount");
  totalAmount.innerHTML = `
  <h2>Price Breakdown</h2
  <p>Estimated System Price $${formattedPrice} </p>
  <p>Discounts and 30% Tax Credit $${taxCreditDiscount.toFixed(2)}</p>
  <p>System Price after incentives applied: $${adjustedPrice.toFixed(2)}</p>
  <p><b>Helios Protection Plan <b><br>
     -25 Year Warranty <br>
     -Solar Panel Cleaning (2 times a year)<br>
     -24/7 Customer Support<br>
     -Roof Penetrarion / Workmanship 
    </p>
  `

}
function calculateAndDisplay() {
  const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
  const solarValues = calculateSolar(monthlyBill, fname);
  displayResults(solarValues);
  //Im going to try to hide the form
  document.getElementById('userinfo').classList.add('hidden');
}
// api key is AIzaSyBDSFL8aL4Vdf1iXFvsurCKRhJjuQQaw58
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 150, // Closer zoom to focus on rooftops
    center: { lat: 36.088040, lng: -79.390540 }, // Default center of the map
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
      // here im going to try to hide the form field and button 
      
      // showing the form data? 
      calculateAndDisplay();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};


/*    code for pricing, I think this is has to go in the functions above.
const ppw = 1.85;
const taxCredit = 0.30;
const systemSize = systemSize;

function solarDesignCost () {
  const systemCost = ppw * systemSize;
  const systemDiscount = systemCost * taxCredit;
  return {
    systemCost: systemCost,
    discount: systemDiscount,
    discountedPrice: systemCost - systemDiscount
  };
}
function priceWTax () {
  const costDetails = solarDesignCost()
  return costDetails.discountedPrice; // this returns the discount rate?
}

function displayCost (solarCost, priceWTax) {


const systemPrice = getElementById("systemPrice");
systemPrice.innerHTML = `<p>
here is the ${systemPrice}</p>`
}; */ 
