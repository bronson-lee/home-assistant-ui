import React, { useEffect, useState } from 'react'
import { LightCard } from './components'
import useWebSocket from './hooks/useWebSocket'

export default function App() {

    const { entities } = useWebSocket()

    return <div className='app'>
        <LightCard entity={entities[58]} />
        <LightCard entity={entities[59]} />
    </div>
}