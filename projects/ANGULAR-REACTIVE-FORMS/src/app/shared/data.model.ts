export interface UserData {
    email: string;
    username: string;
    zipCode: string;
    userComments: string;
    address: {
        city: string;
        country: string;
    }
    id?: number;
  }
  