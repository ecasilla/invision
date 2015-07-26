var debug = require('debug')('dev');
var async = require('async');


function Producer(id) {
  debug('creating producer: ',id);
  this.id = id || 1;
}

Producer.prototype.createWork = function(callback) {
  debug('producer '+ this.id + ' creating work: ');
  var self = this;
  var payload = {data:[self.random(),"+",self.random(),"="].join(" "),owner:"Producer: " + self.id};
  return callback(null,payload);
};

Producer.prototype.random = function() {
  return Math.floor(Math.random() * 40000)
}

module.exports = Producer;
