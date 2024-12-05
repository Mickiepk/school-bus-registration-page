export interface StudentFormData {
    studentId: string;
    firstName: string;
    lastName: string;
    school: string;
    age: number | null;
    address: string;
    homeLocation: string;
    guardianName: string;
    phoneNumber: string;
  }

export interface GetUserInfo { 
    userid : number;
    accountinfo : UserAccount;
}

export interface UserAccount {
    username: string;
    password: string;
    email: string;
}
