import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from "../rooms/CardSets"
import { Player } from '../rooms/schema/CardSetsState'
import DistributeHandCommand from './DistributeHandCommand'

type Payload = {
	client: Client
	index: number
}

export default class InitPlayersCommand extends Command<CardSets>
{
	execute()
	{
        // TODO: create a new player
        let numID = 0
        this.room.clients.forEach((c: Client) => {
            this.room.state.players.set(c.sessionId, new Player())
            const currPlayer = this.room.state.players.get(c.sessionId)
            currPlayer.id = numID
            numID += 1
        })

		return [
            new DistributeHandCommand()
        ]
	}
}