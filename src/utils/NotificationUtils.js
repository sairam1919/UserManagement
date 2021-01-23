var  lastmessage = ""

function getsetNotificationmsg(allCulprits, previousCulprits){
    console.log("previousCulprits", previousCulprits)
    console.log("culprits", allCulprits)
    var peopleOverStaying=[]
    var msg=""
    var msglist=[]

    if(previousCulprits.length!==allCulprits.length){
        if(previousCulprits.length<allCulprits.length){
            allCulprits.map(e=>{
                e.present=false
                previousCulprits.map(x=>{
                    if(x.UserPass===e.UserPass){
                        e.present=true
                    }
                })

                var message = "Pass Time out !! || time expired: "+e.user_type + " Name - " + e.first_name +"  "+  e.last_name + " Current Location " +" at " + e.Current_Location 
                peopleOverStaying.push(message)
              
            })
            console.log("culprits after push", allCulprits)

            allCulprits.map(e=>{
                if(e.present===false){
                    var message = "Pass Time out !! || time expired: "+e.user_type + " Name - " + e.first_name +"  "+  e.last_name + " Current Location " +" at " + e.Current_Location 
                    msglist.push(message)
                    msg=message
                }
            })
         
           
        }
        else{
            previousCulprits.map(x=>{
                x.present=false
                allCulprits.map(e=>{
                    if(x.UserPass===e.UserPass){
                        x.present=true
                    }
                   
                })
                 var message ="Pass Cleared || time Stamp: "+ x.OutTime +"||"+"user type:"+"||"+ x.user_type+"||"+" Name - " + x.first_name +"  "+  x.last_name + "  " +"||"+" Current Location  " + x.Current_Location 
                    peopleOverStaying.push(message)
               
            })
           
            previousCulprits.map(e=>{
                if(e.present===false){
                    var message ="Pass Cleared || time Stamp: "+ e.OutTime +"||"+"user type:"+"||"+ e.user_type+"||"+" Name - " + e.first_name +"  "+  e.last_name + "  " +"||"+" Current Location  " + e.Current_Location 
                    msg=message
                    msglist.push(message)
                }
            })
        

        }
        // previousCulprits=allCulprits
    }
    console.log("yyy",peopleOverStaying);
    
    
    
    return {peopleOverStaying,
    msg
    }
    
}


function datecheck(data){
    console.log("all without current location",data);
    
    var current = new Date();
    var nowHours = current.getHours();
    var nowMinutes = current.getMinutes();
    var culpritUsers=[]
    

    data.map(e=>{
      //check if hours are correct including the boundary values
       if( parseInt(nowHours)>= parseInt(e.fromTime.slice(0, 2)) 
       
                        &&
       
       parseInt(nowHours)<=parseInt(e.toTime.slice(0, 2))){

        //check if hour bondaries are same
        if(parseInt(nowHours)===parseInt(e.fromTime.slice(0, 2))){
             // if same bondaries check minuirts
           if( parseInt(nowMinutes)< parseInt(e.fromTime.slice(3, 5))){
            culpritUsers.push(e)
           }
        }
        else if(parseInt(nowHours)===parseInt(e.toTime.slice(0, 2))){
                         // if same bondaries check minuirts
            if( parseInt(nowMinutes)> parseInt(e.toTime.slice(3, 5))){
                culpritUsers.push(e)
               }
        }
    
       }
       else{
        culpritUsers.push(e)
       }
      
    })
  

    
    return culpritUsers
}

export const NotificationUtils = {
    datecheck,
    getsetNotificationmsg
}