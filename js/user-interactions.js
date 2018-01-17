deactivateSon = function(elem){
    var activeElement = elem.querySelector(".is-active");
    activeElement.classList.remove("is-active");
}

activate = function(caller, idToActivate){
    var parentNav = caller.closest("nav");
    deactivateSon(parentNav)
    caller.classList.add("is-active");
    //var navSibling = parentNav.parentNode.childNodes;
    var navActiveSiblings = parentNav.parentNode.querySelector(".section-container.show")
    navActiveSiblings.classList.remove("show");
    var elementToActivate = document.getElementById(idToActivate);
    elementToActivate.classList.add("show");
}

getContainerClass = function(numberColumns){
    var result = "";
    switch (parseInt(numberColumns)){
        case 1:
            result=""
            break;
        case 2:
        case 3:
        case 4:
        case 6:
        case 12:
            result = "container--"+numberColumns+"x" + 12/numberColumns;
            break;
        case 5:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            result = "";
            break;
    }
    return result;
}

removeClassStartingBy = function(elem, startsBy){
    for(i = 0; i < elem.classList.length; i++){
        if (elem.classList[i].startsWith(startsBy)){
            elem.classList.remove(elem.classList[i]);
        }
    }
}

addNumberColumns = function(elem, numberColumns){
    var newClass = getContainerClass(numberColumns);
    if (newClass != "")
        elem.classList.add(newClass);
    var remainingElements = numberColumns - elem.getElementsByClassName('box-grid').length;
    if (remainingElements < 0){ //Needs to delete elements
        var elemsToRemove = elem.getElementsByClassName('box-grid');
        for (i = 0; i < -remainingElements; i++){
            console.log(elemsToRemove[i]);
            elemsToRemove[i].remove();
        }
    } else if (remainingElements > 0){
        var sampleElement = elem.getElementsByClassName('box-grid')[0];
        console.log("adding element....");
        for (i = 0; i < remainingElements; i++){
            var newElement = sampleElement.cloneNode(true);
            elem.appendChild(newElement);
        }
    }
}

updateSnippet = function(snippetElement, newSnippet){
    snippetElement.innerHTML = '';
    console.log(newSnippet.outerHTML);
    var escapedString = new Option(newSnippet.outerHTML).innerHTML;
    console.log("HEY");
    console.log(escapedString);
    snippetElement.innerHTML = escapedString;
    hljs.highlightBlock(snippetElement.parentNode);
}

updateCode = function(newImput, elemID){
    var elem = document.getElementById(elemID);
    var exampleResult = elem.querySelector(".example .container");
    var codeSnippet = elem.querySelector("code");
    removeClassStartingBy(exampleResult, "container--");
    addNumberColumns(exampleResult, newImput);
    updateSnippet(codeSnippet, exampleResult);
    // console.log(exampleResult.classList);
    // console.log(codeSnipet);
}