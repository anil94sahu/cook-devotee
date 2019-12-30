export const UserRegEx = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
export const PasswordRegEx = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$';
export const MobileRegEx = '^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$';
export const Role = { cook: 1, devotee: 2 };
export const RoleRegEx = '' + Role.cook + '|' + Role.devotee + '';

// phone.constant.ts
export const Recaptcha = 'recaptcha-container';

// HR.constant.ts
export const RequestStatus = { hireMe: 0, requestSend: 1, waiting: 2, response: 3, approve: 4, reject: 5,
     block: 6, pending: 7, approved: 8, rejected: 9 };
export const RequestStatusName = {
    0: 'Hire Me', 1: 'Request Send',
    2: 'waiting', 3: 'response', 4: 'approve', 5: 'reject', 6: 'block', 7: 'pending',
    8: 'Approved', 9: 'Rejected'
};
