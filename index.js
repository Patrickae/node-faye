const Faye = require('faye');
const client = new Faye.Client('https://faye.auctionaccelerate.com/faye')

const updateVehicle = (vehicleMessage)=>{
  console.log(vehicleMessage)
}
client.on('transport:up', () => console.log('Faye client is up'))

client.subscribe('/gaa/broadcast-data/QSOcmbZFvg', updateVehicle)

