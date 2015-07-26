var debug      = require('debug')('dev');
var async      = require('async');
var Agent        = require('agentkeepalive');
var request    = require('superagent');
var Arthimetic = require('./Arthimetic');
var _this;

var keepaliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000,
  keepAliveTimeout: 60000 
});
function Consumer() {
  _this = this;
  this.q = async.queue(_this.process,50);
  this.q.drain = this.drain;
}

Consumer.prototype.process = function(task,callback) {
 debug("Processing item from: " + task.owner);
 var data     = _this.normalize(task);
 var int1     = data[0];
 var operator = data[1];
 var int2     = data[2];
 var temp     = Arthimetic[operator](int1,int2);
 var result   = data.join("") + temp;
 return callback(null,result);
}

Consumer.prototype.send = function(item,callback){
 request
  .post('http://localhost:3000')
  .set('Content-Type', 'application/json')
  .agent(keepaliveAgent)
  .send({computed:item})
  .end(callback)
}

Consumer.prototype.normalize = function(str){
  var data     = str.data.split(" ");
  var int1     = Number(data[0]);
  var operator = data[1];
  var int2     = Number(data[2]);
  if (Number.isNaN(int1) || Number.isNaN(int2) ) {
    debug("Could not normalize numbers moving on " + data)
    return "";
  }else if(!operator){
  debug("Could not normalize operator moving on " + data)
    return "";
  }else{
    return data;
  }
}

Consumer.prototype.enqueue = function(item,cb) {
  debug('enqueuing item: ' + JSON.stringify(item) );
  return _this.q.push(item,cb);
}

Consumer.prototype.drain = function() {
  if (_this.q.length() === 0) {
    debug('I\'m finished');
  }
}

module.exports = new Consumer();
