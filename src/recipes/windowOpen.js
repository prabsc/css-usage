/* 
    RECIPE: Window Open
    -------------------------------------------------------------
    Author: Prabs Chawla
    Description: This counts any page that includes any script references to window.Open
*/

void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push( function windowOpen(/*HTML DOM Element*/ element, results) {

        if(element.nodeName == "SCRIPT") {
            var api = "window.open(";
            results["use"] = results["use"] || { count: 0};
            
            // if inline script. ensure that it's not our recipe script and look for string of interest
            if (element.text !== undefined && element.text.indexOf(api) != -1) {
                results["use"].count += (element.innerText.match(/window.open\(/g) || []).length;
            }
            else if (element.src !== undefined && element.src != "" && element.src.indexOf("Recipe.min.js") == -1) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", element.src, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText.indexOf(api) != -1) {
                    results["use"].count += (xhr.responseText.match(/window.open\(/g) || []).length;
                }
            }
        }

        return results;
    });
}();