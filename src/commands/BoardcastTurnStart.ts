import { Command } from '@colyseus/command'
import { CardSets } from "../rooms/CardSets"
import { Message } from '../types/messages'

export default class BoardcastTurnStartCommand extends Command<CardSets>
{
	execute()
	{
        // TODO: boardcast to all that this is turn start
        const {activePlayer} = this.room.state
        this.room.broadcast(Message.BoardcastTurnStart, {
            playerIndex: activePlayer
        })

		return
	}
}