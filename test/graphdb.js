var assert = require('chai').assert;

var graphdb = require('../graphdb');

describe('graphene database', () => {
  describe('createNode', () => {
    it('should create a node', (done) => {
      graphdb.createNode("Ukrainian Uprising", "Ukrainians in Crimea were misbehaving.", (id) => {
        console.log("The new node id: " + id);
        assert(typeof id === 'number');
        done();
      });
    });
  });

  describe('createTestNode', () => {
    it('should create a node', (done) => {
      graphdb.createTestNode((id) => {
        console.log("The new node id: " + id);
        assert(typeof id === 'number');
        done();
      });
    });
  });
});
