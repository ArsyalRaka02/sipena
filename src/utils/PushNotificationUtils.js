import { Platform } from "react-native";
import messaging from '@react-native-firebase/messaging';
import { store } from "../store";

export default {
    getToken() {
        return new Promise(async (resolve, reject) => {
            if (Platform.OS === 'ios') {
                const authorizationStatus = await messaging().requestPermission();

                if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
                    console.log('User has notification permissions enabled.');
                } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
                    console.log('User has provisional notification permissions.');
                } else {
                    console.log('User has notification permissions disabled');
                }

                try {
                    let registerFirebase = await messaging().registerDeviceForRemoteMessages();
                    console.log("RegisterFirebase", registerFirebase);
                } catch (err) {
                    console.log("RegisterFirebaseErr", err);
                    reject(err);
                }
            }

            let registration_id = await messaging().getToken();
            console.log("Registrationid", registration_id);

            resolve(registration_id);
        });
    },

    registerDevice(pubnub, deviceToken, channels) {
        console.log("RegisterDevice", { pubnub, deviceToken, channels });

        // FCM
        pubnub.push.addChannels({
            channels: channels,
            device: deviceToken,
            pushGateway: "gcm",
        }, (status) => {
            console.log("addChannels", status);
        });

        // APNs2
        pubnub.push.addChannels({
            channels: channels,
            device: deviceToken,
            pushGateway: "apns2",
            environment: "production", // Required for APNs2
            topic: "com.crowdbotics.mute-shadow-31078-c4318183" // Required for APNs2
        }, (status) => {
            console.log("addChannels2", status);
        });
    },

    getMessagePayload(title, message) {
        return {
            "pn_apns": {
                "aps": {
                    "alert": {
                        "title": title,
                        "body": message
                    }
                },
                "pn_push": [
                    {
                        "push_type": "alert",
                        "targets": [
                            {
                                "environment": "production",
                                "topic": "com.crowdbotics.mute-shadow-31078-c4318183"
                            }
                        ],
                        "version": "v2"
                    }
                ]
            },
            "pn_gcm": {
                "notification": {
                    "title": title,
                    "body": message,
                    "sound": "default"
                }
            },
        };
    },

    sendNotification(targetId, title, message) {
        const pubnub = store.getState().pubnub;
        const messagePayload = {
            ...this.getMessagePayload(title, message),
            "text": message
        };

        pubnub.publish({
            message: messagePayload,
            channel: 'notification.' + targetId,
        }, (status) => {
            console.log("publish", status);
        });
    },

    sendChatNotification(targetId, title, message) {
        const pubnub = store.getState().pubnub;
        const messagePayload = {
            ...this.getMessagePayload(title, message),
            "text": message
        };

        pubnub.publish({
            message: messagePayload,
            channel: 'chat-notification.' + targetId,
        }, (status) => {
            console.log("publish", status);
        });
    }
}   