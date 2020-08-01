const express = require('express')
const app = express()
const scrapping = require('./scrapping-megatlon')
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
    //scrapping.scrapping()
    scrapping.job.start()
    console.log("running on port" )
})