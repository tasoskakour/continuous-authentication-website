var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

module.exports = function(app, express) {

    var myLoremRouter = express.Router();

    var loremParagraph = '';

    // HTTP POST Accessed at localhost:8081/mylorem
    myLoremRouter.post('/', function(req, res) {

        if (req.body.loremRoute == null) {
            res.json({ success: false, message: 'Missing loremRoute' })
            return;
        }
        console.log(req.body);
        // get the random text from faux-texte.com
        var body = '';
        http.get({
                host: 'www.faux-texte.com',
                port: 80,
                path: req.body.loremRoute + '.html'
            }, function(resp) {
                resp.on('data', function(chunk) {
                    body += chunk;
                });
                resp.on('end', function(chunk) {
                    var $ = cheerio.load(body);
                    loremParagraph = $('div.Texte').text();
                    // loremParagraph = loremParagraph.replace(/(\r\n|\n|\r|\t|\.|\,|\'|\")/gm, "");
                    res.json({ message: loremParagraph });
                    console.log(loremParagraph);
                });
            })
            .on('error', function(e) {
                // handle/send error
                res.send(e.message);
            });

    });

    //HTTP GET Accessed at localhost:8081/mylorem/img
    // Acquire a 400x200 random image from the web and send it to client
    myLoremRouter.get('/img', function(req, res) {
        // res.json({ message: 'hello' });

        var imagedata = ''


        http.get({
                host: 'lorempixel.com',
                port: 80,
                path: '/250/250/'
            }, function(resp) {

                resp.setEncoding('binary');

                resp.on('data', function(chunk) {
                    imagedata += chunk;
                    // console.log(chunk);
                });
                resp.on('end', function() {
                    fs.writeFile('logo.jpeg', imagedata, 'binary', function(err) {
                        if (err) throw err
                        console.log('File saved.')
                            // res.set('Content-Type', 'image/jpeg');
                            // res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.sendFile(path.join(__dirname, '../..', 'logo.jpeg'));
                        console.log('Image sent to client.');
                    })

                });
            })
            .on('error', function(e) {
                // handle/send error
                res.send(e.message);
            });

    });

    return myLoremRouter;
};