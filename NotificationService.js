//Notification Service
//Send notification via multiple channels like email, sms, push notifications
//Allow users to configure their preferred channels
//Handles batching and retries for failed notification
class NotificationService{
    constructor(){
       this.preferences = new Map();
}
setPreferences(user,channels){
    this.preferences.set(user,channels);
}
sendNotification(user,message){
    let channels = this.preferences.get(user)||['email'];
    for(let channel of channels){
        if(this.sendToChannel(channel,message)) return true;
    }
    return false;
}
sendToChannel(channel,message){
    try{
        console.log(`sending via ${channel}:${message}`);
        return true;
    }catch(err){
        console.log(`failed to send to ${channel}`);
        return false;
    }
}

}
//Test Case or use Cases

let notifier = new NotificationService()

notifier.setPreferences("Abhijit",["push","email"]);
notifier.sendNotification("Abhijit","your order is shipped")
