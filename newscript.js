//something like this
//build the grid
//add eventListener to parent of squares, stop propogation and target child node
//function for the core eventlistener is getMode
//getMode checks what feature is selected (option inputs)
//runs the appropriate function for the feature (what to do with child node)
//doesn't touch grid building or require cloning

//setting up grid stuff

function buildGrid(count) {
    
    wipeCanvas(); //needs to remove all canvasSquare divs before running
    let etchy = document.getElementById('etchy'); //this needs to be initialized each time or cloning breaks things
    span.innerText = count;
    let gridSize = count * count;
    for(i = 0; i < gridSize; i++) {addSquare();}
    etchy.setAttribute('style', 'grid-template-columns: repeat(' + count + ', 1fr);');
    
}

function addSquare() {
    let etchy = document.getElementById('etchy'); //this needs to be initialized each time or cloning breaks things
    let div = document.createElement('div');
    etchy.appendChild(div);
    div.className = 'canvasSquare';
    
}

function wipeCanvas() {
    let currentCanvas = document.getElementById('etchy');
    let childSquares = currentCanvas.childNodes;
    while (childSquares.length > 0) {
        currentCanvas.removeChild(childSquares[0]);
    }
}


//adjusting grid stuff

const sizeSet = document.getElementById('currentSize');
const span = document.getElementById('makeItSquare');

sizeSet.addEventListener('change', getNum);

function getNum() {
    //apparently you can still type in beyond min and max values, and also the function will run with no issue, boo
   if (sizeSet.value < 2 || sizeSet.value > 100) { 
        badEntry(); //show error tooltip with bad entries
    }
   else {
    closeOut(); //close error message if there's a good entry put in
    buildGrid(sizeSet.value);
    span.innerText = sizeSet.value; //number in input is shown in span as well for nice AxA format 
   }
}


//show the toolTip for invalid entries
const toolTip = document.getElementById('toolTip');
function badEntry() {
    toolTip.classList.remove('hideError');
    toolTip.classList.add('showError');
}
//toolTip close button
const closeTip = document.getElementById('closeToolTip');
closeTip.addEventListener('click', closeOut);
function closeOut() {
    toolTip.classList.remove('showError');
    toolTip.classList.add('hideError');
}


//listen to minus button and run subtract on input - stepdown?
const minus = document.getElementById('minus');

minus.addEventListener('click', smallen);

function smallen() {
    sizeSet.stepDown(); //doesn't register as a change for getNum to run
    buildGrid(sizeSet.value);
    span.innerText = sizeSet.value;
}

//listen to plus button and run add on input - stepup?
const plus = document.getElementById('plus');

plus.addEventListener('click', biggen);

function biggen() {
    sizeSet.stepUp(); //doesn't register as a change for getNum to run
    buildGrid(sizeSet.value);
    span.innerText = sizeSet.value;
}

//clear the grid back to white

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', resetGrid);

function resetGrid() {
    buildGrid(sizeSet.value);
}


//set eventListeners on grid squares
const etchy = document.getElementById('etchy');

etchy.addEventListener('mouseover', getMode);

function getMode(e) {
   //this keeps it for the children
    if(e.target !== e.currentTarget) {
        let enteredSquare = e.target;
        //magic here
        enteredSquare.classList.add('black');
    } 
    e.stopPropagation();
    console.log(e);

}