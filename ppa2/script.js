// Helper function to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Async task functions
async function prepareAppetizer() {
  console.log("🍽️ Starting appetizer preparation...");
  await delay(1500); // Simulate 1.5 seconds for prep/cook
  console.log("✅ Appetizer is ready!");
}

async function cookMainCourse() {
  console.log("🍛 Starting main course preparation...");
  await delay(2500); // Simulate 2.5 seconds for prep/cook
  console.log("✅ Main course is ready!");
}

async function makeDessert() {
  console.log("🍰 Starting dessert preparation...");
  await delay(2000); // Simulate 2 seconds for prep/cook
  console.log("✅ Dessert is ready!");
}

// Main async function to run the dinner sequence
async function prepareDinnerParty() {
  console.log("🎉 Dinner party preparation begins!\n");

  await prepareAppetizer();
  await cookMainCourse();
  await makeDessert();

  console.log("\n🥳 All courses are ready! Dinner is served.");
}

// Run the process
prepareDinnerParty();
