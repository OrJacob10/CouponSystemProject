class TokenModel{
    token:string |null=null;
    exp: number | null= null; // The expiration time of the token

    constructor(token:string, expiration:number){
        this.token = token;
        this.exp = expiration;
    }
}

export default TokenModel;