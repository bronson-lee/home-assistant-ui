import React, { useEffect, useState } from 'react'
import { LightCard } from './components'
import useWebSocket from './hooks/useWebSocket'
import { getServices } from './services/HomeAssistant'

export default function App() {

    const { entities } = useWebSocket()

    useEffect(() => {
        getServices()
        .then((response) => console.log(response))
    }, [])

    return <div className='app'>
        <LightCard entity={entities[58]} />
        <LightCard entity={entities[59]} />
    </div>
}