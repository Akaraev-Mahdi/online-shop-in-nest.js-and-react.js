export class CreateUserDto {
    readonly username: string
    readonly email: string
    readonly password: string
    readonly isActivated: boolean
    readonly activationLink: string
}