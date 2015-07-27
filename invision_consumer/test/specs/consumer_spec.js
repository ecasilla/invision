var expect   = require('chai').expect;
var sinon    = require('sinon');
var Consumer = require('../../lib/Consumer');
var context  = describe;

describe('Consumer: ', function(){
  var mockData,sandbox;

  beforeEach(function() {
    mockData = {owner:'Producer1',data:'2 + 2 ='};
    sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    mockData = null;
    sandbox = sandbox.restore();
  });
  context('basic assertion',function() {
    it('should be an object',function() {
      expect(Consumer).to.be.an('object');
    });
  });
  context('interface',function() {
    it('should have a process() method', function(){
      expect(Consumer).to.respondTo('process');
    });
    it('should have a send() method', function(){
      expect(Consumer).to.respondTo('send');
    });
    it('should have a normalize() method', function(){
      expect(Consumer).to.respondTo('normalize');
    });
    it('should have a enquque() method', function(){
      expect(Consumer).to.respondTo('enqueue');
    });
    it('should have a drain() method', function(){
      expect(Consumer).to.respondTo('drain');
    });
  });
  context('implementation',function() {

    it('should process a basic math expression', function(done){
      Consumer.process(mockData,function(err,data){
       expect(err).to.be.equal(null);
       expect(data).to.be.equal('2+2=4');
       done();
      });
    });
    
    it('should normalize the a string', function(){
      var normalized = Consumer.normalize(mockData);
      expect(normalized[0]).to.be.an('number');
      expect(normalized[2]).to.be.an('number');
    });

    it('should return an empty string if it can\'t normalize one of the numbers', function(){
      var normalized = Consumer.normalize({data:'1 + a ='});
      expect(normalized).to.be.equal('');
    });

    it('should return an empty string if it can\'t normalize the operator', function(){
      var normalized = Consumer.normalize({data:'1 ? a ='});
      expect(normalized).to.be.equal('');
    });

    it('should queue an item to be processed', function(done){
     var stub = sandbox.stub(Consumer.q,'push');
     stub.yields(null,{owner:mockData.owner,data:'2+2=4'}); 
     Consumer.enqueue(mockData,function(err,item){
       expect(stub.getCall(0).args[0]).to.equal(mockData);
      done();
     });
    });
  });
});
