export class User{
  constructor(
    public email: string ,
    public id : string ,
    private readonly _token : string  ,
    private readonly _expireIn : Date
  ){}

  get Token(): string | null {
    if(!this._expireIn || this._expireIn <= new Date() ) return null ;
    return this._token;
  }

}
