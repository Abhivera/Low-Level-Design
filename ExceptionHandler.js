//Only one instance exists (Singleton).
//Allows for flexible exception messages and stack traces.

class ExceptionHandler{
    static instance = null;
    constructor(){
        if(ExceptionHandler.instance) return ExceptionHandler.instance;
        ExceptionHandler.instance= this;
}
throwError(message){
    return new Error(message);
}
throwValidationError(message){
    return new Error(`validation error:${message}`);
}
}

//Test Case

let handler = new ExceptionHandler();

console.log(handler.throwError("someting went wrong"));
console.log(handler.throwValidationError("invalid input"));
console.log(handler,'dfd')