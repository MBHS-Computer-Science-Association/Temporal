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
      graphdb.getNode(1, (node) => {
        done();
      });
    });
  });

  describe('getAllNodes', () => {
    it('should get all nodes', (done) => {
      graphdb.getAllNodes((nodes) => {
        done();
      });
    });
  });

  describe('nodeEditTitle', () => {
    it('should change the title', (done) => {
      graphdb.nodeEditTitle(1, "China", () => {
        // assert that the title is changed
        done();
      });
    });
  });

  describe('nodeEditDescription', () => {
    it('should change the description', (done) => {
      graphdb.nodeEditDescription(1, "This is a dangerous country.", () => {
        // assert that the description is changed
        done();
      });
    });
  });

  describe('createRelationship', () => {
    it('should create a new relationship with title and description', (done) => {
      graphdb.createRelationship(1, 2, "Caused", "out of spite", (id) => {
        console.log("The new relationship id: " + id);
        assert(typeof id === 'number');
        done();
      });
    });
  });

  describe('relationshipEditTitle', () => {
    it('should change the title', (done) => {
      graphdb.relationshipEditTitle(1, "Aggravated", () => {
        // assert that the title is changed
        done();
      });
    });
  });

  describe('relationshipEditDescription', () => {
    it('should change the description', (done) => {
      graphdb.relationshipEditDescription(1, "This was a result of the lack of provisions.", () => {
        // assert that the description is changed
        done();
      });
    });
  });

  describe('getNodeCount', () => {
    it('should return the number of nodes in the database', (done) => {
      graphdb.getNodeCount((count) => {
        console.log("Node count: " + count);
        assert(typeof count === 'number');
        done();
      });
    });
  });

  describe('getRelatedNodes', () => {
    it('should return all nodes directly related to the node', (done) => {
      graphdb.getRelatedNodes(1, () => {
        // assert that it actually got only the related nodes
        done();
      });
    });
  });
});
