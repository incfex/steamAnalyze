var steam_api = new SteamAPI('12270FC6A72424DAF652F14E9B06FB8F');
var steam_id = document.getElementById('steamid'); //76561198085623983
var out = document.getElementById('output');
var run_btn = document.getElementById('run_btn');
run_btn.onclick = async () => {
    //alert('clicked');
    var container = document.getElementById('mynetwork');
    var nodes = new vis.DataSet();
    var edges = new vis.DataSet();
    var graph = new vis.Network(container, {nodes, edges}, {
        nodes: {
            borderWidth: 1,
            size: 30,
            color: {
                border: '#333'
            },
            shapeProperties: {
                useBorderWithImage: true
            }
        },
        physics: {
            solver: 'repulsion',
            repulsion: {
                nodeDistance: 150,
                damping: .1,
                springConstant: .01
            }
        }
    });
    
    var addNode = function(id, name, image, dst) {
        dst.add({id, label: name, shape: 'image', image});
        
    }
      
    var addEdge = function(n1, n2, dst) {
        dst.add({from: n1, to: n2});
    }
    
    var visited = [];
    var output1 = await GetPlayerSummaries(steam_api, steam_id.value);
    addNode(output1.response.players[0].steamid, output1.response.players[0].personaname, output1.response.players[0].avatarfull, nodes);
    visited.push(steam_id.value);
    await AddNodeEdge(steam_api, steam_id.value,nodes, edges,addNode,addEdge,visited);
    
    var check = [];
    
    graph.on('click',async e => {
        if(e.nodes.length){
            if(check.length>=2){

            }
            else if(check.length==1){
                check.push(e.nodes[0]);
                await AddNodeEdge(steam_api, check[0],nodes, edges,addNode,addEdge,visited);
                await AddNodeEdge(steam_api, check[1],nodes, edges,addNode,addEdge,visited);
            }
            else{
                check.push(e.nodes[0]);
            }
        }
    });

    
    
};