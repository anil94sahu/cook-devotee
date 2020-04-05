export class EmailPasswordCredentials {
    email: string;
    password: string;
}

export class PhonePasswordCredentials {
    mobileNo: number;
    password: string;
}

export class ChangePasswordCredentials {
    oldPassword: string;
    newPassword: string;
    email: string;
}