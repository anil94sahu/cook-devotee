export const UserRegEx = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
export const PasswordRegEx = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}';
export const MobileRegEx = '^[0-9]{10}$';
export const SalaryRegEx = '^[0-9]{4,5}$';
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

export const allState = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman & Nicobar',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman & Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
];

export const salaries = [{key: '10', value: '<=10000'}, {key: '10-12', value: '>10000 and <12000'},
{key: '12-14', value: '=>120000 and <14000'}, {key: '14-15', value: '=>140000 and <15000'},
{key: '15-17', value: '=>15000 and <17000'}, {key: '17-20', value: '>=17000 and <20000'}];
export const offline = navigator.onLine;
