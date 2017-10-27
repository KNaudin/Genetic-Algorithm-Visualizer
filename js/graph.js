class Graph{

	constructor()
	{
		this.data = {};
		this.data["type"] = "forces";
		this.data["nodes"] = [];
		this.data["links"] = [];
		this.data["linkSymbol"] = "arrow";
	}

	addNode(n)
	{
		this.data["nodes"].push(n)
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

}

class Node
{
	constructor(name, parents={}, color="#00FF00", size=10)
	{
		this.name = name;
		this.label="test";
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
}

var graph = new Graph();
var n1 = new Node("premier"); 
var n2 = new Node("second");
var n3 = new Node("troisieme", [n1.getName(), n2.getName()]);
var n4 = new Node("quatrieme", [n1.getName(), n3.getName()]);
var n5 = new Node("cinquieme");

graph.addNode(n1);
graph.addNode(n2);
graph.addNode(n3);
graph.addNode(n4);
graph.addNode(n5);

console.log(graph);


