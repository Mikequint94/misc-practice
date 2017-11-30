const express = require('express')
const app = express()
const path = require('path');

const fetch = require("request");


app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.render('index.html');
})
let plantData;
const options = { method: 'POST',
  url: 'https://aurorasolar-monitoring-task.herokuapp.com/plant_overview',
  headers: 
  { 'cache-control': 'no-cache',
  'content-type': 'application/x-www-form-urlencoded' },
  form: 
  { password: '76adb77b86d44e7a9f6addde889553df',
  candidate: 'HHAB14132' }
};

fetch(options, (error, response, body) => {
  if (error) throw new Error(error);
  plantData = JSON.parse(body);
});
app.get('/plant_overview', function(req, res) {
    res.json(plantData);
})
app.get('/component_list', (req, res) => {
  let components = [];
  plantData.forEach(entity => components.push({type: entity.type, name: entity.device_name}));
  res.json(components);
})
app.get(`/channel_list/:component`, (req, res) => {
  let componentChannels = plantData.filter(
    entity => entity.device_name == req.params.component
  );
  res.json(componentChannels[0]);
})
app.get(`/data_point/:device/:channel`, (req, res) => {
  
  const options = { method: 'POST',
    url: 'https://aurorasolar-monitoring-task.herokuapp.com/entity_data',
    headers: 
     { 'cache-control': 'no-cache',
       'content-type': 'application/x-www-form-urlencoded' },
    form: 
     { password: '76adb77b86d44e7a9f6addde889553df',
       candidate: 'HHAB14132',
       entity: req.params.device,
       channel: req.params.channel
      } };
      
  fetch(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.json(body);
  });
       
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})




