var fs={};

function Path(refLoader) {
  var len = refLoader.length;
  for(var i = 0; i < document.scripts.length; i++) {
    var Src = document.scripts[i].src,
        n = Src.lastIndexOf(refLoader);
    if(n == Src.length - len)
      return Src.substr(0, n + 1)
  }
  return null
};

var readFileSyncStore = [];

fs.readFileSync = function readFileSync(filePath) {
  if(!(filePath in readFileSyncStore)){
    readFileSyncStore.push(filePath);
    let result = null;
    const xmlhttp = new XMLHttpRequest();
   // xmlhttp.overrideMimeType('text/plain; charset=utf-8');
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
   // if (xmlhttp.status === 200||xmlhttp.status === 0) {
        result = xmlhttp.responseText;
   // }
    return result;
  }
};

/* *****
   <<name>>
   content
   <<name_1>>
   content_1
   ...
*/
function bufferGPUParse(buffer){
  var shaders = {};
  buffer.split('<<').forEach(function(shader) {
    var name_content = shader.split('>>');
    //name = name_content[0], content = name_content[1]
    shaders[name_content[0]] = name_content[1];
  });
  return shaders
}

function imports(file){
  var script = fs.readFileSync(file);
  eval.apply( window, [script] )
}  
var path = Path("/loader.js");
