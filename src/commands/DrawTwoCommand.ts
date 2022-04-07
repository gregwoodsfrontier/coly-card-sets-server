import { Command, Dispatcher } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from "../rooms/CardSets"
import {DrawCommand, PayloadDraw} from './DrawCommand'


export default class DrawTwoCommand extends Command<CardSets>
{
	execute()
	{
        // TODO: hand each player a card from the deck
        const {activePlayer} = this.room.state
        const data = {
            client: this.room.clients[activePlayer],
            numToDraw: 2
        } as PayloadDraw

        console.log(`draw 2 cards for player ${activePlayer}`)

		return new DrawCommand().setPayload(data)
	}
}