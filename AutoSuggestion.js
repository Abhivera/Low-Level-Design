//lld of auto suggestion 

//Predicts search suggestions based on user input
//Retrieves suggestions from a preloaded dictionary
//Supports efficient prefix searching
//Trie DataStructure 

class TrieNode{
    constructor(){
        this.children={};
        this.isEndOfWord = false;
    }
}
class AutoSuggest{
    constructor(){
        this.root = new TrieNode();
    }
    insert(word){
        let node = this.root;
        for(let char of word ){
if(!node.children[char]) node.children[char] = new TrieNode();
node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(prefix){
        let node = this.root;
        for(let char of prefix){
            if(!node.children[char]) return [];
            node = node.children[char];
        }
        return  this.collectWords(node,prefix);
    }
    collectWords(node,prefix){
        let results = [];
        if(node.isEndOfWord) results.push(prefix);
        for(let char in node.children){
            results.push(...this.collectWords(node.children[char],prefix+char))
        }
        return results;
    }
}
//Test Case or Usage

let auto = new AutoSuggest();
auto.insert("google");
auto.insert("go");
auto.insert("good");
console.log(auto.search("go"));