const deckOfCards = document.getElementById('deckOfCards');
const discardPile = document.getElementById('discardPile');
const deckSection = document.getElementById('deckSection');
const player1 = document.getElementById('player1');
const player1cards = document.getElementById('player1cards');
const player2 = document.getElementById('player2');
const numDeckCards = document.getElementById('numDeckCards');
const turnDisplay = document.getElementById('turnDisplay');
const selectedCard = document.getElementById('selectedCard');
let gameDeck = [];
let currentPlayer = '';
let currentSelection = '';
let previousDiscard = '';
let numToFlip = 13; 

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const positionMapper = {
    0: 'A',
    1: '2',
    2: '3',
    3: '4',
    4: '5',
    5: '6',
    6: '7',
    7: '8',
    8: '9',
    9: '10',
    10: 'J',
    11: 'Q',
    12: 'K',
}

const setupBoard = (playerInfo, players) => {
    player1.querySelector('p').innerHTML=players[0];
    player1.style.background = playerInfo[players[0]]
    player2.querySelector('p').innerHTML=players[1];
    player2.style.background = playerInfo[players[1]]
};

const clickCard = (e) => {
    const yourTurn = currentPlayer === user;
    const userMatch = e.target.dataset.user === user;
    const positionMatch = e.target.dataset.position === currentSelection.split(' ')[0];
    if (yourTurn && userMatch && positionMatch && e.target.dataset.value) {
        socket.emit('flip card', e.target.id, currentSelection);
        numToFlip -= 1;
        if (numToFlip === 0) {
            socket.emit('win round', user);
        }
    }
}

const dealCards = async (playerCards, players) => {
    player1cards.innerHTML = '';
    player2cards.innerHTML = '';
    for (let i = 0; i < playerCards[players[0]]; i++) {
        let card = document.createElement('div');
        card.dataset.value = gameDeck.pop();
        card.dataset.user = players[0];
        card.id = `${players[0]}-${i}`;
        card.addEventListener("click", clickCard);
        card.dataset.position = positionMapper[i];
        numDeckCards.innerHTML = gameDeck.length;
        player1cards.appendChild(card);
        await sleep(100);
    }
    await sleep(500);
    for (let i = 0; i < playerCards[players[1]]; i++) {
        let card = document.createElement('div');
        card.dataset.value = gameDeck.pop();
        card.dataset.user = players[1];
        card.id = `${players[1]}-${i}`;
        card.addEventListener("click", clickCard);
        card.dataset.position = positionMapper[i];
        numDeckCards.innerHTML = gameDeck.length;
        player2cards.appendChild(card);
        await sleep(100);
    }
};

const pickFromDeck = () => {
    if (currentPlayer === user && !currentSelection) {
        socket.emit('pick from deck');
    } else if (currentPlayer === user){
        alert('You can only pick one card per turn.  Discard to end your turn')
    } else {
        alert('its not your turn betch');
    }
}

const discardCard = () => {
    if (currentPlayer === user && currentSelection) {
        socket.emit('discard card');
        socket.emit('next turn');
    } else if (currentPlayer === user) {
        socket.emit('pick from discard');
    } else {
        alert('wait yo turn!')
    }
}

socket.on('start new round', function(deck, playerInfo, playerCards){
    gameDeck = deck;
    startGameButton.className = 'hidden';

    currentPlayer = '';
    currentSelection = '';
    previousDiscard = '';

    deckOfCards.className = '';
    deckSection.className = '';
    selectedCard.className = '';
    selectedCard.innerHTML = '';
    discardPile.className = 'empty';
    player1.className = 'playerArea';
    player2.className = 'playerArea';
    const players = Object.keys(playerInfo);
    setupBoard(playerInfo, players);
    dealCards(playerCards, players);
    numToFlip = playerCards[user];
});

socket.on('pick from deck', function(){
    selectedCard.className = 'selected';
    selectedCard.innerHTML = gameDeck.pop();
    numDeckCards.innerHTML = gameDeck.length;
    currentSelection = selectedCard.innerHTML;
});

socket.on('pick from discard', function(){
    if (!discardPile.innerHTML) {
        return;
    }
    selectedCard.className = 'selected';
    selectedCard.innerHTML = discardPile.innerHTML;
    currentSelection = selectedCard.innerHTML;
    discardPile.innerHTML = previousDiscard;
    if (!previousDiscard) {
        discardPile.className = 'empty';
    }
});

socket.on('discard card', function(){
    previousDiscard = discardPile.innerHTML;
    discardPile.className = '';
    discardPile.innerHTML = selectedCard.innerHTML;
    selectedCard.innerHTML = '';
    selectedCard.className = '';
});

socket.on('flip card', function(targetId, selection){
    const target = document.getElementById(targetId);
    target.classList = 'front';
    target.innerHTML = selection;
    selectedCard.innerHTML = target.dataset.value;
    target.dataset.value = ''
    currentSelection = selectedCard.innerHTML;
});

socket.on('change board color', function(playerInfo){
    setupBoard(playerInfo);
});

socket.on('next turn', function(player){
    currentPlayer = player;
    currentSelection = '';
    turnDisplay.innerHTML = `${currentPlayer}'s turn!`
});

const winRound = async (winningUser) => {
    await sleep(1000);
    if (winningUser === user) {
        alert(`Congrats ${winningUser}! You won this round!  Next round coming up!`);
        await sleep(2000);
        socket.emit('start new round');
        await sleep(500);
        socket.emit('next turn', winningUser);
    } else {
        alert(`${winningUser} won this round.  Better luck next round!`);
    }
}

socket.on('win round', async function(winningUser){
    await winRound(winningUser);
});
socket.on('win game', async function(winningUser){
    await sleep(1000);
    if (winningUser === user) {
        alert(`Congrats ${winningUser}! YOU WON THE GAME!!`);
    } else {
        alert(`${winningUser} WON THE GAME!  Better luck next time!!`);
    }
});