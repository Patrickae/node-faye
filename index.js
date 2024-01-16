const Faye = require('faye');
let currentVehicle = {}
let vehicleTitle
let currentChannel = '/gaa/vehicles/100830'
const client = new Faye.Client('')

const updateVehicle = ({name, lot, current_price, sold, reserves_off, no_reserve})=>{
  currentVehicle = {name, lot, current_price, sold, reserves_off, no_reserve}
  console.log(currentVehicle)
}
client.on('transport:up', () => console.log('Faye client is up'))
client.subscribe('/gaa/actions', (message) => {
  console.log(`you have received a message`, message)
  if (message.action === 'change_car'){
    client.unsubscribe(currentChannel)
    currentChannel = `/gaa/vehicles/${message.active.id}`
    updateVehicle(message.active)
    client.subscribe(currentChannel, updateVehicle)
  } 
})
client.subscribe(currentChannel, updateVehicle)

