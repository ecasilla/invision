var debug      = require('debug')('dev');
var async      = require('async');
var Arthimetic = require('./Arthimetic');
var _this;


/**
 * @description The Consumer constructor function
 * @class
 */
function Consumer() {
  _this = this;
  this.q = async.queue(_this.process,50);
  this.q.drain = this.drain;
}

/**
 * @description The Consumer constructor function
 * @param {Object} the current task being processed in the queue
 * @param {function} A callback function
 * @callback
 * @param {Error} A representation of an error that occurred during processing
 * @param{Object} The result of computing the task
 */
Consumer.prototype.process = function(task,callback) {
 debug('Processing item from: ' + task.owner);
 var data     = _this.normalize(task);
 if (data === '') {
    var err = new Error('Could not parse task from: ' + task.owner);
   return async.ensureAsync(callback(err));
 }
 var int1     = data[0];
 var operator = data[1];
 var int2     = data[2];
 var temp     = Arthimetic[operator](int1,int2);
 var result   = data.join('') + temp;
 return async.ensureAsync(callback(null,result));
};

/**
 * @description The normalize function is a helper function to ensure expression consistency
 * @param{Object} The current task payload being processed
 * @returns{Object|String} If it all worked out then it return the object back otherwise it return an empty string
 */
Consumer.prototype.normalize = function(obj){
  var data     = obj.data.split(' ');
  var int1     = Number(data[0]);
  var operator = data[1];
  var int2     = Number(data[2]);
  data[0] = int1;
  data[2] = int2;
  if (Number.isNaN(int1) || Number.isNaN(int2) ) {
    debug('Could not normalize numbers moving on ' + data);
    return '';
  }else if(!Arthimetic[operator]){
  debug('Could not normalize operator moving on ' + data);
    return '';
  }else{
    return data;
  }
};


/**
 * @description This function adds a item to the queue to be process when a worker is ready
 * @param {Object} the current item being added to the queue
 * @param {function} A callback function
 * @callback
 * @param {Object} the current item that was just processed
 */
Consumer.prototype.enqueue = function(item,cb) {
  debug('enqueuing item: ' + JSON.stringify(item) );
  return _this.q.push(item,cb);
};

/**
 * @description The drain function is called once the queue is empty
 */
Consumer.prototype.drain = function() {
  if (_this.q.length() === 0) {
    debug('I\'m finished');
  }
};

module.exports = new Consumer();
