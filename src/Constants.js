/*Constants for license managment*/

export const APP_IP_PORT = "http://localhost:4000";

export default Object.freeze({
   FETCH_Login_INFO:  APP_IP_PORT +"/employee/login",
   FETCH_ALL_USERS: APP_IP_PORT +"/employee/user",
   FETCH_ALL_VISITORS: APP_IP_PORT +"/visitor/user",
   CHANGE_PASSWORD: APP_IP_PORT + "/employee/user/changePassword/",
});