const breakLine = "\n";
const tabulationElement = "    ";

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

removeWhileLines = function(text){
    return text.replace(/^\s\s\s\s\n/gm, "");
}

addNumberColumns = function(elem, numberColumns){
    var newClass = getContainerClass(numberColumns);
    if (newClass != "")
        elem.classList.add(newClass);
    var remainingElements = numberColumns - elem.getElementsByClassName('box-grid').length;
    if (remainingElements < 0){ //Needs to delete elements
        var elemsToRemove = elem.getElementsByClassName('box-grid');
        for (i = 0; i < -remainingElements; i++){
            elemsToRemove[i].remove();
            elem.innerHTML = removeWhileLines(elem.innerHTML);
        }
    } else if (remainingElements > 0){
        var sampleElement = elem.getElementsByClassName('box-grid')[0];
        for (i = 0; i < remainingElements; i++){
            var newElement = sampleElement.outerHTML;
            elem.innerHTML = elem.innerHTML + tabulationElement + newElement + breakLine;
        }
    }
}

addLineCounterInCode = function(){
    var codeWithoutLineCounter = document.querySelector("code.hljs>:not(table)");
    if (codeWithoutLineCounter){
        hljs.lineNumbersBlock(codeWithoutLineCounter.parentElement);
    }
}

updateSnippet = function(snippetElement, newSnippet){
    snippetElement.innerHTML = '';
    var escapedString = new Option(newSnippet.outerHTML).innerHTML;
    snippetElement.innerHTML = escapedString;
    hljs.highlightBlock(snippetElement.parentNode);
    addLineCounterInCode();
}

updateCode = function(newImput, elemID){
    if (newImput > 12)
        newImput = 12;
    else if (newImput < 1)
        newImput = 1;
    var elem = document.getElementById(elemID);
    var exampleResult = elem.querySelector(".example .container");
    var codeSnippet = elem.querySelector("code");
    removeClassStartingBy(exampleResult, "container--");
    addNumberColumns(exampleResult, newImput);
    updateSnippet(codeSnippet, exampleResult);
}

var navigatorPlaceHolder = document.getElementById("navigator");
var navigatorContainer = document.getElementById("navigator-container");

//SCROLL Listener for top menu
window.addEventListener('scroll', function(e) {
    const navigation = document.querySelector('.navigation');
    navigation.classList.toggle('is-fixed', navigatorPlaceHolder.getBoundingClientRect().y < 0);
});