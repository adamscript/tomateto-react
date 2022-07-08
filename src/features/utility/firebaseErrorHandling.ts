const firebaseErrorHandling = (err: any) => {
    if(err.code == 'auth/wrong-password'){
        return "Incorrect password.";
    }
    else if(err.code == 'auth/weak-password'){
        return "The password must be 6 characters long or more.";
    }
    else if(err.code == 'auth/invalid-email'){
        return "The email address is invalid.";
    }
    else if(err.code == 'auth/user-not-found'){
        return "Account not found.";
    }
    else if(err.code == 'auth/user-disabled'){
        return "This account has been disabled.";
    }
    else if(err.code == 'auth/too-many-requests'){
        return "This account has been temporarily disabled due to many failed login attempts. Try again later.";
    }
    else if(err.code == 'auth/unverified-email'){
        return "Verify your email address to continue.";
    }
    else if(err.code == 'auth/email-already-in-use'){
        return "The provided email is already in use by an existing user.";
    }
    else{
        console.log(err);
        return "Sorry, something went wrong. Please try again soon."
    }
}

export default firebaseErrorHandling;