
import * as moment from "moment"
import axios from "axios"
import { useSelector } from "react-redux"
import { useState } from "react"
import { data } from "../../sub-components/Calendar/Axios/data"






export const showEvent = (event)=>{
    console.log("event to be shown on the modal: ", event)
    return{
        type: "SHOW_EVENT",
        payload: event
    }
}

export const showEvents = (events)=>{
    
    return{
        type: "SHOW_EVENTS",
        payload: events
    }
}

export const ShowEventApi = (id, title) => async dispatch => {
     
        const convertedEvent = {
            title,
            id,
        }
        await dispatch(showEvent(convertedEvent))
}

export const ShowEventsApi = (events1) => async dispatch => {
     console.log("started fetching the api", result)

    const result = await axios.get("http://localhost/Tutorial/events/");
    

    try{
        const convertedDates = await events1.map(event=>{
            return{
              title: event.title,
            //   statusD: event.status,
              start: new Date(event.start) ,
              end: new Date(event.end) ,
              id: event.eventId,
              describe: event.description
            }
          })
        await dispatch(showEvents(convertedDates))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

