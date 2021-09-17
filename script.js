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
    
    for (let i = 0; i < currentSquares.length; i++) 
     
        currentSquares[i].addEventListener('mouseover', function() {currentSquares[i].classList.add('black')});
    
}

/* //reset grid to white
function whiten() {
    for (let i = 0; i < currentSquares.length; i++) 
     
        {currentSquares[i].classList.remove('black')};
    
} */