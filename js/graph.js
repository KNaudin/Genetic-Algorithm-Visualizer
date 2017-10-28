class Graph{

	constructor()
	{
		this.data = {};
		this.data["type"] = "forces";
		this.data["nodes"] = [];
		this.data["links"] = [];
		this.data["linkSymbol"] = "arrow";
		this.firstNodeAdded = true;
	}

	addNode(n)
	{
		this.data["nodes"].push(n);
		if(this.firstNodeAdded)
		{
			this.minFitness = n.getFitness();
			this.maxFitness = n.getFitness();
			this.firstNodeAdded = false;
		}
		this.minFitness = (n.getFitness() < this.minFitness) ? n.getFitness() : this.minFitness;
		this.maxFitness = (n.getFitness() > this.maxFitness) ? n.getFitness() : this.maxFitness;
		if(!$.isEmptyObject(n.getParents()))
		{
			for(var p in n.getParents())
			{
				this.addLink(n.getParents()[p], n.getName());
			}
		}
	}

	addLink(n1, n2)
	{
		var link = { "source":n1, "target":n2};
		this.data["links"].push(link);
	}

	spreadFitnessColor()
	{
		var c1 = {
			r:255,
			g:0,
			b:0
		};

		var c2 = {
			r:0,
			g:255,
			b:0
		};
		for(var n in this.data["nodes"])
		{
			var r = (this.data["nodes"][n].getFitness()-this.minFitness)/(this.maxFitness-this.minFitness);
			this.data["nodes"][n].setColor(rgbToHex((c1.r*r)+(c2.r*(1-r)), (c1.g*r)+(c2.g*(1-r)), (c1.b*r)+(c2.b*(1-r))));
		}
		

	}

}

class Node
{
	constructor(name, parents={}, fitness=0, color="#00FF00", size=10)
	{
		this.name = name;
		this.fitness = fitness;
		this.value = [];
		this.parents = parents;
		this.itemStyle = { normal: {}, emphasis:{} };
		this.setColor(color);
		this.setBorderColorWhenHovered("blue");
		this.symbolSize = size;
	}

	getName()
	{
		return this.name;
	}

	getParents()
	{
		return this.parents;
	}

	setColor(c)
	{
		this.itemStyle.normal["color"] = c;
	}

	setBorderColorWhenHovered(c)
	{
		this.itemStyle.emphasis["borderColor"] = c;
	}

	getFitness()
	{
		return this.fitness;
	}
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

var graph = new Graph();
var n1 = new Node("premier", undefined, 100); 
var n2 = new Node("second", undefined, 40);
var n3 = new Node("troisieme", [n1.getName(), n2.getName()], 30);
var n4 = new Node("quatrieme", [n1.getName(), n3.getName()], 70);
var n5 = new Node("cinquieme", undefined, 20);
var n6 = new Node("sixième", [n5.getName(), n3.getName()], 0);

graph.addNode(n1);
graph.addNode(n2);
graph.addNode(n3);
graph.addNode(n4);
graph.addNode(n5);
graph.addNode(n6);
graph.spreadFitnessColor();



