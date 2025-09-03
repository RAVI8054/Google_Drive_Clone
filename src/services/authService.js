// auth service -- that will have re-usable function for signup , login , logout, and getting the details of current user.

// (1) signup user
// here userData will be sent by the caller and it will generaly contain name , email , pass , avatar url etc.

import api from '../utils/axiosInstance.jsx';
async function signup (userData){
    try{
        // calling the api for signup
        const response=await api.post('/auth/signup',userData);
        
        // now returning the repsosne back from where it is called (context/component)
        return response.data;
    }catch(error){
        console.log("error occured in singup api calling -- check auth service and error is : ",error);
        
        // now throwing error back from where it is called (context/component)
        throw error;
    }
}


// (2) login user

async function login(credentials){
    try{
        // calling api
        const response=await api.post('/auth/login',credentials);
        console.log("response after calling api for login is : ",response);

        // returning response back from where itis clled (component/contenxt)
        return response.data; // this is axios data -- means axios bind our whole response in the data -- 

    }catch(error){
        console.log("error occured in login api calling -- check auth sercie and error is : ",error);

        // throwing error back either component/context
        throw error;
    }
}


// (3) logout user

async function logout(){
    try{
        const response=await api.post('/auth/logout');

        // returning the data
        return response.data
    }catch(error){
        console.log("error occured in logut api calling -- check auth service and error is : ",error);

        // throwing erro back 
        throw error;
    }
}

// (4) get current user info

async function getCurrentUser(){
    try{
        // calling api
        const response=await api.get('/auth/me');

        // returning the respone
        return response.data;

    }catch(error){
        console.log("error occured in getCurrentUser api calling check auth service and eror is : ",error);

        // throw ing eror back
        throw error;
    }
}

// (5) google login --- google login is done by -- using suapbase directly from frontned.

/*
async function googleLogin(){
    try{
        // calling api
        const response=await api.get('/auth/google');

        // returning the repsonse
        return response.data;
        
    }catch(error){
        console.log("error occured in google login api calling -- check auth service and error is : ",error);

        // throwing erro rback
        throw error;
    }
}
*/

// exporting all functions
export const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
    // googleLogin
};