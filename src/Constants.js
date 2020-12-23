/*Constants for license managment*/

export const APP_IP_PORT = "http://stlbiopdv02x115:4000";

export default Object.freeze({
   FETCH_Login_INFO: APP_IP_PORT + "/employee/login",
   FETCH_ALL_USERS: APP_IP_PORT + "/employee/user",
   FETCH_ALL_VISITORS: APP_IP_PORT + "/visitor/user",
   CHANGE_PASSWORD: APP_IP_PORT + "/employee/user/changePassword/",
   FETCH_CONFIG: APP_IP_PORT + "/employee/fetchConfig",
   SAVE_EMPLOYEE: APP_IP_PORT + "/employee/user",
   GENERATE_PASS: APP_IP_PORT + "/visitor/user",
   UPDATE_EMPLOYEE: APP_IP_PORT + "/employee/user/",
   UPDATE_VISITOR: APP_IP_PORT + "/visitor/user/",
   ASSIGN_REMOVE_ACCESS_VISITOR: APP_IP_PORT + "/visitor/assignremove/",
   USER_IMAGE: "data:image/jpeg;base64,"
});