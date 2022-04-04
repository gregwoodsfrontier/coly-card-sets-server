import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import ICardSetsState, { GameState, ICard, IPlayer } from '../../types/ICardSetsState'

const NUM_OF_PATTERN = 4
const MAX_POINTS = 8

export class Card extends Schema implements ICard
{
    @type('number')
    pattern: number

    @type('number')
	points: number

    @type('string')
	owner: string

    @type('boolean')
	isDiscarded = false

    constructor(_pattern: number = 0, _pts: number = 1)
    {
        super()

        this.pattern = _pattern
        this.points = _pts
        this.owner = ""
    }
}

export class Player extends Schema implements IPlayer
{
    @type([Card])
    hand: ArraySchema<Card>

    @type([Card])
	sets: ArraySchema<Card>

    @type('number')
	points = 0

    constructor()
    {
        super()

        this.hand = new ArraySchema<Card>()
        this.sets = new ArraySchema<Card>()

    }
}

export class CardSetsState extends Schema implements ICardSetsState
{
	@type('number')
	gameState = GameState.WaitingForPlayers

    @type({ map: Player }) 
    players: MapSchema<Player>;

    @type([Card])
    deck: ArraySchema<Card>

	@type([Card])
	pot: ArraySchema<Card>

	@type('number')
	activePlayer = 0

	@type('number')
	winningPlayer = -1

	constructor()
	{
		super()

        this.deck = new ArraySchema();
        this.createDeck()
        this.shuffleDeck()

		this.pot = new ArraySchema()

        this.players = new MapSchema<Player>()
        
	}

    createDeck()
    {
        for(let i = 0; i < NUM_OF_PATTERN; i++)
        {
            for(let j = 1; j < MAX_POINTS; j++)
            {
                this.deck.push(new Card(i, j))
            }
        }
    }

    shuffleDeck()
    {
        this.deck.sort(() => Math.random() - 0.5)
    }
}