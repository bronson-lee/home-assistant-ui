import React, { useEffect, useState } from 'react'
import { LightCard } from './components'
import useWebSocket from './hooks/useWebSocket'

export default function App() {

    const { entities } = useWebSocket()

    useEffect(() => {
        console.log(entities)
    }, [entities])

    return <div className='app'>
        <LightCard entity={entities[57]} />
        <LightCard entity={entities[58]} />
    </div>
}