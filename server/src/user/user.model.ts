import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Basket } from "src/basket/basket.model";

@Table({tableName: 'user'})
export class User extends Model<User> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING, allowNull: false})
    username: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    isActivated: boolean

    @Column({type: DataType.STRING})
    activationLink: string

    @HasOne(() => Basket)
    basket: Basket[]
}