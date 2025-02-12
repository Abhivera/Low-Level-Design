//LRU (Least Recently Used) Cache

//Static Inputs(fixed capacity)
//Dynamic Inputs (capacity can change at runtime)

// Working : When the cache is full, we need to remove the least recently used key (which is the first key in the Map).

class LRUCache{
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();//key value store 
    }

    get(key){
        if(!this.cache.has(key)) return -1;
        let value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key,value);//Move to end
         return value;
    }

    put(key,value){
        if(this.cache.has(key)) this.cache.delete(key);
        else if(this.cache.size>=this.capacity)
            this.cache.delete(this.cache.keys().next().value);//Evit LRU
            
        this.cache.set(key,value);
        
    }
}
// Test Case
let lru = new LRUCache(2);
lru.put(1, 1); // Add (1, 1)
lru.put(2, 2); // Add (2, 2)
console.log(lru.get(1)); // 1
lru.put(3, 3); // Evict (2, 2)
console.log(lru.get(2)); // -1 (not found