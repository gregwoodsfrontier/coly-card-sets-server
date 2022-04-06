import { Schema, ArraySchema, MapSchema, type, filter } from '@colyseus/schema'
import { Client } from 'colyseus'
import ICardSetsState, { GameState, ICard, IPlayer } from '../../types/ICardSetsState'
import Card from './Card'
import Player from './Player'

const NUM_OF_PATTERN = 4
const MAX_POINTS = 8

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