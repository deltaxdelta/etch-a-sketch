//add divs into #etchy
const etchy = document.getElementById('etchy');

function addSquare() {
    let div = document.createElement('div');
    etchy.appendChild(div);
    div.className = 'canvasSquare';
    
}

let currentSquares = document.getElementsByClassName("canvasSquare");

function wipeCanvas() {
    while (currentSquares.length > 0) {
        etchy.removeChild(currentSquares[0]);
    }
}


//add as many squares as entered with variable count
function buildGrid(count) {
    wipeCanvas(); //needs to remove all canvasSquare divs before running
    let gridSize = count * count;
    for(i = 0; i < gridSize; i++) {addSquare();}
    etchy.setAttribute('style', 'grid-template-columns: repeat(' + count + ', 1fr);');
    
}


//discuss: can buildGrid and addSquare be combined? Can't seem to get that to work, not sure why

//turn black with mouseover
//currentSquares.addEventListener('mouseover', blacken());
    //this doesn't work becasue currentSquares is an HTMLCollection

 //call this after grid loads, when mouse first hits canvas to make setting other colors easier
 
 etchy.addEventListener('mouseenter', blacken);

function blacken(){
    //refactor using currentSquares like an array cuz you can do that shit
    //instead of for loop use literally anything else to ensure nonbrokeness
    // Order of preference of ways of iterating:
    // 1. map
    // 2. forEach
    // 3. for ... of
    //the eventListener function needs a name for removal callback

    for (const datSquare of currentSquares) {
        datSquare.addEventListener('mouseover', () => 
        {datSquare.classList.add('black');
        });
    } 



    /*   for (let i = 0; i < currentSquares.length; i++) 
     
        currentSquares[i].addEventListener('mouseover', function() {currentSquares[i].classList.add('black')});
     */
}



 //reset grid to white
function whiten() {
    /* for (let i = 0; i < currentSquares.length; i++) 
     
        {currentSquares[i].classList.remove('black')}; */
    //ditch for loop here as well

    for(const datSquare of currentSquares) {
        datSquare.classList.remove('black');
    }
} 

//ui control stuff, how to organize?

//grid size slider stuff
/* let showSliderOutput = document.getElementById('currentGridSize');
let sliderSet = document.getElementById('slider').value;
showSliderOutput.innerHTML = sliderSet + ' x ' + sliderSet;
//change the number displayed based on slider position
let slider = document.getElementById('slider');
slider.oninput = updateValue();
//not working yet!
function updateValue() {
    showSliderOutput.innerHTML = sliderSet + ' x ' + sliderSet; 
} */



//setting grid size w/ number input

//listen to change on input and pass to buildGrid
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
    span.innerHTML = sizeSet.value; //number in input is shown in span as well for nice AxA format 
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
    span.innerHTML = sizeSet.value;
}

//listen to plus button and run add on input - stepup?
const plus = document.getElementById('plus');

plus.addEventListener('click', biggen);

function biggen() {
    sizeSet.stepUp(); //doesn't register as a change for getNum to run
    buildGrid(sizeSet.value);
    span.innerHTML = sizeSet.value;
}

//if typed num is not >= 2 or <= 100 display error msg instead of passing to buildGrid
//listen for keydown, if too big/smol display error, cancel sizeSet eventListener? 
//wrap if/else around getNum, checking for invalid input?
//constraint validation?
//keyup/keydown?

//button to clear grid
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', whiten);



//change color of drawing: custom, rainbow
//add shading effect option (click from light gray to black)
//set default grid to 16x16 on pageload

//pick any color

const picker = document.getElementById('picker');

picker.addEventListener('change', getColor);

function getColor() {
    cloneCanvas();
    let newColor = picker.value;
    for (const datSquare of currentSquares) {
        datSquare.addEventListener('mouseenter', function newPaint()
        {datSquare.setAttribute('style', 'background-color: ' + newColor + ';' );}
        );
        
    }
} 



//to remove event listeners on canvas, use cloneCanvas
let canvasArea = document.getElementById('canvasArea');

function cloneCanvas() {
    let tempEtchy = etchy.cloneNode(true);
    tempEtchy.id = 'tempEtchy'; //this is not in the document
    etchy.remove();
    canvasArea.appendChild(tempEtchy);
    tempEtchy.id = 'etchy';
}

/* for (const datSquare of currentSquares) {
    datSquare.addEventListener('mouseover', () => 
    {datSquare.classList.add('black');
    });
} 
    etchy.setAttribute('style', 'grid-template-columns: repeat(' + count + ', 1fr);');
 */

//do I need to refactor blacken function to work like color picker?