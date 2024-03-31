const zipCodeData = {
    alamance: ["27217", "27215"],
    durham: ["27701", "27703"],
    orange: ["27514", "27516"],
    wake: ["27601", "27602"],
    utilityRate: 0.12,
    provider: "Duke energy carolinas",
    peakSunlightHours: 4.71,
    derateFactor: 0.8
};

function findProviderAndCounty(zipCodeData, zipcode) {
    const county = Object.keys(zipCodeData).find(county => zipCodeData[county].includes(zipcode));
    if (county) {
        return {county, utilityRate: zipCodeData.utilityRate, provider: zipCodeData.provider};}
        else {
            return null;
        }
    }


function calculateSolarValues(monthlyBill, zipCodeData, address, zipcode) {
    const { utilityRate, provider, peakSunlightHours,  zipcode} = zipCodeData;

    const yearlyCostWithoutSolar = monthlyBill * 12;
    const averageMonthlyKwhWithoutSolar = monthlyBill / utilityRate; // Rounded to nearest integer kWh
    const yearlyKwhWithoutSolar = averageMonthlyKwhWithoutSolar * 12;

    const yearlyCostWithSolar = Math.round(yearlyCostWithoutSolar - (yearlyCostWithoutSolar * 0.25));// This will take annual electric bill and subtract the cost of solar a year and multiply by 25

    const averageMonthlyKwhWithSolar = averageMonthlyKwhWithoutSolar + 500;

    const savings = yearlyCostWithoutSolar - yearlyCostWithSolar;

    const paybackPeriod = (yearlyCostWithoutSolar - savings) / (yearlyCostWithSolar - savings);

    const carbonFootprintReduction = (averageMonthlyKwhWithoutSolar - averageMonthlyKwhWithSolar) * 12 * 12 * 0.0044121;

    const carbonFootprintReductionTonnes = carbonFootprintReduction / 2000;

    const carbonFootprintReductionDollars = carbonFootprintReduction * 15;

    const carbonFootprintReductionPounds = carbonFootprintReduction;

    

    

    // Calculate monthly savings
    const monthlySavings = (monthlyBill * (1 - utilityRate)) - monthlyBill;
    const annualElectricCostWithOutSolar = yearlyKwhWithoutSolar * 0.12;
    // Calculate yearly and 25 year savings
    const longTerm = annualElectricCostWithOutSolar * 25; 

    // Calculate system size with solar
    const solarPanelWattage = 395;
    const annualElectricUsageKwh = monthlyBill / utilityRate * 12;
    const systemSizeDc = annualElectricUsageKwh / (peakSunlightHours);
    const panelsNeededWithSolar = yearlyKwhWithoutSolar / solarPanelWattage;
    const systemSize = panelsNeededWithSolar * (solarPanelWattage / 1000);

    // Calculate total annual production
    const totalAnnualProduction = solarPanelWattage * panelsNeededWithSolar;

    // Calculate total savings over 25 years
    const totalSavings = monthlySavings * 300;

    return {
        yearlyCostWithoutSolar,
        yearlyCostWithSolar,
        averageMonthlyKwhWithSolar,
        averageMonthlyKwhWithoutSolar,
        yearlyKwhWithoutSolar,
        savings,
        paybackPeriod,
        utilityRate,
        provider,
        panelsNeededWithSolar,
        totalAnnualProduction,
        carbonFootprintReduction,
        systemSize,
        longTerm, 
        address,
        zipCodeData,
        zipcode
    };
}

function displayResults(calculateSolarValues) {
    const { address, provider, savings, longTerm, yearlyCostWithoutSolar, averageMonthlyKwhWithoutSolar, yearlyKwhWithoutSolar, totalAnnualProduction, carbonFootprintReduction, panelsNeededWithSolar, systemSize, county, zipcode, zipCodeData } = calculateSolarValues;

    const monthlyBillWithoutSolar = yearlyCostWithoutSolar / 12;

    const resultswithoutsolar = document.getElementById("resultsWithoutSolar");
    resultswithoutsolar.innerHTML = `
        <h2>Without Solar</h2>
        <p>Provider: ${provider}</p>
        <p>Located in: ${address}, ${zipcode}</p>
        <p>Annual Electric Cost: $${yearlyCostWithoutSolar.toFixed(1)}</p>
        <p>Estimated Monthly Bill: $${monthlyBillWithoutSolar.toFixed(1)}</p>
        <p>Average Monthly Kwh Usage: ${averageMonthlyKwhWithoutSolar.toFixed(0)} kWh</p>
        <p>25 Year do nothing cost: $${longTerm}</p> 
        <p>Yearly Kwh Consumption: ${yearlyKwhWithoutSolar} kWh</p>`;

    const resultswithsolar = document.getElementById("resultsWithSolar");
    resultswithsolar.innerHTML = `
        <h2>With Solar</h2>
        <p>Provider: ${provider}</p>
        <p>Annual Electric Cost: $${yearlyCostWithoutSolar.toFixed(1)}</p>
        <p>Total Annual Production: ${totalAnnualProduction.toFixed(0)} kWh</p>
        <p>Savings: $${savings.toFixed(1)}</p>
        <p>Carbon Footprint Reduction: ${carbonFootprintReduction.toFixed(1)} pounds</p>
        <p>System Size: ${calculateSolarValues.systemSize.toFixed(1)} kW</p>
        <p> Panels Needed: ${calculateSolarValues.panelsNeededWithSolar.toFixed()} </p>`;
}

/* function calculateAndDisplay() {
    const monthlyBill = parseFloat(document.getElementById("monthlyBill").value);
    const solarValues = calculateSolarValues(monthlyBill, zipCodeData);
    displayResults(solarValues);

    //hide the input container and show results only 

};

document.getElementById("monthlyBill").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        calculateAndDisplay();
    }
}); */

function calculateAndDisplay() {
    const monthlyBill = parseFloat(document.getElementById("monthlyBill").value);
    const zipcode = parseInt(document.getElementById("zipcode").value);
    const address = document.getElementById("customerAddress").value;

    // Validate inputs
    if (!monthlyBill || isNaN(zipcode) || !address) {
        alert("Please enter all information");
        return;
    }

    // Call calculateSolarValues function with correct parameters
    const solarValues = calculateSolarValues(monthlyBill, zipCodeData, address, zipcode);

    // Display results
    displayResults(solarValues);

    // Hide the input fields after submitting
    document.getElementById("monthlyBill").style.display = "none";
    document.querySelector('label[for="monthlyBill"]').style.display = "none";
    document.getElementById("customerAddress").style.display = "none";
    document.querySelector('label[for="customerAddress"]').style.display = "none";
    document.getElementById("zipcode").style.display = "none";
    document.querySelector('label[for="zipcode"]').style.display = "none";
    document.querySelector('button[onclick="calculateAndDisplay()"]').style.display = "none";
}

document.getElementById("calculateButton").addEventListener("click", calculateAndDisplay);

document.getElementById("monthlyBill").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        calculateAndDisplay();
    }
});
// google api test
let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value }),
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

window.initMap = initMap;
