const fs = require('fs');

const inputArray = JSON.parse(fs.readFileSync('input.json'));
const sampleDataArray = JSON.parse(fs.readFileSync('data.json'));
var result = 'Answer:';

var followItemArray = [...Array(sampleDataArray.length)].map((x) => []);

for (var index = 0; index < sampleDataArray.length; index++) {
  sampleDataArray[index].follows.forEach((x) => {
    followItemArray[x].push(index);
  });
  followItemArray[index].push(...sampleDataArray[index].follows);
}

inputArray.forEach((item) => {
  console.log(item);
  calculateNodes(followItemArray, item.from, item.to);
});

var pred = new Array(followItemArray.length).fill(0);
var dist = new Array(followItemArray.length).fill(0);

function checkValidFollows(followItemArray, nodeFrom, nodeTo, pred, dist) {
  var queue = [];

  var visited = new Array(followItemArray.length);

  for (var i = 0; i < followItemArray.length; i++) {
    visited[i] = false;
    dist[i] = Number.MAX_VALUE;
    pred[i] = -1;
  }

  visited[nodeFrom] = true;
  dist[nodeFrom] = 0;
  queue.push(nodeFrom);

  while (queue.length > 0) {
    var u = queue[0];
    queue.shift();
    for (var i = 0; i < followItemArray[u].length; i++) {
      if (visited[followItemArray[u][i]] == false) {
        visited[followItemArray[u][i]] = true;
        dist[followItemArray[u][i]] = dist[u] + 1;
        pred[followItemArray[u][i]] = u;
        queue.push(followItemArray[u][i]);

        if (followItemArray[u][i] == nodeTo) return true;
      }
    }
  }

  return false;
}

function calculateNodes(followItemArray, nodeFrom, nodeTo) {
  var pred = new Array(followItemArray.length).fill(0);
  var dist = new Array(followItemArray.length).fill(0);

  if (checkValidFollows(followItemArray, nodeFrom, nodeTo, pred, dist) == false) {
    console.log('Link not found');
    return;
  }

  var path = new Array();
  var crawl = nodeTo;
  path.push(crawl);
  while (pred[crawl] != -1) {
    path.push(pred[crawl]);
    crawl = pred[crawl];
  }

  for (var i = path.length - 1; i >= 0; i--) {
    result += `${path[i]} `;
  }
  console.log(result);
  result = 'Answer:';
}
