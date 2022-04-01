import { Command, Dispatcher } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from "../rooms/CardSets"
import DrawCommand from './DrawCommand'

type Payload = {
	client: Client
	index: number
}

export default class DistributeHandCommand extends Command<CardSets>
{
	execute()
	{
        // TODO: hand each player a card from the deck
        console.log('distribute hand')

		return [
            new DrawCommand().setPayload({
                client: this.room.clients[0],
                numToDraw: 1
            }),
            new DrawCommand().setPayload({
                client: this.room.clients[1],
                numToDraw: 1
            })
        ]
	}
}