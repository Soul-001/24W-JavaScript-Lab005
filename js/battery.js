/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
// Additional variable for the robot image element
const robotImage = document.getElementById('robot');

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    // STEP 3b: Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    // STEP 3c: Update the charge level
    let level = (battery.level * 100);
    chargeLevel.textContent = level + "%";
    chargeMeter.value = level;
    
    // Update the robot image based on the battery level
    updateRobotImage(level);
}

// Function to update the robot image based on the battery level
function updateRobotImage(batteryLevel) {
    // Construct the image URL for robohash
    const imageUrl = `https://robohash.org/${batteryLevel}.png`;
    // Set the image src attribute to the new URL
    robotImage.src = imageUrl;
}
// STEP 2a: Using the getBattery() method of the navigator object, 
// create a promise to retrieve the battery information
navigator.getBattery().then(battery => {
    // STEP 2b: See what the battery object contains
    console.log(battery);
    // STEP 3d: Update the battery information when the promise resolves
    updateBatteryStatus(battery);
    // STEP 4a: Event listener for changes to the charging status
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    // STEP 4b: Event listener for changes to the charge level
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});

/* This script adapted from the excellent code examples found at */
