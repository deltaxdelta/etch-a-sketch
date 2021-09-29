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

//button to clear grid --going to just reload the whole thing
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', resetGrid);

function resetGrid() {
    buildGrid(sizeSet.value);
}


//pick any color


const picker = document.getElementById('picker');

picker.addEventListener('change', getColor);

function getColor() {
    //cloneCanvas();
   
    let newColor = picker.value;
    for (const datSquare of currentSquares) {
        datSquare.addEventListener('mouseenter', function newPaint()
        {datSquare.setAttribute('style', 'background-color: ' + newColor + ';' );}
        );
        
    }
} 

//to remove event listeners on canvas, use cloneCanvas
let canvasArea = document.getElementById('canvasArea');

//ISSUE cloneCanvas is appending more than one etchy element to document on successive calls
//not sure why since function removes etchy before replacing it with clone
//this seems to go away if using remove/append child methods
//now it doesn't see new etchy as a child of canvasArea, even though it is appended as such, and ID is changed???
//not sure, but can probably just scrub whatever child node canvasArea has? or lastChild?

//color modes work fine without this!
function cloneCanvas() {
    let tempEtchy = etchy.cloneNode(true);
    tempEtchy.id = 'tempEtchy';
    canvasArea.removeChild(etchy);
    canvasArea.appendChild(tempEtchy);
    tempEtchy.id = 'etchy';
   
    
    /* let tempEtchy = etchy.cloneNode(true);
    tempEtchy.id = 'tempEtchy'; //this is not in the document
    etchy.remove(); //this is still hanging out somewhere, but is off the document?
    // canvasArea.appendChild(tempEtchy); //this adds it to the document
    // tempEtchy.id = 'etchy'; */
    
}

//TODO: 
//rainbow mode option
//add shading effect option (click from light gray to black)
//eraser mode
//set default grid to 16x16 on pageload
//review event listener options for color input
//style to look not so garbage
//what is this runtime error?
//Clear button doesn't wipe canvas now :( --just set the grid at the same size again and yay?



//rainbow mode 

function rainbowColor() {
    //cloneCanvas(); --works without this
    
    for (const datSquare of currentSquares) {
        datSquare.addEventListener('mouseenter', function diffColors()
        {   let randoColor = Math.floor(Math.random()*16777215).toString(16);
            datSquare.setAttribute('style', 'background-color: #' + randoColor + ';' );
        }
        );
        
    }
    
} 

let rainbowMode = document.getElementById('rainbowMode');
rainbowMode.addEventListener('click', rainbowColor);

//grayscale mode
//each pass over square makes it 10% darker, with 100% == black

//since the colors are set, let's just get them
/* 
0 white (default) rgb(255, 255, 255) or #FFFFFF
1 rgb(240,240,240), #F0F0F0
2 rgb(228, 228, 228), #E4E4E4
3 rgb(198,198,198), #C6C6C6
4 rgb(172,172,172), #ACACAC
5 rgb(136, 136, 136), #888888
6 rgb(110,110, 110), #6E6E6E
7 rgb(88,88,88), #585858
8 rgb(55, 55, 55), #373737
9 black (stop here) rgb(0, 0, 0) or #000000
*/
//^^^these are classes now

//initiate grayscale mode
//if white or (anything but black) change to gray1
//if gray1, change to gray2...
//if gray 8, change to black
//if black, stays black

//className

//refactoring this mess
/* 

function grayScaleMode() {
    for (const datSquare of currentSquares) {
        datSquare.addEventListener('mouseenter', () => {
            
    
            if (datSquare.className == 'canvasSquare gray1') {
                datSquare.classList.remove = 'gray1';
                datSquare.classList.add = 'gray2';
            }
    
            else if (datSquare.className == 'canvasSquare gray2') {
                datSquare.classList.remove = 'gray2';
                datSquare.classList.add = 'gray3';
            }
    
            else if (datSquare.className == 'canvasSquare gray3') {
                datSquare.classList.remove = 'gray3';
                datSquare.classList.add = 'gray4';
            }
    
            else if (datSquare.className == 'canvasSquare gray4') {
                datSquare.classList.remove = 'gray4';
                datSquare.classList.add = 'gray5';
            }
    
            else if (datSquare.className == 'canvasSquare gray5') {
                datSquare.classList.remove = 'gray5';
                datSquare.classList.add = 'gray6';
            }
    
            else if (datSquare.className == 'canvasSquare gray6') {
                datSquare.classList.remove = 'gray6';
                datSquare.classList.add = 'gray7';
            }
    
            else if (datSquare.className == 'canvasSquare gray7') {
                datSquare.classList.remove = 'gray7';
                datSquare.classList.add = 'gray8';
            }
    
            else if (datSquare.className == 'canvasSquare gray8') {
                datSquare.classList.remove = 'gray8';
                datSquare.classList.add = 'black';
            }
    
            else {
                
                    datSquare.classList.add = 'gray1';}
                    
                }

        );
     
}
   
}
 */

function grayScaleMode() {
    //there may be a prettier way to do this iteratively, dunno
    for (const datSquare of currentSquares) {
        datSquare.addEventListener('mouseenter', function grayify()
        {   //magic goes here
            if (this.dataset.bkgd == 'gray1') {
                datSquare.setAttribute('data-bkgd', 'gray2');
                
            }

            else if (this.dataset.bkgd == 'gray2') {
                datSquare.setAttribute('data-bkgd', 'gray3');   
            }

            else if (this.dataset.bkgd == 'gray3') {
                datSquare.setAttribute('data-bkgd', 'gray4');
            }

            else if (this.dataset.bkgd == 'gray4') {
                datSquare.setAttribute('data-bkgd', 'gray5');
            }

            else if (this.dataset.bkgd == 'gray5') {
                datSquare.setAttribute('data-bkgd', 'gray6');
            }

            else if (this.dataset.bkgd == 'gray6') {
                datSquare.setAttribute('data-bkgd', 'gray7');
            }

            else if (this.dataset.bkgd == 'gray7') {
                datSquare.setAttribute('data-bkgd', 'gray8');
            }

            else if (this.dataset.bkgd == 'gray8') {
                datSquare.classList.add('black');
            }

            else {datSquare.setAttribute('data-bkgd', 'gray1');
            }
            

        }
        );
        
    }
    
} 

//let's use data tags!



//check if data-bkgd exists
//check value, increase to next gray value (gray2, gray3, etc) ---how?
//dataset.value?