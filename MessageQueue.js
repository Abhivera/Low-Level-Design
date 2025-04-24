//Message Queue

//Publish and Consume messages
//Support acknowledgement and retries.
//Ensure FIFO (First In and First Out)

class MessageQueue{
    constructor(){
        this.queue =[];
        this.processing = new Set();
}
    publish(message){
        this.queue.push(message);
    }
    consume(handler){
        if(this.queue.length===0) return false;
        let message = this.queue.shift();

        this.processing.add(message);
        try{
            handler(message);
            this.processing.delete(message);
        }catch(error){
            console.log("Retrying message",message);
            this.queue.push(message);
        }

    }
}

// Test Cases or Use Cases

let mq = new MessageQueue();
mq.publish("Message 1");
mq.publish("Message 2");
mq.consume((msg)=> console.log("Processed",msg));
mq.consume((msg)=> console.log("Processed",msg));

