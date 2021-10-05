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


//set one eventListener on grid squares
const etchy = document.getElementById('etchy');

etchy.addEventListener('mouseover', getMode);

function getMode(e) {
   //this keeps it for the children
    if(e.target !== e.currentTarget) {
        let enteredSquare = e.target;
        const blackMode = document.getElementById('blacken');
        const rainbowMode = document.getElementById('rainbow');
        const grayMode = document.getElementById('grayScale');
        const eraseMode = document.getElementById('eraser');

        if(blackMode.checked == true) {
            enteredSquare.removeAttribute('style');
            enteredSquare.removeAttribute('data-bkgd');
            enteredSquare.setAttribute('style', 'background-color: black;' );}
            
        
        else if (rainbowMode.checked == true) {
            enteredSquare.removeAttribute('style');
            enteredSquare.removeAttribute('data-bkgd');
            let randoColor = Math.floor(Math.random()*16777215).toString(16);
            enteredSquare.setAttribute('style', 'background-color: #' + randoColor + ';' );}
        
        else if (grayMode.checked == true) {
            enteredSquare.removeAttribute('style');
            

            if (enteredSquare.dataset.bkgd == 'gray1') {
                enteredSquare.setAttribute('data-bkgd', 'gray2');
                console.log('firing gray2');
            }

            else if (enteredSquare.dataset.bkgd == 'gray2') {
                enteredSquare.setAttribute('data-bkgd', 'gray3');  
                console.log('firing gray3'); 
            }

            else if (enteredSquare.dataset.bkgd == 'gray3') {
                enteredSquare.setAttribute('data-bkgd', 'gray4');
                console.log('firing gray4');
            }

            else if (enteredSquare.dataset.bkgd == 'gray4') {
                enteredSquare.setAttribute('data-bkgd', 'gray5');
                console.log('firing gray5');
            }

            else if (enteredSquare.dataset.bkgd == 'gray5') {
                enteredSquare.setAttribute('data-bkgd', 'gray6');
                console.log('firing gray6');
            }

            else if (enteredSquare.dataset.bkgd == 'gray6') {
                enteredSquare.setAttribute('data-bkgd', 'gray7');
                console.log('firing gray7');
            }

            else if (enteredSquare.dataset.bkgd == 'gray7') {
                enteredSquare.setAttribute('data-bkgd', 'gray8');
                console.log('firing gray8');
            }

            else if (enteredSquare.dataset.bkgd == 'gray8') {
                enteredSquare.classList.add('black');
                console.log('firing black');
            }

            else {enteredSquare.setAttribute('data-bkgd', 'gray1');
                console.log('firing gray1');
            }
        }

        else if (eraseMode.checked == true) {
            enteredSquare.removeAttribute('style');
            enteredSquare.removeAttribute('data-bkgd');
            enteredSquare.setAttribute('style', 'background-color: white;' );
        }

        else {console.log('mode isn\'t set yet');}
        
    } 
    e.stopPropagation();
    //console.log(e);

}

//each featue gets an on/off true/false
//only one can be true at a time --radio buttons?
//if [mode] is true, run [relevant function] in getMode
//else [nuthin?]

//radio values
// blacken
// customColor
// rainbow
// grayScale
// eraser