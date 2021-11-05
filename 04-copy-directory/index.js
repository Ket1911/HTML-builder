const fs = require('fs');
const path = require('path');
const link = path.join(__dirname, 'files');
const linkCopy = path.join(__dirname, 'files-copy');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if (err) throw err;
});

fs.readdir(linkCopy, function(err, items) {
    for (let i = 0; i < items.length; i++) {
        fs.unlink(path.join(linkCopy, items[i]), err => {
            if (err) throw err;
          });
    }
});

fs.readdir(link, { withFileTypes: true }, function(err, items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].isFile()) {
            fs.writeFile(
                path.join(__dirname, 'files-copy', items[i].name),
                '',
                (err) => {
                    if (err) throw err;
                }
            );  
        }  

        fs.copyFile(path.join(__dirname, 'files', items[i].name), path.join(__dirname, 'files-copy', items[i].name), err => {
            if (err) throw err;
        });
    }
});
