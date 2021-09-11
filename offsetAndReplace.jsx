/*
  offsetAndReplace.jsx for Adobe Illustrator
  Version: 1.1
  Description: Open the offset dialog for currently selected items and delete the orignal paths afterwards.
  Author: Tobias Lunte, tobias.lunte@uni-oldenburg.de
  Contributers: Sergey Osokin
  Date: 2021-09-10

  License:
  Copyright © 2021 Tobias Lunte
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

//@target illustrator

function main() {
  if (!documents.length) {
    alert('Error\nPlease open a document to work on.');
    return;
  }
  
  var partitions = partitionSelect(selection);

  var oldPathSelect = partitions.pathSel;
  var oldNonPathSelect = partitions.nonPathSel;


  if (!oldPathSelect.length) {
    alert('Error\nPlease select at least one path object.');
    return;
  }
  else
  {
    for (var i = oldNonPathSelect.length - 1; i >= 0; i--) {
      oldNonPathSelect[i].selected = false;
    }
  }

  app.executeMenuCommand("OffsetPath v23");

  if(!isEquals(oldPathSelect, partitionSelect(selection).pathSel)){
    for (var i = oldPathSelect.length - 1; i >= 0; i--) {
      oldPathSelect[i].remove();
    }
  }

  for (var i = oldNonPathSelect.length - 1; i >= 0; i--) {
    oldNonPathSelect[i].selected = true;
  }

}

function partitionSelect(sel){
  var partitions = {pathSel:[], nonPathSel:[]};
  for (var i =  sel.length - 1; i >= 0; i--) {
    switch(sel[i].typename){
      case "GroupItem":
        var subPar = partitionSelect(sel[i].pageItems);
        partitions.pathSel = partitions.pathSel.concat(subPar.pathSel);
        partitions.nonPathSel = partitions.nonPathSel.concat(subPar.nonPathSel);
        break;
      case "CompoundPathItem":
      case "PathItem":
        partitions.pathSel.push(sel[i]);
        break;
      default:
        partitions.nonPathSel.push(sel[i]);
        break;
    }
  }
  return partitions;
}

function isEquals(arr1, arr2) {
  if (arr1.length != arr2.length) return false;

  for (var i = arr1.length - 1; i >= 0; i--) {
    var foundMatch = false;
    for (var j = arr2.length - 1; (!foundMatch) && j >= 0; j--) {
      if (arr1[i] == arr2[j]) {
        foundMatch = true;
      }
    }
    if (!foundMatch) {
      return false;
    }
  }
  return true;
}

// Run script
try {
  main();
} catch (e) {
}