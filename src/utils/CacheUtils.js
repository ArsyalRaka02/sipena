import { store } from "../store";
import { setProfiles, setServices } from "../store/actions";
import { HttpRequest } from "./http"

export default {
    findService(id, dispatch) {
        let oldServices = store.getState().services;
        if (oldServices[id] == null) {
            HttpRequest.getServiceSingle(id).then((res) => {
                console.log("HttpRequest.getServiceSingle", res.data);
                let allService = { ...store.getState().services };
                allService[id] = res.data;
                dispatch(setServices(allService));
            }).catch((error) => {
                console.log("HttpRequest.getServiceSingle:err", error, error.response);
            });
        }
    },
    findProfile(id, dispatch) {
        let oldProfiles = store.getState().profiles;
        if (oldProfiles[id] == null) {
            HttpRequest.getOtherUserProfile(id).then((res) => {
                console.log("HttpRequest.getOtherUserProfile", res.data);
                let allProfiles = { ...store.getState().profiles };
                allProfiles[id] = res.data;
                dispatch(setProfiles(allProfiles));
            }).catch((error) => {
                console.log("HttpRequest.getServiceSingle:err", error, error.response);
            });
        }
    }
}