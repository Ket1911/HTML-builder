const fs = require('fs');
const path = require('path');
const link = path.join(__dirname, 'secret-folder');


fs.readdir(link, { withFileTypes: true }, function(err, items) {

    for (let i = 0; i < items.length; i++) {

        if (items[i].isFile()) {
            fs.stat(path.join(link, items[i].name), function(err, it) {
                
                console.log(`${path.parse(items[i].name).name} - ${path.extname(items[i].name).slice(1)} - ${Math.round((it.size / 1024) * 1000) / 1000}kb`);
            });
        }  
    }
});



