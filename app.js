document.addEventListener('DOMContentLoaded',() => {

  const grid = document.querySelector('.grid')
  const squareDisplay = document.getElementById ('score')
  const width=8
  const squares=[]
  let score=0

const candyColours=[
    'url(img/red-candy.png)',
    'url(img/yellow-candy.png)',
    'url(img/orange-candy.png)',
    'url(img/purple-candy.png)',
    'url(img/green-candy.png)',
    'url(img/blue-candy.png)'
]
  
//creat board

  function creatBoard(){

    for(let i = 0; i < width*width; i++) {
        const square=document.createElement('div')
        square.setAttribute ('draggable', true)
         square.setAttribute ('id', i)
        let randomColor= Math.floor (Math.random() * candyColours.length)
        square.style.backgroundImage= candyColours[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
  }
   
  creatBoard()

  //drag the candies

  let colorBeingDraged
  let colorBeingReplaced
  let squareIdBeingDragged
  let squareIdBeingReplaced

  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('dragleave', dragLeave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))


  // functions of each drag feature

    function dragStart(){
        colorBeingDraged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDraged)
        console.log(this.id, 'dragstart') // this.id is used here to call the id of each drag feature which we have created using set-attribute 
    }

    function dragOver(e) {
        e.preventDefault()
        
    }

    function dragEnter(e) {
        e.preventDefault()
     

    }

    function dragLeave() {
        
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDraged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    function dragEnd() {
       console.log (this.id, 'dragend')

       // what is a valid move?

        let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged -width,squareIdBeingDragged +1,squareIdBeingDragged +width]

        let validMove= validMoves.includes(squareIdBeingReplaced) //squareIdBeingReplaced is included in our validmoves array , the value is true
           
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        }
        else if (squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage=colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage=colorBeingDraged
        }
        else squares[squareIdBeingDragged].style.backgroundImage=colorBeingDraged
    }

//drop candies
function moveDown(){
    for (i = 0; i < 55; i++) {
        if(squares[i+width].style.backgroundImage === ''){
            squares[i+width].style.backgroundImage=squares[i].style.backgroundImage
            squares[i].style.backgroundImage=''
            const firstRow=[0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage==''){
                let randomColor=Math.floor(Math.random()*candyColours.length)
                squares[i].style.backgroundImage = candyColours[randomColor]
            }
        }
    }
}




//checking for matches
//check for row four
function checkRowForFour(){
    for(i=0; i<60; i++){

        let rowOfFour = [i,i+1, i+2, i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlack = squares[i].style.backgroundImage === ''

        const notValid =[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlack)){
        score += 4
        squareDisplay.innerHTML= score
        rowOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
        })
     }
  }
}

checkRowForFour()

//check for column Four
function checkColumnForFour(){
    for(i=0; i<39; i++){

        let columnOfFour = [i,i+width, i+width*2, i+width*3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlack = squares[i].style.backgroundImage === ''

        if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlack)){
        score += 4
        squareDisplay.innerHTML= score
        columnOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
        })
     }
  }
}


checkColumnForFour()


//check for row three
function checkRowForThree(){
    for(i=0; i<61; i++){

        let rowOfThree = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlack = squares[i].style.backgroundImage === ''

        const notValid =[6, 7,14,15,22,30,31,38,39,46,47,54,55]
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlack)){
        score += 3
        squareDisplay.innerHTML= score
        rowOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
        })
     }
  }
}

checkRowForThree()

//check for column three
function checkColumnForThree(){
    for(i=0; i<47; i++){

        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlack = squares[i].style.backgroundImage === ''

        if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlack)){
        score += 3
        squareDisplay.innerHTML= score
        columnOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
        })
     }
  }
}

checkColumnForThree()



window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
   
}, 100)






})