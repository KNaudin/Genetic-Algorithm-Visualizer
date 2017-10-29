
$(function(){

    var graph = new Graph();
    
    //Pour tout les nodes de l'objet log (défini dans le script inclus dans l'index -> a changer une fois le système d'upload de fichier en place)
    for(var i in log.nodes)
        graph.addNode(log.nodes[i]);
    graph.spreadFitnessColor();

    var visuel = echarts.init($('#visualisationGraph')[0]);
    visuel.showLoading();
    startGraphVisualisation(visuel, graph);


})

/**
  * Create a visual graph of the genetic algorithm
  * @param {visuel} The DOM element which will contain the graph
  * @param {graph} The data we will rely on
  */
function startGraphVisualisation(visuel, graph)
{
    var lastTooltipContent = "";
    option = {
        tooltip: {
                trigger: "item",
                formatter: function (params, ticket, callback) {
                    if(params.dataType=="node")
                        lastTooltipContent = tooltipContent(params.data);
                    return lastTooltipContent;
                },
                name: "test",
                triggerOn: 'click',
                extraCssText: "background-color: transparent;border:none",
                enterable: true,
                position: {right: 10, top: 10},
                alwaysShowContent: true
            },
        series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                emphasis: {
                    show: false
                }
            },
            draggable: true,
            roam: true,
            large: true,
            data: graph.data["nodes"],
            categories: graph.categories,
            force: {
                // initLayout: 'circular'
                // repulsion: 20,
                edgeLength: 5,
                repulsion: 100,
                gravity: 0.2,
                //layoutAnimation: false,
            },
            edges: graph.data["links"],
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [0, 8],
            focusNodeAdjacency: true,
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0.0
                }
            }
        }]
    };
    visuel.setOption(option);
    visuel.hideLoading();
    
}

/**
  * Set the content of the tooltip according to the node's informations
  * @param {node} The node clicked
  */
function tooltipContent(node)
{
    var s = "<span class=' tooltipStyle'>";
    s += "<b>ID:</b> "+node.name+"<br />";
    if(!$.isEmptyObject(node.parents))
    {
        s += "<b>Parents: </b>";
            s += "<ul>";
                for(var p in node.parents)
                    s += "<li class='tooltipParent'>"+node.parents[p]+"</li>";
            s += "</ul>";
    }
    s +="<b>Fitness: </b>"+node.fitness+"<br />";
    s += "<b>Generation: </b>"+node.generation;
    s += "</span>";
    return s;
}

/**
  * Convert a color from RGB format to HEX format
  * @param {r} The value of the RED component
  * @param {g} The value of the GREEN component
  * @param {b} The value of the BLUE component
  * @return The color to HEX format
  */
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



