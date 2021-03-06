import axios from 'axios'
const basePath = 'https://evening-escarpment-53669.herokuapp.com'


export default {
    //READ events
    getOpenEvents({ commit }) {
        commit("fetchingEvents")
        axios.get(`${basePath}/api/open/events`)
            .then(response => {
                commit("fetchedEvents", response.data)
            })
            .catch(error => {
                commit("fetchEventsError")
            })
    },
    //READ event (SHOW)
    getEvent({ commit }, eventID) {
        commit("fetchingEvent")
        axios.get(`${basePath}/api/event/${eventID}`)
            .then(response => {
                commit('fetchedEvent', response.data)
            })
            .catch(error => {
                console.error("getEvent action error: ", error)
                commit("fetchEventError")
            })
    },
    resetAddEventSuccess({ commit }) {
        commit("resetAddEventSuccess")
    },
    //CREATE event
    addEvent({ commit }, eventData) {
        commit("addingEvent")
        axios.post(`${basePath}/api/events`, eventData.newEvent)
            .then(response => {
                console.table("addEvent action response: ", response)
                commit("addedEvent", response.data)
                eventData.router.push(`/event/${response.data.ID}`)
            })
            .catch(error => {
                console.error("addEvent action error: ", error)
                commit("addEventError")
            })
    },
    //UPDATE event
    updateEvent({ commit }, updatedEventObj) {
        const updatedEvent = {
            ID: updatedEventObj.updatedEvent.ID,
            NPOID: updatedEventObj.updatedEvent.NPOID,
            Name: updatedEventObj.updatedEvent.Name,
            StartTime: updatedEventObj.updatedEvent.StartTime,
            EndTime: updatedEventObj.updatedEvent.EndTime,
            Tags: updatedEventObj.updatedEvent.Tags,
            Description: updatedEventObj.updatedEvent.Description,
            Location: updatedEventObj.updatedEvent.Location,
            NumOfVolunteers: updatedEventObj.updatedEvent.NumOfVolunteers
        }
        commit("updatingEvent")
        axios.patch(`${basePath}/api/events/${updatedEvent.ID}`, updatedEvent)
            .then(response => {
                console.table("updateEvent action response: ", response)
                commit("updatedEvent", response.data)

            })
            .catch(error => {
                console.error("updateEvent action error: ", error)
                commit("updateEventError")
            })
    },
    //DELETE Event
    deleteEvent({ commit }, eventID) {
        commit("deletingEvent")
        axios.delete(`${basePath}/api/events/delete/${eventID}`)
            .then(response => {
                commit("deletedEvent", response)
            })
            .catch(error => {
                console.error("deleteEvent action error: ", error)
                commit("deleteEventError")
            })
    }
}