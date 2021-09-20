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
    blacken();
}


//discuss: can buildGrid and addSquare be combined? Can't seem to get that to work, not sure why

//turn black with mouseover
//currentSquares.addEventListener('mouseover', blacken());
    //this doesn't work becasue currentSquares is an HTMLCollection

    
function blacken(){
    //refactor using currentSquares like an array cuz you can do that shit
    // Order of preference of ways of iterating:
    // 1. map
    // 2. forEach
    // 3. for ... of
    for (const datSquare of currentSquares) {
        datSquare.addEventListener('mouseover', () => {
            datSquare.classList.add('black');
        });
    }
    /*   for (let i = 0; i < currentSquares.length; i++) 
     
        currentSquares[i].addEventListener('mouseover', function() {currentSquares[i].classList.add('black')});
     */
}
//instead of for loop use literally anything else to ensure nonbrokeness

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
let showSliderOutput = document.getElementById('currentGridSize');
let sliderSet = document.getElementById('slider').value;
showSliderOutput.innerHTML = sliderSet + ' x ' + sliderSet;
//change the number displayed based on slider position
let slider = document.getElementById('slider');
slider.oninput = updateValue();
//not working yet!
function updateValue() {
    showSliderOutput.innerHTML = sliderSet + ' x ' + sliderSet; 
}
