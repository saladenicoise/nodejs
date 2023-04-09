// We need this to call the script from the command line
const consumeFromPollingQueue = require("../../rabbitmq-utility/alert-service/consumer-alert-polling");
const weatherRetrievalAPIsStub = require("../../weather-utility/weatherRetrievalAPIsStub");
const publish = require("../../rabbitmq-utility/alert-service/produce-alert-pushing");
require('console-stamp')(console, '[HH:MM:ss.l]');

function pingCreateAlerts(data) {
    const alertObj = weatherRetrievalAPIsStub(data);
    // console.log('Debugging pingCreateAlerts, data=', JSON.stringify(data));
    
    // parse alertObj into message
    const alert = { "location": alertObj.location, "alertContent": alertObj.content };
    const dataStr = JSON.stringify(alert);
    publish(dataStr);
}

consumeFromPollingQueue("alerts-polling-queue", pingCreateAlerts);