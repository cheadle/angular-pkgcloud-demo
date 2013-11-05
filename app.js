var express = require('express'),
    pkgcloud = require('pkgcloud'),
    fs = require('fs');

var app = express();
app.use(express.logger());

// CONFIG

app.configure(function(){
  app.set('views', __dirname + '/app');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

app.get('/', function(request, response) {
  response.render('index.html')
});

// API

app.get('/containers', function (request, response) {
  var j = { containers: [] };
  var cfg = require('./' + request.query.providerName.toLowerCase());
  var provider = pkgcloud.storage.createClient(cfg);

  provider.getContainers(function (err, containers) {
    if(containers){
      containers.forEach(function(container) {
        j.containers.push({ name: container.name });
      });
      response.json(j);
    }
  });
});

app.post('/upload', function(request, response) {
  var cfg = require('./' + request.body.providerName.toLowerCase());
  var provider = pkgcloud.storage.createClient(cfg);
  var file = request.files.file;

  var upload = provider.upload({
    container: request.body.containerName,
    remote: file.name},
    function (err) {
      if(err) { console.log(err.failCode) };
    });

  var stream = fs.createReadStream(file.path).pipe(upload);

  stream.on('end', function(){
    console.log('STREAM END');
    response.json('ok'); // TODO error handling
  });
});

// app.get('/files', function (request, response) {
//   var j = { files: [] };
//   var cfg = require('./' + request.query.providerName.toLowerCase());
//   var provider = pkgcloud.storage.createClient(cfg);

//   provider.getFiles(request.query.containerName, function (err, files) {
//     files.forEach(function(file) {
//       j.files.push({ name: file.name });
//     });
//     response.json(j);
//   });
// });

// app.get('/download', function (request, response) {
//   amazon.download({
//     container: 'demo-apollo',
//     remote: 'remote-file-name.txt'
//   }).pipe(fs.createWriteStream('a-file2.txt'));
//   response.json('ok');
// });

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});