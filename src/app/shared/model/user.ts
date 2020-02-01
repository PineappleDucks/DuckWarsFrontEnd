export class User {
  constructor(
    public username?: string,
    public token?: string,
    public expiredIn?: number,
    public expirationDate?: Date,

    public email?: string,
    public id?: string,
    public description?: string
  ) {}
}
