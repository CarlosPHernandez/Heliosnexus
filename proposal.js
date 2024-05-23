const userInput = {
    firstName: document.getElementById('fname').value,
    lastName: '',
    address: '',
    utilityProvider: "Duke Energy",
    utilityRate: 0.13,
    sunPeakHours: 4.71,
    panelWattage: 405,
    ppW: 1.95,
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
    const formattedDiscount = taxCreditDiscount.toLocaleString({minimumFractionDigits:2});
    const formattedAdjustedPrice = adjustedPrice.toLocaleString({minimumFractionDigits:2});
    
  
    return {
      yearlyCost,
      customerName,
      systemPrice,
      taxCreditDiscount,
      adjustedPrice,
      formattedPrice,
      formattedDiscount,
      formattedAdjustedPrice,
      estimatedProduction,
      monthlyKwh: Math.floor(monthlyBill / utilityRate),
      panelsNeeded: Math.floor(annualKwh / panelWattage),
      systemSize: Math.floor(panelsNeeded * (panelWattage / 1000)),
      annualKwh,
    };
  }
  //Code for upgrades pricing update goes down here
  function calculateTotalUpgradeCost() {
    const upgrades = document.querySelectorAll('.upgrade:checked');
    let totalUpgradeCost = 0;
    upgrades.forEach(upgrade => {
        totalUpgradeCost += parseFloat(upgrade.getAttribute('data-price'));
    });
    return totalUpgradeCost;
  }
// Code between this and the note above is to try to update price with upgrades 
  function displayResults(solarData) {
    const { utilityRate, utilityProvider, fname } = userInput;
    const { yearlyCost, monthlyKwh, annualKwh, panelsNeeded, customerName, systemSize,
         estimatedProduction, systemPrice, taxCreditDiscount, adjustedPrice, formattedPrice, formattedDiscount, formattedAdjustedPrice} = solarData; //added fistname
 // adding a const here for upgrade prices
    const totalUpgradeCost = calculateTotalUpgradeCost();
    const totalPriceWithUpgrades = adjustedPrice + totalUpgradeCost;
    const formattedTotalPriceWithUpgrades = totalPriceWithUpgrades.toLocaleString({minimumFractionDigits:2});
    

    document.getElementById("solarResults").innerHTML = `
 <h2>Your System</h2>
    <p><strong>System Size</strong>: ${systemSize}Kw</p>
    <p><strong>Number of panels</strong>: ${panelsNeeded}</p> 
    <p><strong>Estimated Annual Production</strong>: ${estimatedProduction}Kwh</p>
    <p><strong>Panel Type:</strong> Hanwha QCell 405</p>
    
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
    <p><strong>Estimated System Price</strong>: $${formattedPrice} </p>
    <p><strong>Discounts and 30% Tax Credit</strong>: $${formattedDiscount}</p>
    <p><strong>System Price after incentives applied</strong>: $${formattedAdjustedPrice}</p>
    <p><strong>Total Upgrade Cost</strong>: $${formattedTotalPriceWithUpgrades}</p>
    
    <p><b>Helios Protection Plan <b><br>
       -25 Year Warranty <br>
       -Solar Panel Cleaning (2 times a year)<br>
       -24/7 Customer Support<br>
       -Roof Penetrarion / Workmanship 
      </p>
    `;
    // adding payment link here to stripe 
    const placeOrder = document.getElementById("order-btn");
    placeOrder.innerHTML = `
    <a href = "https://buy.stripe.com/14k3e11KLdjz1RCeUU">
    <button>Order Now</button>
    `;
     // adding next steps after deposit here
    const nextSteps = document.getElementById("next-steps");
    nextSteps.innerHTML =`
    <h2>What Happens Next?</h2>
    <ol>
      <li><strong>Deposit Placed</strong>: Place a deposit to start your project.</li>
      <li><strong>Manual Design</strong>: We design your custom solar panel system with the help of our engineers.</li>
      <li><strong>Home Survey</strong>: We conduct a home survey to prepare for installation.</li>
      <li><strong>Permitting</strong>: All permits are submitted for approval.</li>
      <li><strong>Installation</strong>: Our team will reach out to schedule a day for installation.</li>
    `; 
  }
  // adding a function to hide formfield after submission here
  function hideFormFields() {
    document.getElementById('userinfo').style.display='none';
  }

  function calculateAndDisplay() {
    const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
    const solarValues = calculateSolar(monthlyBill, fname);
    displayResults(solarValues);
    hideFormFields(); // calling hiding function here 

  }
  // adding function for upgrade price here and between 1 -2 
  function initUpgradeListeners(){
    const upgradeElements = document.querySelectorAll('.upgrade');
    upgradeElements.forEach(upgrade => {
        upgrade.addEventListener('change', () => {
            const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
            const solarValues = calculateSolar(monthlyBill, fname);
            displayResults(solarValues);
        });
    });
  }

  document.addEventListener('DOMContentLoaded' , initUpgradeListeners);
  // 2
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
        // here im going to try to hide the form field and button may21st 
        document.getElementById('solarResults').classList.remove('hidden');
        document.getElementById('resultsWS').classList.remove('hidden');
        document.getElementById('totalAmount').classList.remove('hidden');
        // showing the form data? 
        calculateAndDisplay();
      } else {
        alert('Please enter an address ' + status);
      }
    });
  };

