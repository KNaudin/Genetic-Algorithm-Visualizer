class Extractor{
    constructor(){
        var self = this;
        this.fileName = "Error while processing given file.";
    }

    extractFile(context){
        return new Promise((resolve, reject) => {
            var extractedNodes = [];
            var input = document.createElement('input');
            input.type = 'file';
            input.click();
            input.addEventListener("change", function(){
                var fileList = this.files;
                var reader = new FileReader();
                reader.onload = function(file){
                    try{
                        console.log("Parsing file...");
                        var data = JSON.parse(file.target.result);
                        data["nodes"].forEach(function(node){
                            extractedNodes.push(node);
                        });
                        console.log("Done.");
                        var value = [context, extractedNodes];
                        resolve(value);
                    }
                    catch(e){
                        console.error("Parsing error:", e);
                    }
                }
                reader.readAsText(fileList[0]);
            }, false);
        });
    }
}