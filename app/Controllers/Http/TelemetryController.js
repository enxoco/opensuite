'use strict'
const fs = require('fs');

class TelemetryController {

    async PostTelemetry ({ request }) {

        fs.appendFile('telemetry.txt', JSON.stringify(request.all()), function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    }

}

module.exports = TelemetryController