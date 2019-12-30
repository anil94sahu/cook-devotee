import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { EmailPasswordCredentials } from '../models/credentials.model';
import { token } from '../constants/local-storage.constant';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isAuthenticate = localStorage.getItem(token) ? true : false;
    constructor() {
        
    }

    signUp(credentials: EmailPasswordCredentials) {
        const email = credentials.email;
        const password = credentials.password;
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    login(credentials: EmailPasswordCredentials) {
        const email = credentials.email;
        const password = credentials.password;
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    SendVerificationMail() {
        return firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          alert('verification mail send to your mail ID.');
        });
      }

    resetPassword(email: string) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => console.log('email sent'))
            .catch((error) => console.log(error));
    }
}

