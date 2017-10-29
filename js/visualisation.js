var visuel = echarts.init(document.getElementById('visualisationGraph'));
visuel.showLoading();
option = {
    tooltip: {
            trigger: "item",
            formatter: function (params, ticket, callback) {
                if(params.dataType=="node")
                    return tooltipContent(params.data);
                else return "";
            },
            name: "test",
            triggerOn: 'click'
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
        data: graph.data["nodes"],
        categories: graph.categories,
        force: {
            // initLayout: 'circular'
            // repulsion: 20,
            edgeLength: 5,
            repulsion: 100,
            gravity: 0.2
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
visuel.hideLoading();
visuel.setOption(option);

function tooltipContent(node)
{
    var s = "<b>ID:</b> "+node.name+"<br />";
    if(!$.isEmptyObject(node.parents))
    {
        s += "<b>Parents: </b>";
            s += "<ul>";
                for(var p in node.parents)
                    s += "<li>"+node.parents[p]+"</li>";
            s += "</ul>";
    }
    s+="<b>Fitness: </b>"+node.fitness;
    return s;
}


