/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2020-01-12 20:13:30
 * @LastEditors  : suckson
 * @LastEditTime : 2020-01-12 22:04:22
 */
/* eslint-disable no-console */
/*
 * @Descripttion:
 * @version:
 * @Author: suckson
 * @Date: 2019-12-27 12:23:10
 * @LastEditors  : suckson
 * @LastEditTime : 2019-12-27 14:27:33
 */
const path = require('path')
const fsPromise = require('fs').promises
const fs = require('fs')

const join = (url) => {
  return path.join(__dirname + url)
}

const fileHelper = {
  readFile: (path) => {
    return fsPromise.readFile(path, { encoding: 'utf-8' })
  },
  writeFile: (path, content) => {
    return fsPromise.writeFile(path, content, { encoding: 'utf-8' })
  },
  renameFile: (path, newPath) => {
    return fsPromise.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fsPromise.unlink(path)
  },
  copyFile: (path, newPath) => {
    return fsPromise.copyFile(path, newPath)
  }
}

const objectToJson = (url) => {
 
}

const publicPath = path.join(__dirname, '../blog_mp3')

let Arr = []
let cdnUrl = 'http://alicdn.suckson.com/'
const doUpload = async (file) => {
  try {
  let name = file.split(".")[0].split("-")
    let obj = {
      name:name[1],
      artist: name[0],
      url: cdnUrl + 'blog_mp3/' + file,
      cover:cdnUrl + 'blog_mp3/img/' + name[0] + '.png',
      lrc: cdnUrl + 'blog_mp3/lrc/'+file.split(".")[0] + '.lrc'
    }
    Arr.push(obj) 
  } catch (e) {
    console.log(e);
  }
}

const makeJson = (dir) => {
    const files =  fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      if (fs.lstatSync(filePath).isDirectory()) {
       console.log("文件夹")
      }else{
        let Arr = filePath.split('\\')
        doUpload(Arr[Arr.length - 1])
      }
  })
  fileHelper.writeFile(join("mp3List.json"), JSON.stringify(Arr)).then(res => {
    console.log('json  list ok!')
  })
}

makeJson(publicPath)