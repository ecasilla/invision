var expect = require('chai').expect;
var sinon  = require('sinon');
var Producer = require('../../lib/Producer');


describe('The Producer: ', function(){
  var producer,sandbox;
  beforeEach(function(){
    producer = new Producer();
    sandbox = sinon.sandbox.create(); 
    sandbox.stub(Producer.prototype,'random').returns(2);
  });

  afterEach(function(){
    producer = null;
    sandbox.restore();
  });

  it('should be an object', function(){
    expect(producer).to.be.an('object');
  });
  it('should be an instance of the Producer Constructor', function(){
    expect(producer).to.be.an.instanceof(Producer);
  });
  it('should have a random() method', function(){
    expect(producer).to.respondTo('random');
  });
  it('should create random numbers', function(){
    sandbox.restore();
    var rand1 = producer.random();
    var rand2 = producer.random();
    expect(rand1).to.be.an('number');
    expect(rand2).to.be.an('number');
    expect(rand1).to.not.equal(rand2);
  });
  it('should have a default id', function(){
    expect(producer.id).to.equal(1);
  });
  it('should have a createWork() method', function(){
    expect(producer).to.respondTo('createWork');
  });
  it('should return an object on createWork', function(done){
    producer.createWork(function(err,work){
      expect(work).to.be.an('object');
      done();
    });
  });
  it('should return an owner property from createWork()', function(done){
    producer.createWork(function(err,work){
      expect(work.owner).to.equal('Producer: ' + producer.id);
      done();
    });
  });
  it('should return an object on createWork', function(done){
    producer.createWork(function(err,work){
      expect(work.data).to.equal('2 + 2 =');
      done();
    });
  });
});

