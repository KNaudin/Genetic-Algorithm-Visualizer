class Graph{

	/**
	 * Create a Graph instance
	 * @constructor
	 */
	constructor()
	{
		this.data = {};
		this.data["type"] = "forces";
		this.data["nodes"] = [];
		this.data["links"] = [];
		this.data["linkSymbol"] = "arrow";
		this.firstNodeAdded = true;
	}

	/**
	 * Add a node to the graph
	 *
	 * @param {n} The node to add 
	 */
	addNode(n)
	{
		//Visual default style of the node (normal an hovered)
		n["itemStyle"] = {
			"normal" : {
				"color" : "#FF0000",
			},

			"emphasis" : {
				"borderColor" : "#0000FF",
				"borderWidth" : "3",
				"borderType" : "dotted"
			}
		};

		this.data["nodes"].push(n);

		//Track info on fitness to visually differenciate the nodes in the graph
		if(this.firstNodeAdded)
		{
			this.minFitness = n.fitness;
			this.maxFitness = n.fitness;
			this.firstNodeAdded = false;
		}
		this.minFitness = (n.fitness < this.minFitness) ? n.fitness : this.minFitness;
		this.maxFitness = (n.fitness > this.maxFitness) ? n.fitness : this.maxFitness;

		//Link the node to his potential previously-created parents
		if(!$.isEmptyObject(n.parents))
		{
			for(var p in n.parents)
			{
				this.addLink(n.parents[p], n.name);
			}
		}
	}

	/**
	 * Add an oriented edge between two nodes in the graph
	 * @param {n1} The source node
	 * @param {n2} The target node
	 */
	addLink(n1, n2)
	{
		var link = { "source":n1, "target":n2};
		this.data["links"].push(link);
	}

	/**
	 * Color the nodes according to their fitness value
	 * Node with lower fitness: GREEN
	 * Node with higher fitness: RED
	 * Other node's color are interpolated from their fitness value
	 */
	spreadFitnessColor()
	{
		//RED
		var c1 = {
			r:255,
			g:0,
			b:0
		};

		//GREEN
		var c2 = {
			r:0,
			g:255,
			b:0
		};
		for(var n in this.data["nodes"])
		{
			var r = (this.data["nodes"][n].fitness-this.minFitness)/(this.maxFitness-this.minFitness);
			this.data["nodes"][n].itemStyle.normal["color"] = (rgbToHex((c1.r*r)+(c2.r*(1-r)), (c1.g*r)+(c2.g*(1-r)), (c1.b*r)+(c2.b*(1-r))));
			this.data["nodes"][n].itemStyle.emphasis["borderColor"] = this.data["nodes"][n].itemStyle.normal["color"];
		}
		

	}

}




