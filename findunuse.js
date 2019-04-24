const fs = require('fs');
const path = require("path");

function findMatch(pa, fileName) {
  fs.readdir(pa, (err, menu) => {
    if (!menu)
      return;
    menu.forEach((ele) => {
      if (ele == 'node_modules' || ele.match(/findunuse.js/)) { //忽略的文件和文件夹
        return;
      } else {
        fs.stat(pa + "/" + ele, (err, info) => {
          if (info.isDirectory()) { //文件夹则进入下一层
            findMatch(pa + "/" + ele,fileName);
          }else{
            if (!ele.match(/\.html|\.js|\.css/)) {
              //console.log(ele)
              return;
            }else{
              let pathTemp = path.join(pa, ele);
              let fileContent = fs.readFileSync(pathTemp, 'utf-8'); //读取页面内容
              var re =new RegExp("\/"+fileName); //文件名正则
              if(fileContent.match(re)){ 
                flag = false;
                return;
              }
            } 
          }
        })
      }
    })
  });
}
var  flag =true,i=0;
function readDir(pa) {
  fs.readdir(pa, (err, menu) => {
    if (!menu)
      return;
    menu.forEach((ele) => {
      if (ele == 'node_modules' || ele.match(/findunuse.js/)) { //忽略的文件和文件夹
        return;
      } else {

        fs.stat(pa + "/" + ele, (err, info) => {
          if (info.isDirectory()) { //文件夹则进入下一层
            readDir(pa + "/" + ele);
          } else {
            if (ele.match(/\.html/)) {
              return;
            } else {
              i++;
              console.log(i)
              flag = true;
              findMatch(path.join(__dirname),ele);
              if(flag){
                console.log(ele);
              }
            }
          }
        });
      }
    });
  });
}

readDir(path.join(__dirname));