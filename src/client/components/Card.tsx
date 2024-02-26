import React, { useEffect, useState } from 'react'
import { ToggleButton } from 'react-aria-components'
import './Card.css'
import { callService } from '../services/HomeAssistant'

type CardProps = {
    children: React.ReactElement[] | React.ReactElement
}

const Card = ({children} : CardProps) : React.ReactElement => {
    return <div className='card'>
        {children}
    </div>
}

type LightCardProps = {
    entity: Entity
}

export const LightCard = ({entity} : LightCardProps) : React.ReactElement | null => {

    if(!entity) {
        return null
    }

    
    const toggleLight = () => {
        callService('light','toggle', { "entity_id" : entity.entity_id })
    }

    return <Card>
        <ToggleButton
            isSelected={entity.state === 'on'}
            onChange={toggleLight}
        >
            toggle
        </ToggleButton>
        <span>{entity.attributes.friendly_name}</span>
    </Card>
}