var debug = require('debug');

function Producer(id,loadAmount) {
  debug('dev')('creating producer: ',id);
  this.id = id;
  this.loadAmount = loadAmount || 10;
  this.load = [];
  return this.createWork();
}

Producer.prototype.createWork = function() {
  debug('dev')('producer '+ this.id + ' creating work: ');
  while(this.loadAmount !== this.load.length){
    var arr = {data:[this.random(),"+",this.random(),"="].join(" "),owner:"Producer: " + this.id};
    this.load.push(arr);
  }
};

Producer.prototype.random = function() {
  return Math.floor(Math.random() * 40000)
}

module.exports = Producer;
