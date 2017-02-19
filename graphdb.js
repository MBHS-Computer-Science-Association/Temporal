var seraph = require('seraph');
var url = require('url').parse(process.env.GRAPHENEDB_URL);

var db = seraph({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

var rep = {};

/**
  newTitle - title of the node to create
  newDesc - description of the node to create
  callback - (id)
*/
rep.createNode = function(newTitle, newDesc, callback) {
  db.query("CREATE (n {title: {title}, description: {description}}) RETURN id(n) as id", {title: newTitle, description: newDesc}, function(err, result) {
    if (err) throw err;
    if (callback) callback(result[0].id);
  });
};

/**
  nodeId - id of the node to delete
  callback - ()
*/
rep.deleteNode = function(nodeId, callback) {
  var batch = db.batch();

  batch.queryRaw("MATCH (n)-[r]-() WHERE id(n) = {id} DELETE r", {id: nodeId});
  batch.queryRaw("MATCH (n) WHERE id(n) = {id} DELETE n", {id: nodeId});

  batch.commit((err, result) => {
    if (err) throw err;
    if (callback) callback();
  });
};

/**
  nodeId - id of the node to find
  callback - (node)
*/
rep.getNode = function(nodeId, callback) {
  db.query("MATCH (n) WHERE id(n) = {id} RETURN {title: n.title, description: n.description, id: id(n)}", {id: nodeId}, (err, result) => {
    if (err) throw err;
    if (callback) callback(result[0]);
  });
};

/**
  callback - ([node])
    where node is
      title - string representing title
      description - string representing description
*/
rep.getAllNodes = function(callback) {
  db.query("MATCH (n) RETURN {title: n.title, description: n.description, id: id(n)}", (err, result) => {
    if (err) throw err;
    if (callback) callback(result);
  });
};

/**
  nodeId - id of the node to edit
  newTitle - the new title of the node to edit
*/
rep.nodeEditTitle = function(nodeId, newTitle, callback) {
  db.query("MATCH (n) WHERE id(n) = {id} SET n.title = {title}", {id: nodeId, title: newTitle}, function(err, result) {
    if (err) throw err;
    if (callback) callback();
  });
};

/**
  nodeId - id of the node to edit
  newDesc - the new description of the node to edit
*/
rep.nodeEditDescription = function(nodeId, newDesc, callback) {
  db.query("MATCH (n) WHERE id(n) = {id} SET n.description = {description}", {id: nodeId, description: newDesc}, function(err, result) {
    if (err) throw err;
    if (callback) callback();
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
  db.query("MATCH (a), (b) WHERE id(a) = {src} AND id(b) = {dest} CREATE (a)-[r:RELATED_TO {title: {title}, description: {description}}]->(b) RETURN id(r) as id", {src: srcId, dest: destId, title: newTitle, description: newDesc}, function(err, result) {
    if (err) throw err;
    if (callback) callback(result[0].id);
  });
};

/**
  relId - the id of the relationship to edit
  newTitle - the new title of the relationship
  callback - ()
*/
rep.relationshipEditTitle = function(relId, newTitle, callback) {
  db.query("MATCH ()-[r]->() WHERE id(r) = {id} SET r.title = {title}", {id: relId, title: newTitle}, (err, result) => {
    if (err) throw err;
    if (callback) callback();
  });
};

/**
  relId - the id of the relationship to edit
  newTitle - the new description of the relationship
  callback - ()
*/
rep.relationshipEditDescription = function(relId, newDesc, callback) {
  db.query("MATCH ()-[r]->() WHERE id(r) = {id} SET r.description = {description}", {id: relId, description: newDesc}, (err, result) => {
    if (err) throw err;
    if (callback) callback();
  });
};

// TODO: get all nodes ordered

// TODO: delete relationship by id

rep.getRelationshipFromId = function(relId, callback) {
  // MATCH ()-[r]-() WHERE id(r) = 135 RETURN DISTINCT {title: r.title, description: r.description, id: id(r)}
  db.query("MATCH ()-[r]-() WHERE id(r) = {id} RETURN DISTINCT {title: r.title, description: r.description, id: id(r)}", {id: relId}, (err, result) => {
    if (err) throw err;
    if (callback) callback(result[0]);
  });
};


rep.getRelationshipFromNodes = function(srcId, destId, callback) {
  db.query("MATCH (a)-[r]-(b) WHERE id(a) = {src} AND id(b) = {dest} RETURN DISTINCT {title: r.title, description: r.description, id: id(r)}", {src: srcId, dest: destId}, (err, result) => {
    if (err) throw err;
    if (callback) callback(result);
  });
};

// TODO: get all relationships

rep.getNodeCount = function(callback) {
  db.query("MATCH (n) RETURN count(DISTINCT n) as count", (err, result) => {
    if (err) throw err;
    if (callback) callback(result[0].count);
  });
};

rep.searchNodes = function(term, callback) {
  var searchTerm = term.toLowerCase();

  var query = `MATCH (n) WHERE lower(n.title) STARTS WITH {query} OR
              lower(n.title) CONTAINS {query} OR
              lower(n.description) STARTS WITH {query} OR
              lower(n.description) CONTAINS {query}
              RETURN {title: n.title, description: n.description, id: id(n)}`;
  db.query(query, {query: searchTerm}, (err, result) => {
    if (err) throw err;
    if (callback) callback(result);
  });
};

rep.getRelatedNodes = function(nodeId, callback) {
  db.query("MATCH (a)-[*1]-(b) WHERE id(a) = {id} RETURN DISTINCT {title: b.title, description: b.description, id: id(b)}", {id: nodeId}, (err, result) => {
    if (err) throw err;
    if (callback) callback(result);
  });
};

rep.getSigmaGraph = (callback) => {
  var batch = db.batch();

  batch.query("MATCH (n) RETURN n");
  batch.query("MATCH (a)-[r]->(b) RETURN id(r) as id, id(a) as source, id(b) as target");

  batch.commit(function(err, results) {
    if (err) throw err;

    var graph = {
      nodes: [],
      edges: []
    };

    var raw_nodes = results[0];
    raw_nodes.forEach(function(node) {
      node.id = 'n' + node.id;
      node.label = node.firstname + ' ' + node.lastname;
      node.size = 1;
      node.x = Math.random() * 30 - 15;
      node.y = Math.random() * 30 - 15;
      graph.nodes.push(node);
    });

    var raw_edges = results[1];
    raw_edges.forEach(function(edge) {
      edge.id = 'e' + edge.id;
      edge.source = 'n' + edge.source;
      edge.target = 'n' + edge.target;
      graph.edges.push(edge);
    });

    if (callback) callback(graph);
  });
};

module.exports = rep;
