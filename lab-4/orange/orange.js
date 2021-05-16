let bitsUtils = require('bits-utils');
let {
  loadWords,
  getCodes,
  getInvertedCodes,
  decodeOneWord,
  encodeOneWord
} = require('../lib/lib');
const chalk = require('chalk');
let axios = require('axios');
const fs = require('fs');
const kiwiUrl = 'http://localhost:3001';
const filename = '../lib/common-words.txt';
const words = loadWords(filename);
const codes = getCodes(words);
var Parser = require("binary-parser").Parser;
let { app } = require('./server-config');
const timestamp = require('time-stamp');

function sendWord(word) {
    const binaryData = encodeOneWord(word, codes);

    fs.appendFile('orangeToFile.txt', bitsUtils.printBuffer(binaryData) + '\r\n', function (err) {
      if (err) throw err;
      console.log( bitsUtils.printBuffer(binaryData) + ' saved to file!');
    });  // Append data

  console.log(
    `The binary code for ${chalk.blueBright(word)} is ${chalk.blueBright(
      bitsUtils.printBuffer(binaryData)
    )}`
  );

  console.log(
    `Sending ${chalk.blueBright(
      bitsUtils.printBuffer(binaryData)
    )} to ${chalk.greenBright('kiwi')}`
  );
  axios
    .post(`${kiwiUrl}/compressed`, binaryData, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
    .then(res => {
      console.log(
        `Response from ${chalk.greenBright('kiwi')}: "${res.data.status}"`
      );
    });
}

function sendText(text) {
  axios
    .post(`${kiwiUrl}/text`, text, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
    .then(res => {
      console.log(
        `Response from ${chalk.greenBright('kiwi')}: "${res.data.status}"`
      );
    });
}

function sendFromFile(){
    try {
      const data = fs.readFileSync('fileToReadFrom.txt', 'utf8')
      return data.toString();
      //return data
    } catch (err) {
      console.error(err)
    }
}
sendWord('give');
sendWord('this');
sendWord(' ');
sendWord('\r\n'); //https://stackoverflow.com/questions/1761051/difference-between-n-and-r
sendWord('because');
sendWord('have');

sendFromFile();

sendText('give');
sendText('this\r\nbecause');


sendText(sendFromFile()+'');