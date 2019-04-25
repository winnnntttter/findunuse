const fs = require('fs');
const path = require("path");
const nowPath = path.join(__dirname);


/* function findMatch(pa, fileName) {
  console.log(pa)
  fs.readdir(pa, (err, menu) => {
    console.log(!menu)
    if (!menu)
      return;
    menu.forEach((ele) => {
      if (ele == 'node_modules' || ele == '.git' || ele == '.vscode') { //忽略的文件和文件夹
        return;
      } else {
        fs.stat(pa + "/" + ele, (err, info) => {
          console.log(ele)
          if (info.isDirectory()) { //文件夹则进入下一层
            findMatch(pa + "/" + ele, fileName);
          } else {
            console.log(ele)
            if (!ele.match(/\.html|\.js|\.css/)) {
              console.log(ele)
              return;
            } else {
              let pathTemp = path.join(pa, ele);
              let fileContent = fs.readFileSync(pathTemp, 'utf-8'); //读取页面内容
              console.log(fileContent)
              var re = new RegExp("\/" + fileName); //文件名正则
              if (fileContent.match(re)) {
                flag = false;
                console.log(flag)
                return;
              }
            }
          }
        })
      }
    })
  });
} */


function findMatch(pa, fileName) {
  var menu = fs.readdirSync(pa);
  if (menu) {
    menu.forEach((ele) => {
      if (ele == 'node_modules' || ele == '.git' || ele == '.vscode'||ele == 'findunuse.js') { //忽略的文件和文件夹
        return;
      } else {
        let pathTemp = path.join(pa, ele)
        if (fs.statSync(pathTemp).isDirectory()) {
          findMatch(pathTemp, fileName);
        } else {
          if (!ele.match(/\.html|\.js|\.css/)) {
            return;
          } else {
            let fileContent = fs.readFileSync(pathTemp, 'utf-8'); //读取页面内容
            var re = new RegExp("\/" + fileName); //文件名正则
            if (fileContent.match(re)) {
              flag = false;
              return;
            }
          }
        }
      }
    });
  }
}




var flag = true;

function readDir(pa) {
  fs.readdir(pa, (err, menu) => {
    if (!menu)
      return;
    menu.forEach((ele) => {
      if (ele == 'node_modules' || ele == '.git' || ele == '.vscode' || ele == 'findunuse.js') { //忽略的文件和文件夹
        return;
      } else {
        let fileNow = path.join(pa,ele);
        fs.stat(fileNow, (err, info) => {
          if (info.isDirectory()) { //文件夹则进入下一层
            readDir(fileNow);
          } else {
            if (ele.match(/\.html/)) {
              return;
            } else {
              flag = true;
              findMatch(nowPath, ele);
              if (flag) {
                console.log(ele);
              }
            }
          }
        });
      }
    });
  });
}

readDir(nowPath);