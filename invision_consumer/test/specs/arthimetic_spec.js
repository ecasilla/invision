var expect     = require('chai').expect;
var Arthimetic = require('../../lib/Arthimetic');
var context    = describe;


describe('Arthimetic: ', function(){

  context('basic assertion',function() {
    it('should be an object',function() {
      expect(Arthimetic).to.be.an('object');
    });
  });
  context('interface',function() {
    it('should have a + method', function(){
     expect(Arthimetic).to.respondTo('+');
    });
  });
  context('implementation',function() {
    it('should return a function on a index lookup', function(){
      expect(Arthimetic['+']).to.be.an('function');
    });
    it('should add strings into numbers', function(){
      expect(Arthimetic['+']('2','2')).to.be.equal(4);
    });
  });
});

