import { Peer } from "peerjs";
import { Sy_api } from "../state/api.mjs";
import { Bit } from "../state/bit.mjs";
import { cbt_PLAYER, cbt_ENEMY } from "../state/consts.mjs";

//used to sync peer-to-peer calls
class Network{
	
	static #gameId="GJNT_";
	static #getId(){
		let result = '';
		const returnLength = 5;
		//select from charas not likely to be confused for digits
		const characters = 'ABCDEFGHKMNPRSTUVWXYZ235689';
		const charactersLength = characters.length;
		for ( let i = 0; i < returnLength; i+=1 ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	static #isHost = false;
	static #peer = null;
	static #connection = null;
	static #options = {reliable:true};
	
	static #peerClose(e){
		console.log("peer: closed",e);//TODO: handle peer object destruction
	}
	static #peerDisconnect(e){
		console.log("peer: disconnect",e);//TODO: handle disconnection
	}
	static #peerError(e){
		console.log("peer: error",e);//TODO: handle error
	}
	static #peerOpen(e){
		console.log("peer: open",e);
		console.log("you are "+(Network.#isHost?"hosting":"joining"));
	}
	
	static #connectionClose(e){
		console.log("conn: close",e);//TODO: handle close
	}
	static #connectionError(e){
		console.log("conn: error",e);//TODO: handle error
	}
	static #connectionOpen(e){
		console.log("conn: open",e);
	}
	static async #connectionData(data){
		console.log("conn: data",data);
		//TODO: check control source. warn if not network? 
		//      add method to close() network when mission over
		
		//TODO: less hacky way of handling data
		//      to prevent infinite loops, do not let the API send network requests on a packet recieved
		Sy_api.api_setNetworking(null);
		switch(data.kind){//TODO: use switch consts
			case 'sync':{
				Sy_api.api_setState(data.state);
				break;
			}
			case 'join':{
				if(!Network.isHost()){
					console.warn("got join pack, but is not the host");
					break;
				}
				//merge client characters with your game's characters
				const hostState = Sy_api.api_cloneState();
				const pCh = hostState.varCharacters.filter((x)=>{
					return x.player_state == cbt_PLAYER;
				});
				const eCh = data.state.varCharacters.filter((x)=>{
					return x.player_state == cbt_ENEMY;
				});
				const allCh = pCh.concat(eCh);
				//TODO: set eCh starting positions?
				hostState.varCharacters = allCh;
				Network.send({kind:'sync',state:hostState});
				break;
			}
			case 'move':{
				const [idlex,idley] = Bit.GET_XY(data.idle_select);
				const [movx,movy] = Bit.GET_XY(data.move_destination);
				const [tgtx,tgty] = Bit.GET_XY(data.target_select);
				const preferredPath = data.preferred_path;
				await Sy_api.api_idle_selectCharacter(idlex,idley);
				await Sy_api.api_mov_selectDestination(movx,movy,preferredPath);
				await Sy_api.api_tgt_selectTarget(tgtx,tgty,preferredPath);
				break;
			}
			default:
				console.log("unknown packet",data);
				break;
		}
		Sy_api.api_setNetworking(Network);
		
	}
	
	static host(){
		Sy_api.api_setNetworking(Network);
		Network.#isHost = true;
		const hostId = Network.#getId();
		console.log("host: "+hostId);
		Network.#peer = new Peer(Network.#gameId+hostId,Network.#options);
		const peer = Network.#peer;
		peer.on('close',Network.#peerClose);
		peer.on('disconected',Network.#peerDisconnect);
		peer.on('error',Network.#peerError);
		peer.on('connection', (conn)=>{
			Network.#connection = conn;//TODO: handle if conn != null, error? warn?
			conn.on('open',Network.#connectionOpen);
			conn.on('close',Network.#connectionClose);
			conn.on('error',Network.#connectionError);
			conn.on('data',Network.#connectionData);
		});
		peer.on('open',Network.#peerOpen);
		return hostId;
	}
	static join(hostId){
		Sy_api.api_setNetworking(Network);
		Network.#isHost = false;
		const joinId = Network.#getId();
		console.log("joining:"+hostId+" as "+joinId);
		Network.#peer = new Peer(Network.#gameId+joinId,Network.#options);
		const peer = Network.#peer;
		peer.on('close',Network.#peerClose);
		peer.on('disconected',Network.#peerDisconnect);
		peer.on('error',Network.#peerError);
		//from the docs: (peer open)
		//You may use the peer before this is emitted, but messages to the server will be queued.
		//You should not wait for this event before connecting to other peers if connection speed is important.
		//-->this doesn't work as written? seems safter to establish a connection after waiting for peer.open...
		//peer.on('open',Network.#peerOpen);
		peer.on('open',(e)=>{
			Network.#peerOpen(e);
			Network.#connection = peer.connect(Network.#gameId+hostId);
			const conn = Network.#connection;
			conn.on('open',(e)=>{
				Network.#connectionOpen(e);
				//push join player's characters to the host
				Network.send({kind:'join',state:Sy_api.api_cloneState()});
			});
			conn.on('close',Network.#connectionClose);
			conn.on('error',Network.#connectionError);
			conn.on('data',Network.#connectionData);
		});
		
	}
	static send(message){
		if(!Network.#connection){
			console.warn("no connection established.",message);
			return;
		}
		//TODO: or if conn not open?
		Network.#connection.send(message);
	}
	//used by external components to tell if networking has been activated
	static isEnabled(){
		if(Network.#peer && Network.#connection){//TODO: should conn check be isEstablished()? instead
			return true;
		}
		return false;
	}
	static isHost(){
		if(Network.#isHost){
			return true;
		}
		return false;
	}
	
}


export {Network};