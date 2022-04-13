import { Room, Client } from "colyseus";
import { CardSetsState } from "./schema/CardSetsState";
import { Dispatcher } from '@colyseus/command'
import { Message } from "../types/messages";
import { GameState } from "../types/ICardSetsState";
import PlayerSelectionCommand from "../commands/PlayerSelectionCommand";
import InitPlayersCommand from "../commands/InitPlayersCommand";

export interface IMessage {
  index: number
}

export class CardSets extends Room<CardSetsState> {

  private dispatcher = new Dispatcher(this)

  onCreate (options: any) {

    this.maxClients = 2

    this.setState(new CardSetsState())

    // receive message and then proceed to next step
    this.onMessage(Message.ConfirmTurnStart, (client: Client, data: IMessage) => {
      console.log('confirm turn start')
      // const passivePlayer = this.state.activePlayer === 0 ? 1 : 0
      // console.log(`passive : ${passivePlayer}`)
      this.broadcast(Message.CloseTurnStartDialog)
    })

    // player makes selection to form a set
    
    // or player chooses which card to dump to common place
    /* this.onMessage(Message.PlayerCardSelection, (client, message: { index: number }) => {
      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        index: message.index
      })
    }); */

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    // TODO: setup where a game can be played only if there are 2 players

		const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)

		client.send(Message.PlayerIndex, { playerIndex: idx })

		if (this.clients.length >= 2)
		{
			this.state.gameState = GameState.Playing

      // locks the rooom to prevent other players for entering
			this.lock()

      /**
       * InitPlayers chains with DistributeHand
       * DistributeHand chains with DrawCommand, which are called by the numbers of players
       */
      this.dispatcher.dispatch(new InitPlayersCommand())
		}
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.removePlayerFromRoom(client.sessionId)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  private removePlayerFromRoom(sessionId: string)
  {
    this.state.players.delete(sessionId)
  }

}
