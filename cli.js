#!/usr/bin/env node
const program = require('commander')
const Client = require('ftp')
const path = require('path')
const fs = require('fs')
const client = new Client()
const config = {
  host: '123.456.234.8',
  user: 'test_html',
  password: '123456',
}
var fileArr = [] // all file array
var localPath
var serverPath
var positivePath
var filename

program
  .version('0.0.1')
  .description('recons-code uploader')
  .usage('<command> [catalog]')
program // upload single file
  .command('upload [catalog]')
  .description('recons-code uploader for single file')
  .action(function (catalog, command) {
    try {
      console.log('Your uploading file is  ', catalog)
      console.log(`Updoading ${catalog} →→→→  start`)
      localPath = `./${catalog}`
      serverPath = `/testfgdesigner.1sju.com/`
      // the directory need to parse
      var filePath = path.join(__dirname, localPath)
      console.log('filePath', filePath)
      // use fileParser function
      client.on('ready', function() {
        positivePath = filePath.replace(__dirname, '')
        var arr = localPath.split('/')
        filename = arr[arr.length - 1]
        let url = path.join(serverPath, positivePath)
        url = url.replace(filename, '')
        url = url.replace(/\\/g, '/')
        client.cwd(url, function(err, currentDir) {
          if (err) {
            console.log(err)
          } else {
            client.put(filePath, filename, function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log(filename + ' has uploaded')
              }
            })
          }
        })
      })
      client.connect(config)
    } catch (e) {
      console.log(`updoading ${catalog} →→→→  fail`)
    }
  })
program // upload catalog
  .command('build [catalog]')
  .description('recons-code uploader for the whole catalog')
  .action(function (catalog, command) {
    try {
      console.log('Your uploading catalog is  ', catalog)
      console.log(`updoading ${catalog} →→→→  start`)
      localPath = `./${catalog}`
      serverPath = `/testfgdesigner.1sju.com/`
      // the directory need to parse
      var filePath = path.join(__dirname, localPath)
      console.log('filePath', filePath)
      fileDisplay(filePath)
      setTimeout(function () {
        client.on('ready', function() {
          function upload (filePath, fileArr, index) {
            positivePath = filePath.replace(__dirname, '')
            var arr = filePath.split('\\')
            filename = arr[arr.length - 1]
            let url = path.join(serverPath, positivePath)
            console.log('url', url)
            console.log('filename', filename)
            url = url.replace(filename, '')
            url = url.replace(/\\/g, '/')
            client.cwd(url, function(err, currentDir) {
              if (err) {
                console.log(err)
              } else {
                client.put(filePath, filename, function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    if (fileArr[index + 1]) { // exist next file
                      upload(fileArr[index + 1], fileArr, index + 1)
                      console.log(filename + ' has uploaded')
                    } else {
                      console.log('All is uploaded')
                    }
                    // 进入下个要上传的文件
                  }
                })
              }
            })
          }
          upload(fileArr[0], fileArr, 0)
        })
        client.connect(config)
      }, 2000)
      // use fileParser function
    } catch (e) {
      console.log(`updoading ${catalog} →→→→  fail`)
    }
  })


program.parse(process.argv)

if (!program.args.length) program.help()




/**
 * file-map method
 * @param filePath the file-path need to parse
 * @return  fileArr [array]
 */
function fileDisplay (filePath) {
  fs.readdir(filePath, function(err, files) {
    if(err){
      console.warn(err)
    } else {
      files.forEach( function (filename) {
        var filedir = path.join(filePath,filename)
        fs.stat(filedir, function(eror, stats){
          if(eror){
            console.warn('获取文件stats失败')
          } else {
            var isFile = stats.isFile()
            var isDir = stats.isDirectory()
            if (isFile) {
              fileArr.push(filedir)
            }
            if (isDir) {
              fileDisplay(filedir) // find the below file
            }
          }
        })
      })
    }
  })
}