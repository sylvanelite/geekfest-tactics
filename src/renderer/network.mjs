//todo: npm install, or <script src="https://unpkg.com/peerjs@1.3.2/dist/peerjs.min.js"></script>
import { Peer } from "peerjs";

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
		//TODO: if host, send init to client?
	}
	static #connectionData(e){
		console.log("conn: data",e);
		//TODO: handle data
	}
	
	static host(){
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
	}
	static join(hostId){
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
			conn.on('open',Network.#connectionOpen);
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