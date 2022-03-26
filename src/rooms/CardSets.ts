import { Room, Client } from "colyseus";
import { CardSetsState } from "./schema/CardSetsState";
import { Dispatcher } from '@colyseus/command'
import { Message } from "../types/messages";
import PlayerSelectionCommand from "../commands/PlayerSelectionCommand";

export class CardSets extends Room<CardSetsState> {

  private dispatcher = new Dispatcher(this)

  onCreate (options: any) {

    this.maxClients = 2
    this.setState(new CardSetsState())

    this.onMessage(Message.PlayerSelection, (client, message: { index: number }) => {
      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        index: message.index
      })
    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
