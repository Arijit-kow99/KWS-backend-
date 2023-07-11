export class LoginResponseDto {

    public email: string;
    public userid: number;
    public userType: string;
    public roleType: string;
    public accessToken: string;
    public userName: string;
    public contact: string;

    constructor(email: string, userid: number, userType: string, roleType: string, accessToken: string,
        userName: string, contact: string) {
        this.email = email;
        this.userid = userid;
        this.userType = userType;
        this.roleType = roleType;
        this.accessToken = accessToken;
        this.userName = userName;
        this.contact = contact;
    }
}
