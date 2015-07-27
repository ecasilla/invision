var expect = require('chai').expect;
var ProductionFactory = require('../../lib/ProductionFactory');
var context = describe;


describe('The production factory: ', function(){
  var factory;
  beforeEach(function(){
   factory = new ProductionFactory(2);
  });
  afterEach(function(){
    factory = null;
  });
  context('basic assertion',function() {
    it('should be an object', function(){
      expect(factory).to.be.an('object');
    });
    it('should be an instance of the ProductionFactory', function(){
      expect(factory).to.be.an.instanceof(ProductionFactory);
    });
  });
  context('interface',function() {
    it('should have a create() method', function(){
      expect(factory).to.respondTo('create');
    });
  });
  context('implementation',function() {
    it('should create 2 producers', function(){
      var producers = factory.create(2);
      expect(producers.length).to.equal(2);
    });
    it('should create n number of producers', function(){
      var subject = new ProductionFactory();
      var producers = subject.create(10);
      expect(producers.length).to.equal(10);
    });
  });
});

