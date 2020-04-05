import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { EmailPasswordCredentials, ChangePasswordCredentials } from '../models/credentials.model';
import { token } from '../constants/local-storage.constant';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isAuthenticate = localStorage.getItem(token) ? true : false;
    constructor(private router: Router) {
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
        return firebase.auth().currentUser.sendEmailVerification();
    }

    resetPassword(email: string) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => console.log('email sent'))
            .catch((error) => console.log(error));
    }

    reauthenticateWithCredential(cpUser, credentials: ChangePasswordCredentials){
        const {oldPassword, newPassword, email} = {...credentials};
        const credential = firebase.auth.EmailAuthProvider.credential(
        cpUser.email, oldPassword);
        return cpUser.reauthenticateWithCredential(credential);
    }

    changePassword(cpUser, credentials: ChangePasswordCredentials) {
        return  cpUser.updatePassword(credentials.newPassword);
    }

    logout() {
        localStorage.clear();
        this.isAuthenticate = false;
        this.router.navigate(['']);
    }
}
