const fs = require('fs');
const path = require('path');



fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
});

fs.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    '',
    (err) => {
        if (err) throw err;
    }
); 



const input = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  
input.on('error', error => console.log('Error', error.message));

input.on('data', Data => {

    fs.readdir(path.join(__dirname, 'components'), function(err, items) {
        if (err) throw err;
        for (let i = 0; i < items.length; i++) {
    
        
            const name = path.parse(items[i]).name;
            const file = path.join(__dirname, 'components', items[i]);
            
            const stream = fs.createReadStream(file, 'utf-8');

            let temp = '';
            

            stream.on('data', partData => temp += partData);

            stream.on('end', () => {
                Data = Data.replace(`{{${name}}}`, temp);
                if (i == items.length - 1) {
                    output.write(Data);
                }
                
            });
        }   
    });
});



fs.writeFile(
    path.join(__dirname, 'project-dist', 'style.css'),
    '',
    (err) => {
        if (err) throw err;
    }
); 

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, function(err, items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].isFile() ) {
            if (path.extname(items[i].name) == '.css' || path.extname(items[i].name) == '.scss') {
                fs.readFile(path.join(__dirname, 'styles', items[i].name), "utf8", 
                function(error,data){
                    
                    if(error) throw error; 

                    fs.appendFile(
                        path.join(__dirname, 'project-dist', 'style.css'),
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


const linkAssets = path.join(__dirname, 'assets');
const linkCopyAssets = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
  if (err) throw err;
});


function clearFolder(linkCopyAssets) {
    fs.readdir(linkCopyAssets, { withFileTypes: true }, function(err, items) {
        for (let i = 0; i < items.length; i++) {
            
            if (items[i].isFile()) {
                fs.unlink(path.join(linkCopyAssets, items[i].name), err => {
                    if (err) throw err;
                });
            }  else if (items[i].isDirectory()) {
                clearFolder(path.join(linkCopyAssets, items[i].name));
            }  
            
        }
    });
}

fs.stat(linkCopyAssets, function(err) {
    if (!err) {
        clearFolder(linkCopyAssets);
        copyAssets(linkAssets, linkCopyAssets);
    } else {
        copyAssets(linkAssets, linkCopyAssets);
    }
  
});



function copyAssets(linkAssets, linkCopyAssets) {
    fs.readdir(linkAssets, { withFileTypes: true }, function(err, items) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].isFile()) {
                fs.writeFile(
                    path.join(linkCopyAssets, items[i].name),
                    '',
                    (err) => {
                        if (err) throw err;
                    }
                ); 

                fs.copyFile(path.join(linkAssets, items[i].name), path.join(linkCopyAssets, items[i].name), err => {
                    if (err) throw err;
                }); 
            }  else if (items[i].isDirectory()) {
                fs.mkdir(path.join(linkCopyAssets, items[i].name), { recursive: true }, err => {
                    if (err) throw err;
                });
                copyAssets(path.join(linkAssets, items[i].name), path.join(linkCopyAssets, items[i].name));
            }   
        }
    });
}









