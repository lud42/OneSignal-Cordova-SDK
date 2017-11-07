var OneSignal_launchString = "";
var OneSignal_JSBridge = require('./OneSignalSDK');
var OneSignal_app_id = null;
var OneSignal_opened_callback = null;

module.exports = {
    setNotificationReceivedHandler: (successCallback, errorCallback, params) => {},

    setNotificationOpenedHandler: (successCallback, errorCallback, params) => {
        OneSignal_opened_callback = successCallback;
    },

    init: (successCallback, errorCallback, params) => {
        OneSignal_app_id = params[0];

        OneSignal_JSBridge.addEventListener("notificationopened", (e) => {
            let additionalData = e.additionalData;

            if (additionalData != null)
                additionalData = JSON.parse(e.additionalData);

            let newData = {
                message: e.message,
                additionalData: additionalData,
                isActive: e.isActive
            };
            OneSignal_opened_callback(newData, {
                keepCallback: true
            });
        });

        OneSignal_JSBridge.init(OneSignal_app_id, OneSignal_launchString);
    },

    setInFocusDisplaying: (successCallback, errorCallback, params) => {},

    getPermissionSubscriptionState: (successCallback, errorCallback, params) => {},

    addPermissionObserver: (successCallback, errorCallback, params) => {},

    addSubscriptionObserver: (successCallback, errorCallback, params) => {},

    getTags: (successCallback, errorCallback, params) => {
        // OneSignal_JSBridge.addEventListener("gettagsevent", (e) => {
        //     successCallback(JSON.parse(e.tags));
        // });
        OneSignal_JSBridge.gettags();
    },

    getIds: (successCallback, errorCallback, params) => {
        // OneSignal_JSBridge.addEventListener("idsavailableevent", (e) => {
        //     successCallback({
        //         userId: e.userId,
        //         pushToken: e.pushToken
        //     });
        // });
        OneSignal_JSBridge.getids();
    },

    sendTags: (successCallback, errorCallback, params) => {
        OneSignal_JSBridge.sendtags(JSON.stringify(params[0]));
    },

    deleteTags: (successCallback, errorCallback, params) => {
        OneSignal_JSBridge.deletetags(JSON.stringify(params));
    },

    promptForPushNotificationsWithUserResponse: (successCallback, errorCallback, params) => {},

    registerForPushNotifications: (successCallback, errorCallback, params) => {},

    setSubscription: (successCallback, errorCallback, params) => {},

    postNotification: (successCallback, errorCallback, params) => {},

    setLogLevel: (successCallback, errorCallback, params) => {},

    promptLocation: (successCallback, errorCallback, params) => {},

    syncHashedEmail: (successCallback, errorCallback, params) => {},

    enableVibrate: (successCallback, errorCallback, params) => {},

    enableSound: (successCallback, errorCallback, params) => {},

    clearOneSignalNotifications: (successCallback, errorCallback, params) => {}
};

require('cordova/exec/proxy').add('OneSignalPush', module.exports);
