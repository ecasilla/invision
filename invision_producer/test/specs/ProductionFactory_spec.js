var sinon = require('sinon');
var expect = require('chai').expect;
var ProductionFactory = require('../../lib/ProductionFactory');

describe('The production factory: ', function(){
  it('should be an object', function(){
    expect(ProductionFactory).to.be.an('object');
  });
  it('should have a create() method', function(){
    var factory = ProductionFactory;
    console.log(factory);
  //  expect(factory.create).to.be.defined();
  });
  it('should create configureable amount of producers', function(){
    var options = {amount:10};
    var factory = ProductionFactory();
    factory.create();
    expect(factory.amount).to.equal(10);
    expect(factory.producers.length).to.equal(10);
  });
});

