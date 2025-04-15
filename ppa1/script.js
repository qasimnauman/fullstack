// Helper function to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Asynchronous tasks
async function drive(city) {
  console.log(`🚗 Driving to ${city}...`);
  await delay(2000); // 2 seconds delay
  console.log(`✅ Arrived at ${city}`);
}

async function refuel() {
  console.log("⛽ Refueling...");
  await delay(1500); // 1.5 seconds delay
  console.log("✅ Done refueling");
}

async function eat() {
  console.log("🍽️ Stopping for a meal...");
  await delay(1000); // 1 second delay
  console.log("✅ Done eating");
}

async function sightsee(place) {
  console.log(`📸 Sightseeing at ${place}...`);
  await delay(1800); // 1.8 seconds delay
  console.log(`✅ Done sightseeing at ${place}`);
}

// Main itinerary function
async function roadTrip() {
  console.log("🛣️ Starting road trip...\n");

  await drive("City A");
  await refuel();
  await eat();

  await drive("City B");
  await sightsee("Famous Landmark");
  await eat();

  await drive("City C");
  await refuel();

  console.log("\n🏁 Road trip completed!");
}

// Run the trip
roadTrip();
