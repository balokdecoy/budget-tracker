// Import required path dependency
const path = require("path");

module.exports = (app) => {

    // Set home route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    })
}