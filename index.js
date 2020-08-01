const express = require('express')
const app = express()
const CronJob = require('cron').CronJob;
const scrapping = require('./scrapping-megatlon')
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
    scrapping.scrapping()
    const job = new CronJob('0 0 * * 1,3-6', function() {
        const d = new Date();
      console.log('At midnigth', d);
      scrapping.scrapping()
    });
    console.log('After job instantiation');
    job.start();
    console.log("running on port" )
})