import { useState } from 'react'

const cardValues = {
  '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10, 'A': 11
}
const cardSuits = ['♠', '♥', '♦', '♣']
const allCards = Object.keys(cardValues).map((v) => cardSuits.map(s => v + s)).flat()

function App() {
  const [cards, setCards] = useState(() => [...allCards].sort(() => Math.random() - 0.5))
  const [takenCards, setTakenCards] = useState([])

  const takeCard = () => {
    const [takenCard, ...restCards] = cards
    setTakenCards([...takenCards, takenCard])
    setCards(restCards)
  }

  const reset = () => {
    setCards([...allCards].sort(() => Math.random() - 0.5))
    setTakenCards([])
  }

  const isTwoAces = takenCards.length === 2 && takenCards.every(card => card[0] === 'A')
  const currentSum = takenCards.reduce((acc, x) => acc + cardValues[x.slice(0, -1)], 0) - (isTwoAces ? 1 : 0)

  return (
    <>
      <div>
        {currentSum <= 21 && (
          <button onClick={takeCard}>
            Take card ({cards.length} in deck)
          </button>
        )}
        {currentSum > 21 && <>
          <div>You lose</div>
          <button onClick={reset}>Again</button>
        </>}
      </div>
      {!!takenCards.length && <>
        <div>
          Taken cards: {takenCards.map((card) => (
            <span key={card}>[{card}]</span>
          ))}
        </div>
        <div>Sum: {currentSum}</div>
      </>}
    </>
  )
}

export default App
