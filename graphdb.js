var seraph = require('seraph');
var url = require('url').parse(process.env.GRAPHENEDB_URL);

var db = seraph({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

console.log(process.env.GRAPHENEDB_URL);

console.log("Database is ready.");

var rep = {};

rep.createTestNode = function(callback) {
  db.query("CREATE (n) RETURN id(n)", (err, result) => {
    if (err) throw err;
    console.log(result);
    callback(result);
  });
};

/**
  newTitle - title of the node to create
  newDesc - description of the node to create
  callback - (id)
*/
rep.createNode = function(newTitle, newDesc, callback) {
  db.query("CREATE (n {title: {title}, description: {description}}) RETURN id(n)", {title: newTitle, description: newDesc}, function(err, result) {
    if (err) throw err;
    callback(result[0].id);
  });
};

/**
  nodeId - id of the node to delete
*/
rep.deleteNode = function(nodeId) {
  db.query("MATCH (n) WHERE id(n) = {id} DELETE n", {id: nodeId}, function(err, result) {
    if (err) throw err;
  });
};

/**
  nodeId - id of the node to edit
  newTitle - the new title of the node to edit
*/
rep.nodeEditTitle = function(nodeId, newTitle) {
  db.query("MATCH (n) WHERE id(n) = {id} SET n.title = {title}", {id: nodeId, title: newTitle}, function(err, result) {
    if (err) throw err;
  });
};

/**
  nodeId - id of the node to edit
  newDesc - the new description of the node to edit
*/
rep.nodeEditDescription = function(nodeId, newDesc) {
  db.query("MATCH (n) WHERE id(n) = {id} SET n.description = {description}", {id: nodeId, title: newDesc}, function(err, result) {
    if (err) throw err;
  });
};

/**
  srcId - the id of the source node
  destId - the id of the destination node
  newTitle - the title of the new relationship
  newDesc - the description of the new relationship
  callback - (id)
*/
rep.createRelationship = function(srcId, destId, newTitle, newDesc, callback) {
  db.query("MATCH (a), (b) WHERE id(a) = {src} AND id(b) = {dest} CREATE (a)-[r:RELATED_TO {title: {title}, description: {description}}]->(b) RETURN id(r)", {src: srcId, dest: destId, title: newTitle, description: newDesc}, function(err, result) {
    if (err) throw err;
    callback(result[0].id);
  });
};

rep.relationshipEditTitle = function() {
  throw "not implemented";
};

rep.relationshipEditDescription = function() {
  throw "not implemented";
};


console.log(rep);

db.query("MATCH (n) RETURN n", (err, result) => {
  console.log(result);
});

console.log("The callback never came back.");

module.exports = rep;
