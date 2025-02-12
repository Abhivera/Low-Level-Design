//In Memory Caching System

//Stores key-value pairs in memory.
//Supports TTL (Time To Live) for entries.
//Effienctly handles data expiry and retrieval.

class InMemoryCache{
    constructor(){
        this.cache= new Map()//stores key: value pair
}
set(key,value,ttl){
    let expiry = Date.now()+ttl;
    this.cache.set(key,{value,expiry});
}

get(key){
    if(!this.cache.has(key)) return null;
    let entry = this.cache.get(key);
    if(entry.expiry<Date.now()){
        this.cache.delete(key);
        return null;
    }
    return entry.value;

}

delete(key){
    this.cache.delete(key);

}

cleanup(){
    for(let [key,entry] of this.cache){
if(entry.expiry<Date.now())this.cache.delete(key);
    }
}

}
//Test Case

let cache = new InMemoryCache();
cache.set("a",100,5000);
console.log(cache.get("a"));
setTimeout(()=>console.log(cache.get("a")),6000);
