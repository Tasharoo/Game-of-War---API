let deckId;
const deckCount = 1;
let data;
let computerScore = 0;
let playerScore = 0;
const computerCards = document.getElementById("computer");
const youCards = document.getElementById("me");
const cardInfo = document.getElementById("card-info");
const newDeckButton = document.getElementById("new-deck");
const newCardButton = document.getElementById("new-card");
const winner = document.getElementById("final-winner");
const resetBtn = document.getElementById("reset-btn");

async function handleClick() {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/?deck_count=${deckCount}`
  );
  const data = await res.json();
  deckId = data.deck_id;
  if (data.success) {
    cardInfo.innerHTML = `Deck successfully shuffled!
         <h2>Cards remaning : ${data.remaining}</h2>
       `;
  }
}
async function handleDeck() {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  if (!deckId) {
    cardInfo.innerHTML = "Please shuffle a new deck first!";
    computerCards.classList.add("card-placeholder");
    youCards.classList.add("card-placeholder");
  } else if (data.remaining === 0) {
    cardInfo.innerHTML = "No more cards left in the deck! shuffle a new deck!";
    newCardButton.disabled = true;
  }

  const winderText = whosTheWinner(data.cards[0], data.cards[1]);
  cardInfo.innerHTML = ` <h2>Cards remaning : ${data.remaining}</h2>`;
  computerCards.innerHTML = ` 
          <h2>${winderText}</h2>
          <h3>Computer: ${computerScore}</h3>
     <img class="card-placeholder" src=${data.cards[0].image}></button>`;
  youCards.innerHTML = `
        <img class="card-placeholder" src=${data.cards[1].image}></button>
     <h3>You: ${playerScore}</h3>`;
  computerCards.classList.remove("card-placeholder");
  youCards.classList.remove("card-placeholder");

  if (data.remaining === 0) {
    if (computerScore > playerScore) {
      winner.innerHTML = "Computer Wins the game!";
    } else if (playerScore > computerScore) {
      winner.innerHTML = "Player Wins the game!";
    } else {
      winner.innerHTML = "It's a tie game!";
    }
  }
}
function resetScore() {
  playerScore = 0;
  computerScore = 0;
  document.location.reload();
}
function whosTheWinner(card1, card2) {
  const cardValues = {
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    JACK: "11",
    QUEEN: "12",
    KING: "13",
    ACE: "14",
  };
  card1 = cardValues[card1.value];
  card2 = cardValues[card2.value];
  if (card1 > card2) {
    computerScore++;
    return "computer Wins!";
  } else if (card2 > card1) {
    playerScore++;
    return "Player Wins!";
  } else if (card1 === card2) {
    return "Its a war!";
  }
}

newDeckButton.addEventListener("click", handleClick);
newCardButton.addEventListener("click", handleDeck);
resetBtn.addEventListener("click", resetScore);
