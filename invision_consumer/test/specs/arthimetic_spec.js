var expect     = require('chai').expect;
var Arthimetic = require('../../lib/Arthimetic');

describe('Arthimetic: ', function(){

  it('should be an object',function() {
    expect(Arthimetic).to.be.an('object');
  });
  it('should return a function on a index lookup', function(){
    expect(Arthimetic['+']).to.be.an('function');
  });
  it('should add strings into numbers', function(){
    expect(Arthimetic['+']('2','2')).to.be.equal(4);
  });
});

