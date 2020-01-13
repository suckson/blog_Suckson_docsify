/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2020-01-13 09:12:12
 * @LastEditors  : suckson
 * @LastEditTime : 2020-01-13 14:29:13
 */
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

const publicPath = path.join(__dirname, '../blog_mp3/lrc')

const doUpload = async (file) => {
  try {
    let newName = file.split(".")[0] + ".txt"
    fileHelper.renameFile(file,newName).then(res => {
      console.log(res)
    })
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
        doUpload(filePath)
      }
  })

}

makeJson(publicPath)