import React, { useEffect, useState } from 'react'
import { ToggleButton } from 'react-aria-components'
import './Card.css'
import { callService } from '../services/HomeAssistant'

type CardProps = {
    children: React.ReactElement[] | React.ReactElement
    title: string
}

const Card = ({children, title} : CardProps) : React.ReactElement => {
    return <div className='card'>
        {children}
        <span>{title}</span>
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

    return <Card title={entity.attributes.friendly_name}>
        <ToggleButton
            isSelected={entity.state === 'on'}
            onChange={toggleLight}
        >
            <svg viewBox="-0.5 0 24 24" xmlns="http://www.w3.org/2000/svg" width='40px' height='40px'>
                <path d="M14,20A2,2 0 0,1 12,22H11A2,2 0 0,1 9,20H10A1,1 0 0,0 11,21H12A1,1 0 0,0 13,20H14M15,17A2,2 0 0,1 13,19H10A2,2 0 0,1 8,17V15C6.2,13.82 5,11.8 5,9.5A6.5,6.5 0 0,1 11.5,3A6.5,6.5 0 0,1 18,9.5C18,11.8 16.8,13.82 15,15V17M9,17A1,1 0 0,0 10,18H13A1,1 0 0,0 14,17V14.4C15.78,13.5 17,11.64 17,9.5A5.5,5.5 0 0,0 11.5,4A5.5,5.5 0 0,0 6,9.5C6,11.64 7.22,13.5 9,14.4V17Z"/>
            </svg>
        </ToggleButton>
        
    </Card>
}