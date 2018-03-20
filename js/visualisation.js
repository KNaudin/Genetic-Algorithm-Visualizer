
/**
  * Create a visual graph of the genetic algorithm
  * @param {visuel} The DOM element which will contain the graph
  * @param {graph} The data we will rely on
  */
function startGraphVisualisation(visuel, graph, callback)
{
    option = {
        tooltip: {
                trigger: "item",
                formatter: function (params, ticket, callback) {
                    lastTooltipContent = "";
                    if(params.dataType=="node")
                        lastTooltipContent = tooltipContent(params.data);
                    if(params.dataType="links")
                    {

                    }
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
            animation: true,
            label: {
                emphasis: {
                    show: true
                },
                normal: {
                    show: false
                }
            },
            draggable: false,
            roam: true,
            
            /**
                Get Nodes From a Generation
                Or all nodes
                Uncomment only one line
            **/
            //data: graph.getNodeByGeneration(3, false, false),
            data: graph.data["nodes"],


            categories: graph.categories,
            force: {
                // initLayout: 'circular'
                // repulsion: 20,
                edgeLength: 5,
                repulsion: 100,
                gravity: 0.2,
                layoutAnimation: false,
            },
            edges: graph.data["links"],
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [0, 8],
            focusNodeAdjacency: true,
            lineStyle: {
                normal: {
                    color: '#000000',
                    curveness: 0.0,
                    opacity: 1,
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







