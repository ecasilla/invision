var debug = require('debug');
var async = require('async');


function Consumer() {
  this.q = async.queue(this.process,50);
}

var arthimetic = {
  '+':function(x,y){return x + y},
  '-':function(x,y){return x - y},
  '*':function(x,y){return x * y},
  '/':function(x,y){return x / y}
}
Consumer.prototype.process = function(task,callback) {
 debug('dev')("Processing item from: " + task.owner);
 var data = task.data.split(" ");
 var int1 = Number(data[0]);
 var operator = data[1];
 var int2 = Number(data[2]);
 var temp = arthimetic[operator](int1,int2);
 var result = data.join("")+ " " + temp;
 debug('dev')("Result: " + result);
 return callback();
}

Consumer.prototype.enqueue = function(item,cb) {
  return this.q.push(item,cb);
}

module.exports = new Consumer();
