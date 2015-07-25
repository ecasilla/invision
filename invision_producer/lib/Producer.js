var debug = require('debug')('dev');
var async = require('async');

function Producer(id) {
  debug('creating producer: ',id);
  this.id = id || 1;
  this.loadAmount = loadAmount || 10;
  this.load = [];
  return this.createWork();
}

Producer.prototype.createWork = function() {
  debug('producer '+ this.id + ' creating work: ');
  var self = this;
  async.whilst(
   function(){return self.loadAmount !== self.load.length},
   function(callback){
    var payload = {data:[self.random(),"+",self.random(),"="].join(" "),owner:"Producer: " + self.id};
    self.load.push(payload);
    callback();
   }
  )
};

Producer.prototype.random = function() {
  return Math.floor(Math.random() * 40000)
}

module.exports = Producer;
