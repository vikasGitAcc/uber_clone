class ApiResponse{ 

    constructor(statusCode, message="success", data=null){
        this.statusCode = statusCode,
        this.success = statusCode < 400,
        this.message = message,
        this.data = data 
    }
}

class ApiError extends Error{
    constructor(statusCode, message = "something went wrong", errors = [], stack = "" ){
        super(message),
        this.statusCode = statusCode,
        this.success = false,
        this.message = message,
        this.error = errors
        
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }

}

export {ApiResponse, ApiError}