const fs = require('fs');
const path = require("path");
const basePath = path.join(__dirname,'output.txt');
let fileContentArr = fs.readFileSync(basePath, 'utf-8').split("\n");
fileContentArr.forEach((file)=>{
  if(file){
    fs.unlink(file,(err)=>{
      if(err) console.error(err);
    });
  }
});