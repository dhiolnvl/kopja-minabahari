const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.next' && name !== '.git') {
            walkSync(filePath, callback);
        }
    });
}

walkSync('.', function(filePath, stat) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.sql')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('<<<<<<< HEAD')) {
            console.log('Fixing ' + filePath);
            // Replace keeping HEAD side
            content = content.replace(/<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [0-9a-f]+\r?\n/g, '$1');
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});
console.log('Done.');
