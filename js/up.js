let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let score = 0;
let $time = document.querySelector('#time')
let result = document.querySelector('#result')
let resultHeader = document.querySelector('#result-header')
let timeHeader = document.querySelector('#time-header')
let $gameTime = document.querySelector('#game-time')
let gameStart = false
$gameTime.addEventListener('input', setTime)
function setTime() {
    resultHeader.classList.add('hide')
    timeHeader.classList.remove('hide')
    $time.textContent = +$gameTime.value
}
function startGame() {
    score = 0
    setTime()
    $gameTime.setAttribute('disabled', true)
    resultHeader.classList.add('hide')
    timeHeader.classList.remove('hide')
    $start.classList.add('hide')
    $game.style.backgroundColor = '#fff'
    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        }
        else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    rednderBox()
}
function endGame() {
    $gameTime.removeAttribute('disabled')
    gameStart = false
    resultHeader.classList.remove('hide')
    timeHeader.classList.add('hide')
    $game.style.backgroundColor = '#ccc'
    $start.classList.remove('hide')
    $game.innerHTML = ''
    getScore()
}
function getScore() {
    return result.textContent = score.toString()
}

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
function handleBoxClick(event) {
    if (!gameStart) {
        return
    }
    if (event.target.dataset.box) {
        score++
        console.log(score);
        rednderBox()
    }
}
function setRandomPos(min, max) {
    return Math.floor(Math.random(min, max) * (max - min) + min)
}
function rednderBox() {
    gameStart = true
    $game.innerHTML = ''
    let boxSize = setRandomPos(20, 100)
    let box = document.createElement('div')
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    box.style.width = box.style.height = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = `rgb(${setRandomPos(0, 255)},${setRandomPos(0, 255)},${setRandomPos(0, 255)})`
    box.style.top = setRandomPos(0, maxTop) + 'px'
    box.style.left = setRandomPos(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')
    $game.insertAdjacentElement('afterbegin', box)
}
