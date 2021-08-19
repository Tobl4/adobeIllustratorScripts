/*
  offsetAndReplace.jsx for Adobe Illustrator
  Version: 1.0
  Description: Open the offset dialog for currently selected items and delete the orignal paths afterwards. If you cancel the offset dialog, the original paths (but not other objects) will still be deleted and you may want to undo that deletion.
  Author: Tobias Lunte, tobias.lunte@uni-oldenburg.de
  Date: 2021-08-19

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
  
  var oldSelect = selection;
  var nonPathSelect = [];

  for (var i = oldSelect.length - 1; i >= 0; i--) {
    if (oldSelect[i].typename != "PathItem") {
      var curNonPath = oldSelect.splice(i, 1)[0];
      curNonPath.selected = false;
      nonPathSelect.push(curNonPath);
    }
  }


  if (!oldSelect.length) {
    for (var i = nonPathSelect.length - 1; i >= 0; i--) {
      nonPathSelect[i].selected = true;
    }
    alert('Error\nPlease select at least one path object.');
    return;
  }

  app.executeMenuCommand("OffsetPath v23");

  for (var i = oldSelect.length - 1; i >= 0; i--) {
    oldSelect[i].remove();
  }

  for (var i = nonPathSelect.length - 1; i >= 0; i--) {
    nonPathSelect[i].selected = true;
  }

}


// Run script
try {
  main();
} catch (e) {
}