import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Device } from "src/device/device.model";
import { Basket } from "./basket.model";

@Table({tableName: 'basket_item'})
export class Basket_item extends Model<Basket_item> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ForeignKey(() => Basket)
    @Column({type: DataType.INTEGER, allowNull: false})
    basketId: number

    @ForeignKey(() => Device)
    @Column({type: DataType.INTEGER, allowNull: false})
    deviceId: number

    @BelongsTo(() => Basket)
    basket: Basket[]

    @BelongsTo(() => Device)
    device: Device[]
}