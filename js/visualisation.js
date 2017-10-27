var visuel = echarts.init(document.getElementById('visualisationGraph'));
visuel.showLoading();
option = {
    tooltip: {
            trigger: "item",
            formatter: "{b}",
            name: "test"
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
    }]
};
visuel.hideLoading();
visuel.setOption(option);