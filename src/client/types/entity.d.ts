declare type Entity = {
    attributes: LightEntityAttributes
    context: EntityContext
    entity_id: string
    last_changed: string
    last_updated:string
    state: string
}

declare type EntityContext = {
    id: string
    parent_id: string
    user_id: string
}

declare type LightEntityAttributes = {
    brightness: unknown
    color_mode: unknown
    device_id: string
    friendly_name: string
    icon: string
    supported_color_modes: string[]
    supported_features: number
    zone_id: string
}