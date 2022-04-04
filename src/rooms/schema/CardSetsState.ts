import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import ICardSetsState, { GameState, ICard, IPlayer } from '../../types/ICardSetsState'

export class Card extends Schema implements ICard
{
    @type('number')
    pattern: number

    @type('number')
	points: number

    @type('string')
	owner: string

    @type('boolean')
	isDiscarded: false
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

    @type(["number"])
    deck: ArraySchema<number>

	@type(['number'])
	pot: ArraySchema<number>

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
        // this.players.set("playerA", new Player())
	}

    createDeck()
    {
        for(let i = 0; i < 32; i++)
        {
            this.deck.push(i)
        }
    }

    shuffleDeck()
    {
        this.deck.sort(() => Math.random() - 0.5)
    }
}