import React, { useCallback, useEffect, useState } from 'react'
import { getStates } from '../services/HomeAssistant'

export default function useWebSocket() {
    var id = 1
    const [ws, setWS] = useState<WebSocket | undefined >(undefined)
    const [entities, setEntities] = useState<Entity[]>([])

    const handleEvent = (event) => {
        setEntities((prevState) => {
            const newState : Entity = event.data.new_state
            const index = prevState.findIndex((entity) => entity.entity_id === newState.entity_id)
            prevState[index] = newState
            
            return [...prevState]
        })
    }

    useEffect(() => {
        getStates()
        .then(setEntities)

        const websocket = new WebSocket("wss://localhost:8123/api/websocket");

        websocket.onopen = (event) => {
            websocket.send(JSON.stringify(authMessage));
        };
    
        websocket.onmessage = (message) => {
            const data = JSON.parse(message.data)
            const type = data.type
            switch (type) {
                case 'auth_ok':
                    websocket.send(JSON.stringify(subscribe_to_events))
                    id += 1
                break;

                case 'event':
                    handleEvent(data.event)
                break;
                default:
                    console.log("unhandled event", type)
                
            }
        }
        setWS(websocket)
    }, [])
    
    const authMessage = {
        "type": "auth",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2YjRjM2QyYjY4MWM0NTRhYWVlYzFkODExMGYxYTUxZCIsImlhdCI6MTcwODkwNjczOSwiZXhwIjoyMDI0MjY2NzM5fQ.Ck_fbuGTd0iVLUpLdJM-JdHEk5KWoetvH-028cCuD-M"
    }

    const subscribe_to_events = {
        "id": id,
        "type": "subscribe_events",
        "event_type": "state_changed"
    }

    return { entities }
}