$(function(){

    var app = new Application();

})

class Application
{
	constructor()
	{
		var self = this;
		this.extractor = new Extractor();
	    this.visuelGraph = echarts.init($('#visualisationGraph')[0]);
	    this.visuelGraph.showLoading();

        $('#buttonImportFile').on('click',function(e){
        	console.log("starting extractor");
            self.extractor.extractFile(self).then(self.getExtractedNodes);
        });
	    
	}

	getExtractedNodes(extractedNodes){
		var nodes = extractedNodes[1];
		var context = extractedNodes[0];
        context.createGraph(nodes, function(){
            startGraphVisualisation(context.visuelGraph, context.graph);
            context.guiSearchBar();
        });

	}

	createGraph(nodes, callback)
	{
		this.graph = new Graph();
	    for(var i in nodes)
	        this.graph.addNode(nodes[i]);
	    this.graph.spreadFitnessColor();
	    callback();
	}

	/**
	  * Create the logic behind the graph's search bar
	  * @param {graph} The graph containing the nodes
	  * @param {visuel} The element where the graph is showing
	  */
	guiSearchBar()
	{
	    var nbNodes = this.graph.getNodeNumber();
	    if(nbNodes >= 0)
	    {
	        var currentNode = 0;
	        $('#inputNodeName').on('mousewheel',function(e){ $(this).blur(); });

	        $("#buttonNextNode").on("click", function(e){
	            $("#inputNodeName").val(parseInt($("#inputNodeName").val())+1+"");
	             e.preventDefault();
	        });

	        $("#buttonPreviousNode").on("click", function(){
	            var currentIndex = $("#inputNodeName").val();
	            if(parseInt(currentIndex) > 0)
	                $("#inputNodeName").val(parseInt(currentIndex)-1+"");
	        });

	        var self = this;
	        $("#buttonSearchNode").on("click", function(){
	            self.visuelGraph.dispatchAction({
	                type: 'downplay',
	                seriesIndex: 0,
	                name: currentNode
	            });

	            var currentNode = $("#inputNodeName").val();

	            self.visuelGraph.dispatchAction({
	                type: 'highlight',
	                seriesIndex: 0,
	                name: currentNode
	            });

	            self.visuelGraph.dispatchAction({
	                type: 'showTip',
	                seriesIndex: 0,
	                name: currentNode
	            });
	        });
	    }
	}
}