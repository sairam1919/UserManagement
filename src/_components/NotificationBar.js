import React,{ useState, useEffect } from 'react';
import Constants from "../Constants";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NotificationUtils} from '../utils/NotificationUtils'
import {useDispatch, useSelector } from 'react-redux'
import {selectBookAction} from '../actions/updateNotificationsAction'
const ITEM_HEIGHT = 48;
var previousCulprits ={}
export default function NotificationBar() {
    const [visitorInfo, setVisitorInfo] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [allCulprits, setAllCulprits] = React.useState([]);
    const [notification, setNotification] = React.useState(false);
    const [notificationmsg, setNotificationmsg] = React.useState({});
    const [msg, setmsg]= React.useState([])
    // const [savedPreviousData, setPreviousData] = React.useState(useSelector(state => state.NotificationCount));
    previousCulprits = useSelector(state => state.NotificationCount)
     
const dispatch = useDispatch()
    const open = Boolean(anchorEl);
   
    const handleClick = () => {
      setAnchorEl(!anchorEl);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
const getVisitorInfo = ()=>{
    //console.log("calling this every minut",allCulprits)
    
    var url = Constants.FETCH_ALL_VISITORS;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          //console.log(" all visitor data in notification", data.result)
          setVisitorInfo(data.result);
          const x =[]
           data.result.map(e=>{
            if(e.Current_Location){
              
              x.push(e)
            }
          })
          // var count = {};
          // x.forEach(function(i) { count[i] = (count[i]||0) + 1;});
        
       const culprits= NotificationUtils.datecheck(x)
       var idelmessages=[]
       culprits.map(e=>{
        var message = "Pass Time out !! || time expired: "+e.user_type + " Name - " + e.first_name +"  "+  e.last_name + " Current Location " +" at " + e.Current_Location 
        idelmessages.push(message)
    })
    setmsg(idelmessages)
     
       if(previousCulprits){
        if(culprits.length===previousCulprits.length){
          setNotification(false)
          //console.log(" the data i need to check", culprits,allCulprits)
        } 
        else{
          console.log("xxx",NotificationUtils.getsetNotificationmsg(culprits,previousCulprits).msg)
          setAllCulprits(culprits)
          setNotificationmsg( NotificationUtils.getsetNotificationmsg(culprits,previousCulprits))
          
            setNotification(true)
            setTimeout(() => {
             setNotification(false)
           }, 5000);
       
         
         }
       }
       dispatch(selectBookAction(culprits))
        }
      });
} 
// useEffect(() => {

//   setNotificationmsg( NotificationUtils.getsetNotificationmsg(allCulprits))
// },[notificationmsg])
    useEffect(() => {
        const interval = setInterval(() => {
            getVisitorInfo()
          }, 10000);
          return () => clearInterval(interval);
      }, []);
      //console.log("blah 22222",allCulprits)
    
    return (
      <div >
     
      <NotificationsActiveIcon  onClick={handleClick}  style={{ display: 'inline-block', right: 330, top: 10, position: 'absolute' }} />
     <div style={{ display: 'inline-block', right: 304, top: 45 , position: 'absolute'}}>
Notifications
     </div>


     
  
      {anchorEl && msg?  <div  
     style={{
      width: "32em",
      "overflow-wrap": "break-word",
      top: "50px",
      border: "5px solid #e4e4e4",
      position: "fixed",
      background: "rgb(54 65 83",
      "border-radius":"20px",
      "padding": "10px",
     "font-size": "larger",
   left:"56%",
   "z-index":1
   }}
     >
   
        {/* {notificationmsg.peopleOverStaying?notificationmsg.peopleOverStaying.map((option, index) => (
          <div key={index} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </div>
        )):<div>
         
          </div>} */}
          {msg?msg.map((option, index) => (
          <div key={index} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </div>
        )):null}
        </div>:<div>No Messages Yet ! </div>}
     
      
      {notification?  <div>
      {notificationmsg.msglist? notificationmsg.msglist.map((msg,index)=>{
        
          <div key={index} style={{  top: 50 , position: 'fixed'}}>Alert !{msg}</div>
       
        }): null}
         </div>:null}

     {notification?  <div style={{
          width: "32em",
          "overflow-wrap": "break-word",
          top: "50px",
          border: "5px solid #e4e4e4",
          position: "fixed",
          background: "#f67d7d",
          "border-radius":"20px",
          "padding": "10px",
         "font-size": "larger",
       left:"56%"
       }}>Alert !{notificationmsg.msg}</div>:null} 
     </div>
    );
}