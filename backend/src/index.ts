import { WebSocketServer } from "ws";


const wss=new WebSocketServer({port:8080})


wss.on("connection",(ws)=>{
      ws.send("user connected")

      ws.on("message",(message)=>{

        const msg=JSON.parse(message.toString())

        if(msg.type==="msgType"){
            wss.clients.forEach((client)=>{
                if(client.readyState===WebSocket.OPEN){
                    client.send(JSON.stringify({type:"msgType",payload:msg.payload.text}))
                }
            })
        }


      })
})



