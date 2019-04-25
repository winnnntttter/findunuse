const fs = require('fs');
const path = require("path");
const basePath = path.join(__dirname);
const fileFilter = function(ele){
  return ele == 'node_modules' || ele == '.git' || ele == '.vscode' || ele == 'findunuse.js' || ele == 'output.txt' || ele == 'deleteFile.js';
}

/* function findMatch(pa, fileName) {
  fs.readdir(pa, (err, menu) => {
    if (!menu)
      return;
    menu.forEach((ele) => {
      if (ele == 'node_modules' || ele == '.git' || ele == '.vscode') { //忽略的文件和文件夹
        return;
      } else {
        fs.stat(pa + "/" + ele, (err, info) => {
          if (info.isDirectory()) {
            findMatch(pa + "/" + ele, fileName);
          } else {
            if (!ele.match(/\.html|\.js|\.css/)) {
              return;
            } else {
              let pathTemp = path.join(pa, ele);
              let fileContent = fs.readFileSync(pathTemp, 'utf-8');
              var re = new RegExp("\/" + fileName);
              if (fileContent.match(re)) {
                flag = false;
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
      if (fileFilter(ele)) { //忽略的文件和文件夹
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

var flag = true,
  resultText = '',L = 0,L2=0;

function readDir(pa) {
  fs.readdir(pa, (err, menu) => {
    if (!menu)
      return;
      L2+=menu.length;
    menu.forEach((ele) => {
      if (fileFilter(ele)) {
        return;
      } else {
        let fileNow = path.join(pa, ele);
        fs.stat(fileNow, (err, info) => {
          if (info.isDirectory()) { //文件夹则进入下一层
            readDir(fileNow);
          } else {
            if (ele.match(/\.html/)) {
              return;
            } else {
              flag = true;
              findMatch(basePath, ele);
              if (flag) {
                console.log(ele)
                resultText += fileNow + '\n';
                /* var a= fs.createWriteStream(path.join(basePath,'output.txt'))
                a.write(resultText) */
                if(L2 == L){
                  console.log("done!")
                  fs.writeFile(path.join(basePath, 'output.txt'), resultText, function (err) {
                    if (err) console.err(err);
                  });
                }
                
              }
            }
          }
        });
      }
    });
  });
}

function getAllLength(pa) {
  var menu = fs.readdirSync(pa);
  if (!menu)
    return;
  L += menu.length;
  menu.forEach((ele) => {
    if (fileFilter(ele)) { //忽略的文件和文件夹
      return;
    } else {
      let pathTemp = path.join(pa, ele)
      if(fs.statSync(pathTemp).isDirectory()){
        getAllLength(pathTemp);
      }
    }
  });
}
getAllLength(basePath);
readDir(basePath);