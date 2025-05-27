// SYNCRONOUS
console.log("Console 01")
console.log("Console 02")
console.log("Console 03")

// ASYNCRONOUS
console.log("Console 01")
setTimeout(() => {
    console.log("Console 02")
}, 5000)
console.log("Console 03")