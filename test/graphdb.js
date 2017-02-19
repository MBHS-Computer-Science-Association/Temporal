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

  describe('deleteNode', () => {
    it('should delete the node', (done) => {
      graphdb.deleteNode(0, () => {
        done();
      });
    });
  });

  describe('getNode', () => {
    it('should get the node', (done) => {
      graphdb.getNode(10, (node) => {
        console.log("node.title " + node.title);
        console.log("node.description " + node.description);
        done();
      });
    });
  });
});
