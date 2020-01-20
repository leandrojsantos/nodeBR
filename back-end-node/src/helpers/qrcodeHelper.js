#!/usr/bin/env node

//const nanoid = require('nanoid');

var qr = require('./lib/qr');
var url = 'https://mdbapi2.herokuapp.com/PPqDLXb'
var text = 'arredor@'

var ec_level = 'H'

var fs = require('fs')
function file(name) {
    return fs.createWriteStream(text + name)
}

qr.image(url, { type: 'pdf', ec_level: ec_level}).pipe(file('qr.pdf'))