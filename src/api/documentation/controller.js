var path = require('path');


var path = require('path');
var fileUrl = require('file-url');

export const index = (req, res, next) => {
  // res.sendFile(path.join(__dirname + '../../../../docs/index.html'))
  console.log(__dirname + '../../../../docs/index.html')
  console.log(req.url)
  // res.redirect('https://www.google.com')

  // res.sendFile('index.html', {root: './docs'})
  fileUrl('./docs/index.html')
  // res.redirect(__dirname + '../../../../docs/index.html')
  // console.log('file://' + __dirname + '../../../../docs/index.html')
  // res.redirect('https://www.google.com')
  // req.url = 'file://' + __dirname + '../../../../docs/index.html'

  // next()
  // const fs = require('fs');
  // fs.readFile('./docs/index.html', 'utf8', function(err, data) {
  //   res.send(data)
  // })
}
  // res.status(200).json([])
//   function fileUrl(str) {
//     if (typeof str !== 'string') {
//         throw new Error('Expected a string');
//     }

//     var pathName = path.resolve(str).replace(/\\/g, '/');

//     // Windows drive letter must be prefixed with a slash
//     if (pathName[0] !== '/') {
//         pathName = '/' + pathName;
//     }

//     return encodeURI('file://' + pathName);
// };
