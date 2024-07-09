/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-12-04 10:36:14
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-04 14:23:46
 */
let OSS = require('ali-oss')
const fs = require('fs')
const path = require('path')

const {AccessKeyID, AccessKeySecret, region, bucket} = require('./cdnConfig')

let client = new OSS({
  region: region,
  accessKeyId: AccessKeyID,
  accessKeySecret: AccessKeySecret,
  bucket: bucket,
});

const publicPath = path.join(__dirname, '../')

const doUpload = async (key, file) => {
  try {
    let result = await client.put(key, file)
    console.log(result.name + '+++++++' + result.url);
  } catch (e) {
    console.log(e);
  }
}

const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    if (fs.lstatSync(filePath).isDirectory()) {
      if(filePath.includes("node_modules") || filePath.includes(".git")){
        return
      } else {
        return uploadAll(filePath, key)
      }
    }
    doUpload(key, filePath)
  })
}

uploadAll(publicPath)