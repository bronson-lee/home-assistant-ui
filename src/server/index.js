const express = require('express')
const path = require('path');

const app = express()
const PORT = 8080 

app.use('/', express.static(path.resolve("./src/server/dist")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})

app.listen(PORT, () => {
    console.log(`Started listening on port ${PORT}`)
})