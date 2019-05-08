var steam_api = new SteamAPI(api_keys);
//create 3 variable to put and get for html
var steam_id = document.getElementById('steamid'); 
var out = document.getElementById('output');
var run_btn = document.getElementById('run_btn');
run_btn.onclick = async () => {
    var container = document.getElementById('mynetwork');
    //create nodes and edges set and the graph
    var nodes = new vis.DataSet();
    var edges = new vis.DataSet();
    var graph = new vis.Network(container, {nodes, edges}, {
        //set the proprity of the graph
        nodes: {
            borderWidth: 1,
            borderWidthSelected: 20,
            size: 30,
            color: {
                border: '#333'
            },
            shapeProperties: {
                useBorderWithImage: true
            }
        },
        edges:{
            color: {
                color: '#ffffff'
            },
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
    
    var addNode = function(id, name, image, dst) { //function for add node
        dst.add({id, label: name, shape: 'image', image});
        
    }
      
    var addEdge = function(n1, n2, dst) {//function for add edge
        dst.add({from: n1, to: n2});
    }
    
    var visited = []; //check if the node is added or not
    steam_id.value = await username_reslove(steam_api, steam_id.value);//check if the entered information is userid or special
    var output1 = await GetPlayerSummaries(steam_api, steam_id.value); //get player summaries
    //call add node function
    addNode(output1.response.players[0].steamid, output1.response.players[0].personaname, output1.response.players[0].avatarfull, nodes);
    visited.push(steam_id.value);
    //call add edge function
    await AddNodeEdge(steam_api, steam_id.value,nodes, edges,addNode,addEdge,visited);
    
    var check = [];//to help when user click 2 of friends in graph, the 2 friends' graph will show
    
    graph.on('click',async e => {
        if(e.nodes.length){
            if(check.length>=2){

            }
            else if(check.length==1){
                check.push(e.nodes[0]);
                await AddNodeEdge(steam_api, check[0],nodes, edges,addNode,addEdge,visited);
                await AddNodeEdge(steam_api, check[1],nodes, edges,addNode,addEdge,visited);
                var array0 = graph.getConnectedNodes(check[0]);
                var array1 = graph.getConnectedNodes(check[1]);
                var mutual = array0.filter(x => array1.includes(x));
                graph.setSelection({nodes:mutual},{unselectAll: true, highlightEdges: false}); //highlight the mutual friends
            }
            else{
                check.push(e.nodes[0]);
            }
        }
    });

    
    
};