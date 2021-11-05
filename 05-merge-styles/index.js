const fs = require('fs');
const path = require('path');
const link = path.join(__dirname, 'styles');


fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
        if (err) throw err;
    }
); 

fs.readdir(link, { withFileTypes: true }, function(err, items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].isFile() ) {
            if (path.extname(items[i].name) == '.css' || path.extname(items[i].name) == '.scss') {
                fs.readFile(path.join(__dirname, 'styles', items[i].name), "utf8", 
                function(error,data){
                    
                    if(error) throw error; 

                    fs.appendFile(
                        path.join(__dirname, 'project-dist', 'bundle.css'),
                            `${data}\n`,
                            err => {
                                if (err) throw err;
                            }
                        );
                    
                });
            }   
        }     
    }
});
