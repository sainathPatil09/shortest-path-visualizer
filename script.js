var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var addNodeButton = document.getElementById('addNode');
var addEdgeButton = document.getElementById('addEdge');
var nodes = [];
var edges = [];
var weights = [];
var isAddingEdges = false;
var nodeCount = 0;

var adj = [];


addNodeButton.addEventListener('click', function () {
    isAddingEdges = false;
});

addEdgeButton.addEventListener('click', function () {
    isAddingEdges = true;
});

// let temp=[];
container.addEventListener('click', function (event) {



    var rect = container.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var divs = document.querySelectorAll(".node");
    if (isAddingEdges) {
        for (var i = 0; i < nodes.length; i++) {


            var node = nodes[i];

            var dx = node.x - x;
            var dy = node.y - y;
            if (dx * dx + dy * dy < 100) {  // if the click is within the node circle (radius 10px)
                edges.push(node);


                if (edges.length == 2) {
                    var weight = Math.floor(Math.random() * 10) + 1; // Generate a random weight between 1 and 10
                    weights.push(weight);

                    var contentOfNodes = edges.map(function (edge) {
                        // return edge.element.textContent;
                        return parseInt(edge.element.textContent, 10);
                    });
                    contentOfNodes.push(weight);
                    adj.push(contentOfNodes);
                    // console.log("Content of nodes:", contentOfNodes);
                    // console.log(adj);


                    ctx.beginPath();
                    ctx.moveTo(edges[0].x, edges[0].y);
                    ctx.lineTo(edges[1].x, edges[1].y);
                    ctx.stroke();

                    ctx.font = "20px Arial";
                    ctx.fillText(weight, (edges[0].x + edges[1].x) / 2, (edges[0].y + edges[1].y) / 2);


                    edges = [];
                }
                return;
            }
        }
    } else {
        // var node = document.createElement('div').innerHTML = 1;
        var node = document.createElement('div');
        node.style.left = (x - 10) + 'px';  // subtracting 10 to center the node
        node.style.top = (y - 10) + 'px';  // subtracting 10 to center the node
        node.className = 'node';
        node.textContent = ++nodeCount;
        container.appendChild(node);
        nodes.push({ x: x, y: y, element: node });

    }
});




document.getElementById("res").addEventListener("click", function () {



    class Solution {
        shortestPath(n, m, array) {
            // Initialize adjacency list as a map of maps
            const ad = new Map();
            this.prepareAdjacencyList(n, array, ad);

            const parent = new Array(n + 1).fill(0);
            const dist = new Array(n + 1).fill(Infinity);

            parent[1] = 1; // Node '1' is parent of itself
            dist[1] = 0;

            // Min-heap priority queue
            const pq = new MinPriorityQueue({ priority: (pair) => pair.dist });
            pq.enqueue(new Pair(0, 1));

            while (!pq.isEmpty()) {
                const dequeued = pq.dequeue();
                if (!dequeued || !dequeued.element) {
                    console.error('Invalid Pair dequeued:', dequeued);
                    continue;
                }
                const pr = dequeued.element;

                const uDist = pr.dist;
                const u = pr.node;

                // Get all the neighbours of u and check for any relaxation
                const neighbors = ad.get(u);
                if (neighbors) {
                    for (const [v, edgeCost] of neighbors) {
                        // Relaxation step
                        if (uDist + edgeCost < dist[v]) {
                            dist[v] = uDist + edgeCost;
                            pq.enqueue(new Pair(dist[v], v));
                            parent[v] = u; // Storing the parent of 'v' due to which 'v' is relaxed
                        }
                    }
                }
            }

            const ans = [];

            // It means nth node is relaxed
            if (dist[n] !== Infinity) {
                // ans.push(dist[n]);

                let node = n;

                // Stops when 1 != 1
                while (parent[node] !== node) {
                    ans.push(node); // Storing each node
                    node = parent[node]; // Getting parent of a node
                }

                ans.push(1);
                ans.reverse();
            } else {
                ans.push(-1);
            }

            return ans;
        }

        prepareAdjacencyList(n, array, ad) {
            // Initializing the adj map
            for (let i = 1; i <= n; i++) {
                ad.set(i, new Map());
            }

            for (const edge of array) {
                const [u, v, cost] = edge;

                // Since the graph is undirected, add edges both ways
                ad.get(u).set(v, cost);
                ad.get(v).set(u, cost);
            }
        }
    }

    class Pair {
        constructor(dist, node) {
            this.dist = dist;
            this.node = node;
        }
    }

    // MinPriorityQueue can be implemented using a third-party library such as 'mnemonist' or 'js-priority-queue'.
    // For simplicity, here we will use a simple array-based priority queue with O(n) enqueue time.
    class MinPriorityQueue {
        constructor({ priority }) {
            this.elements = [];
            this.priority = priority;
        }

        enqueue(element) {
            if (!element || element.dist === undefined || element.node === undefined) {
                console.error('Invalid element:', element);
                return;
            }
            this.elements.push({ element });
            this.elements.sort((a, b) => this.priority(a.element) - this.priority(b.element));
        }

        dequeue() {
            return this.elements.shift();
        }

        isEmpty() {
            return this.elements.length === 0;
        }
    }

    // Example usage:
    const sol = new Solution();

    const n = nodeCount;
    const m = adj.length;
    const array = adj;

    console.log(sol.shortestPath(n, m, array));
    const result = sol.shortestPath(n, m, array);
    console.log(result);

    let modify = "";
    for (let i = 0; i < result.length; i++) {
        modify += result[i];
        if (i < result.length - 1) {
            modify += "-->";
        }
    }
    document.querySelector(".res-container").innerHTML = modify;

});



// i-btn

document.querySelector(".i-btn").addEventListener("click", () => {
    document.querySelector(".details").style.right = "0"
    document.querySelector(".details").style.display = "block"

})

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".details").style.right = "-75%"
})


// reload event

document.getElementById("clear").addEventListener("click",()=>{
    window.location.reload();
})
