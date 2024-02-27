import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { HOME_ASSISTANT_BASE_URL, LONG_LIVED_TOKEN } from '../config.json'
import https from 'https';

const apiRequestor : AxiosInstance = axios.create({
    baseURL: HOME_ASSISTANT_BASE_URL,
    headers: {
        Authorization: `Bearer ${LONG_LIVED_TOKEN}`
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

const defaultReturn = ({data} : AxiosResponse) => data

export const getStates = () : Promise<Entity[]> => {
    return apiRequestor.get('/api/states')
    .then(defaultReturn)
}

export const setEntityState = (entity_id, state) => {
    return apiRequestor.post(`/api/states/${entity_id}`, state)
    .then(defaultReturn)
}

export const callService = (domain, service, service_data) => {
    return apiRequestor.post(`/api/services/${domain}/${service}`, service_data)
    .then(defaultReturn)
}