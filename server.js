#!/usr/bin/env node

var path = require('path')
var connect = require('connect')
var serveStatic = require('serve-static')

var port = process.env.PORT || 8080
var app = connect()

app.use('/bower_components', serveStatic(path.join(__dirname, '/bower_components')))
app.use(serveStatic(__dirname+'/dist'))
app.listen(port)

console.log('Listening on port', port)
