import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import ICardSetsState, { GameState, IPlayer } from '../../types/ICardSetsState'

export class Player extends Schema implements IPlayer
{
    @type(['number'])
    hand: ArraySchema

    @type(['number'])
	sets: ArraySchema

    @type('number')
	points = 0

    constructor()
    {
        super()

        this.hand = new ArraySchema<number>(-1, -1, -1, -1)
        this.sets = new ArraySchema<number>(
            -1, -1, -1, 
            -1, -1, -1,
            -1, -1, -1
        )

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
	common: ArraySchema<number>

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

		this.common = new ArraySchema(-1, -1, -1, -1, -1, -1, -1)

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