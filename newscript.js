//setting up grid stuff

function buildGrid(count) {
    
    wipeCanvas(); //needs to remove all canvasSquare divs before running
    let etchy = document.getElementById('etchy'); 
    span.innerText = count;
    let gridSize = count * count;
    for(i = 0; i < gridSize; i++) {addSquare();}
    etchy.setAttribute('style', 'grid-template-columns: repeat(' + count + ', 1fr);');
    
}

function addSquare() {
    let etchy = document.getElementById('etchy'); 
    let div = document.createElement('div');
    etchy.appendChild(div);
    div.className = 'canvasSquare';
    
}

function wipeCanvas() {
    const currentCanvas = document.getElementById('etchy');
    const childSquares = currentCanvas.childNodes;
    while (childSquares.length > 0) {
        currentCanvas.removeChild(childSquares[0]);
    }
}


//adjusting grid stuff

const sizeSet = document.getElementById('currentSize');
const span = document.getElementById('makeItSquare');

sizeSet.addEventListener('input', getNum);

function getNum() {
    //apparently you can still type in beyond min and max values, and also the function will run with no issue, this will overide
    if (sizeSet.value > 100) {sizeSet.value = 100;}

    if (sizeSet.value < 2) {sizeSet.value = 2}
   /* if (sizeSet.value < 2 || sizeSet.value > 100) { 
        badEntry(); //show error tooltip with bad entries
    } */
   else {
   // closeOut(); //close error message if there's a good entry put in
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


//used by getMode and modeButtons
const blackMode = document.getElementById('blacken');
        const rainbowMode = document.getElementById('rainbow');
        const grayMode = document.getElementById('grayScale');
        const eraseMode = document.getElementById('eraser');
        const customColor = document.getElementById('customColor');

//pseudo button divs
const blackBtn = document.getElementById('black');
const colorBtn = document.getElementById('color');
const multiBtn = document.getElementById('multi');
const shadyBtn = document.getElementById('shady');
const whiteBtn = document.getElementById('white');

//set one eventListener on grid squares
const etchy = document.getElementById('etchy');

etchy.addEventListener('mouseover', getMode);

function getMode(e) {
   //this keeps it for the children
    if(e.target !== e.currentTarget) {
        let enteredSquare = e.target;
        

        if(blackMode.checked === true) {
          
            enteredSquare.removeAttribute('style');
            enteredSquare.removeAttribute('data-bkgd');
            enteredSquare.setAttribute('style', 'background-color: black;' );}
         
        else if (customColor.checked === true) {
        
            enteredSquare.removeAttribute('data-bkgd');
            const picker = document.getElementById('picker');
            enteredSquare.setAttribute('style', 'background-color: ' + picker.value + ';' );
            }
        
        
        else if (rainbowMode.checked === true) {
        
            enteredSquare.removeAttribute('style');
            enteredSquare.removeAttribute('data-bkgd');
            let randoColor = Math.floor(Math.random()*16777215).toString(16);
            enteredSquare.setAttribute('style', 'background-color: #' + randoColor + ';' );}
        
        else if (grayMode.checked == true) {
         
            enteredSquare.removeAttribute('style');
            

            if (enteredSquare.dataset.bkgd == 'gray1') {
                enteredSquare.setAttribute('data-bkgd', 'gray2');
            }

            else if (enteredSquare.dataset.bkgd == 'gray2') {
                enteredSquare.setAttribute('data-bkgd', 'gray3');  
            }

            else if (enteredSquare.dataset.bkgd == 'gray3') {
                enteredSquare.setAttribute('data-bkgd', 'gray4');
            }

            else if (enteredSquare.dataset.bkgd == 'gray4') {
                enteredSquare.setAttribute('data-bkgd', 'gray5');
            }

            else if (enteredSquare.dataset.bkgd == 'gray5') {
                enteredSquare.setAttribute('data-bkgd', 'gray6');
            }

            else if (enteredSquare.dataset.bkgd == 'gray6') {
                enteredSquare.setAttribute('data-bkgd', 'gray7');
            }

            else if (enteredSquare.dataset.bkgd == 'gray7') {
                enteredSquare.setAttribute('data-bkgd', 'gray8');
            }

            else if (enteredSquare.dataset.bkgd == 'gray8') {
                enteredSquare.classList.add('black');
            }

            else {enteredSquare.setAttribute('data-bkgd', 'gray1');
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

//default to 16x16 grid on load/reload

window.addEventListener('onload', buildGrid(16));


//improving the UI

//setting modes with clicks on buttons




let modes2 = document.getElementsByClassName('mode');

let modeArray = Array.from(modes2);

modeArray.forEach((leMode) => {leMode.addEventListener('click', (e) => {
    otherClear();
    leMode.classList.add('activeMode');
    
})});


//this gets messy with so many child nodes

// could this just be elements by classList mode?
// modeArea.addEventListener('click', colorActive);
/* function colorActive(e) {
     //remove activeMode for other buttons
    otherClear();

         
    //this keeps it for the children
    if(e.target !== e.currentTarget) {
        let currentMode = e.target;
        if (currentMode.tagName == 'LABEL') {
            currentMode.parentNode.classList.add('activeMode');
            console.log(currentMode);
            console.log('this was the label');
            
        }

      else if (currentMode.id == 'picker') {
        currentMode.parentNode.classList.add('activeMode');
        customColor.checked = true;
      }

        else {currentMode.classList.add('activeMode'); 
                console.log(currentMode);
                console.log('this was the div')}

    }
   



    e.stopPropagation(); 
} */

//super stuck with removing specific class from children of modeArea so will do this for now. I either can't iterate through the pile of elements or remove method doesn't work
//and yet this does
/* function clearActive () {
    document.getElementById('black').classList.remove('activeMode');
    document.getElementById('color').classList.remove('activeMode');
    document.getElementById('multi').classList.remove('activeMode');
    document.getElementById('shady').classList.remove('activeMode');
    document.getElementById('white').classList.remove('activeMode');
    
} */

let modeArea = document.getElementById('modeArea');
let modeDivs = modeArea.childNodes;
function otherClear () {
    Array.from(modeDivs).forEach((el) => {
        if (el.id == undefined){}
        else {el.classList.remove('activeMode')}
    });
}


//I don't think these are helpful

//for the divs/pseudo buttons to click radio buttons
/* modeArea.addEventListener('click', setMode);

function setMode(e) {
    
    let clickedOn = e.target;
   
    if (clickedOn.id == 'black') {
        blackMode.checked = true;
    }

    else if (clickedOn.id == 'color') {
        customColor.checked = true;
    }

    else if (clickedOn.id == 'multi') {
        rainbowMode.checked = true;
    }

    else if (clickedOn.id == 'shady') {
        grayMode.checked = true;
    }

    else if (clickedOn.id == 'white') {
        eraseMode.checked = true;
    }

    else {console.log('that was not a div click')}

} */

//clicking label also sets active mode on psuedo button

let radios = document.querySelectorAll('input[type=radio]');

radios.forEach(radio => radio.addEventListener('change', markActive));

function markActive(e) {
    otherClear();
    let activeRadio = e.target;
    activeRadio.parentElement.classList.add('activeMode');
}

//the color button does weird things
colorBtn.addEventListener('click', activeBtn);

function activeBtn() {
    colorBtn.classList.add('activeMode');
    customColor.checked = true;
}