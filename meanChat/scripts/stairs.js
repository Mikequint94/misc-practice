let gameDeck = [];
let discardDeck = [];
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
    if (players.length > 2) {
        player3.querySelector('p').innerHTML=players[2];
        player3.style.background = playerInfo[players[2]]
    }
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

const createNewCard = async (playerIdx, cardIdx, players) => {
    let card = document.createElement('div');
    card.dataset.value = gameDeck.pop();
    card.dataset.user = players[playerIdx];
    card.id = `${players[playerIdx]}-${cardIdx}`;
    card.addEventListener("click", clickCard);
    card.dataset.position = positionMapper[cardIdx];
    numDeckCards.innerHTML = gameDeck.length;
    await sleep(100);
    return card;
};

const dealCards = async (playerCards, players) => {
    player1cards.innerHTML = '';
    player2cards.innerHTML = '';
    player3cards.innerHTML = '';
    for (let i = 0; i < playerCards[players[0]]; i++) {
        let card = await createNewCard(0, i, players);
        player1cards.appendChild(card);
    }
    await sleep(500);
    for (let i = 0; i < playerCards[players[1]]; i++) {
        let card = await createNewCard(1, i, players);
        player2cards.appendChild(card);
    }
    await sleep(500);
    for (let i = 0; i < playerCards[players[2]]; i++) {
        let card = await createNewCard(2, i, players);
        player3cards.appendChild(card);
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
    discardPile.innerHTML = '';
    player1.className = 'playerArea';
    player2.className = 'playerArea';
    const players = Object.keys(playerInfo);
    if (players.length > 2) {
        player3.className = 'playerArea';
    }
    setupBoard(playerInfo, players);
    dealCards(playerCards, players);
    numToFlip = playerCards[user];
});

socket.on('pick from deck', function(){
    if (gameDeck.length < 1) {
        alert('Out of cards. Shuffling discard into deck!');
        gameDeck = discardDeck;
        discardDeck = [];
        discardPile.innerHTML = '';
        previousDiscard = '';
        discardPile.className = 'empty';
    }
    selectedCard.innerHTML = gameDeck.pop();
    selectedCard.className = 'selected';
    if (['♥', '♦'].includes(selectedCard.innerHTML.split(' ')[1])) {
        selectedCard.classList.add('red');
    }
    numDeckCards.innerHTML = gameDeck.length;
    currentSelection = selectedCard.innerHTML;
});

socket.on('pick from discard', function(){
    if (!discardPile.innerHTML) {
        return;
    }
    selectedCard.className = 'selected';
    selectedCard.innerHTML = discardPile.innerHTML;
    if (['♥', '♦'].includes(selectedCard.innerHTML.split(' ')[1])) {
        selectedCard.classList.add('red');
    }
    currentSelection = selectedCard.innerHTML;
    discardPile.innerHTML = previousDiscard;
    if (!previousDiscard) {
        discardPile.className = 'empty';
    }
});

socket.on('discard card', function(){
    discardDeck.unshift(selectedCard.innerHTML);
    previousDiscard = discardPile.innerHTML;
    discardPile.className = '';
    discardPile.innerHTML = selectedCard.innerHTML;
    if (['♥', '♦'].includes(discardPile.innerHTML.split(' ')[1])) {
        discardPile.classList.add('red');
    }
    selectedCard.innerHTML = '';
    selectedCard.className = '';
});

socket.on('flip card', function(targetId, selection){
    const target = document.getElementById(targetId);
    target.classList = 'front';
    target.innerHTML = selection;
    if (['♥', '♦'].includes(target.innerHTML.split(' ')[1])) {
        target.classList.add('red');
    }
    selectedCard.innerHTML = target.dataset.value;
    if (['♥', '♦'].includes(selectedCard.innerHTML.split(' ')[1])) {
        selectedCard.classList.add('red');
    } else {
        selectedCard.className = 'selected';
    }
    target.dataset.value = ''
    currentSelection = selectedCard.innerHTML;
});

socket.on('change board color', function(playerInfo){
    const players = Object.keys(playerInfo);
    setupBoard(playerInfo, players);
});

socket.on('next turn', function(player){
    currentSelection = '';
    currentPlayer = player;
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