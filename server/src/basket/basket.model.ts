import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Basket_item } from "./basket_item.model";

@Table({tableName: 'basket'})
export class Basket extends Model<Basket> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number

    @BelongsTo(() => User)
    user: User[]

    @HasMany(() => Basket_item)
    basket_item: Basket_item[]
}