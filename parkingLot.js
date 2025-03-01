// Design a parking lot system that supports

//1.Single entry and Exit gates.
//2.Multiple Entry and Exit Gates. The system should manage parking space allocation and vehile tracking efficiently.
class ParkingLot {
  constructor(totalSlots, gates) {
    this.totalSlots = totalSlots;
    this.availableSlots = totalSlots;
    this.gates = gates; // [{entry: true, exit: true}, ...]
    this.parkedVehicles = new Map(); // Map of slot -> vehicle
    this.nextSlot = 0; // Tracks the next available slot
  }

  parkVehicle(vehicleNumber) {
    if (this.availableSlots <= 0) return "No available slots";
    this.parkedVehicles.set(this.nextSlot, vehicleNumber);
    this.availableSlots--;
    return `Vehicle ${vehicleNumber} parked at slot ${this.nextSlot++}`;
  }

  removeVehicle(vehicleNumber) {
    for (let [slot, number] of this.parkedVehicles) {
      if (number === vehicleNumber) {
        this.parkedVehicles.delete(slot);
        this.availableSlots++;
        return `Vehicle ${vehicleNumber} removed from slot ${slot}`;
      }
    }
    return `Vehicle ${vehicleNumber} not found`;
  }

  getAvailableSlots() {
    return this.availableSlots;
  }
}

// Test Cases
let lot1 = new ParkingLot(100, [{ entry: true, exit: true }]);
console.log(lot1.parkVehicle("KA-01-HH-1234")); // Vehicle KA-01-HH-1234 parked at slot 0
console.log(lot1.removeVehicle("KA-01-HH-1234")); // Vehicle KA-01-HH-1234 removed from slot 0
console.log(lot1.getAvailableSlots()); // 100

let lot2 = new ParkingLot(50, [{ entry: true, exit: false }]); // Another instance with 50 slots
console.log(lot2.parkVehicle("KA-02-AB-5678")); // Vehicle KA-02-AB-5678 parked at slot 0
console.log(lot2.getAvailableSlots()); // 49
