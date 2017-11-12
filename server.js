const Express = require('express');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');
const path = require('path');
const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multipart middleware to 
// parse files
const multipartMiddleware = multipart();

// Replace credentials
// with your Cloudinary credentials
cloudinary.config({
  cloud_name: 'cloud_name',
  api_key: 'api_key',
  api_secret: 'api_secret'
});

app.post('/upload', multipartMiddleware, function(req, res) {
  // Upload image to cloudinary
  cloudinary.v2.uploader.upload(
    // File to upload
    req.files.image.path,
    // Callback function
    function(error, result) {
      res.json({ data: result });
    }
  );
});

// Just uploads the 
// meme impact font to Cloudinary
app.get('/font', (req, res) => {
  cloudinary.v2.uploader.upload(path.resolve(__dirname, './impact.ttf'), {
    resource_type: 'raw',
    type: 'authenticated',
    public_id: 'impact.ttf'
  }, (error, result) => {
    if (error) {
      res.send(error)
      return
    }
    res.json({ data: result });
  });
});

app.listen('4000', () => console.log('Listening'))

module.exports = Webtask.fromExpress(app);
