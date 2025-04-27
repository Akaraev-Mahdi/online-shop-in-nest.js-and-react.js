import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Brand } from "src/brand/brand.model";
import { Type } from "src/type/type.model";
import { Device_info } from "./device_info.model";
import { Basket_item } from "src/basket/basket_item.model";

interface DeviceAttr {
    name: string,
    img: string,
    price: number,
    brandId: number,
    typeId: number
}

@Table({tableName: 'device'})
export class Device extends Model<Device, DeviceAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false})
    img: string

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number

    @ForeignKey(() => Brand)
    @Column({type: DataType.INTEGER, allowNull: false})
    brandId: number

    @ForeignKey(() => Type)
    @Column({type: DataType.INTEGER, allowNull: false})
    typeId: number

    @BelongsTo(() => Brand)
    brand: Brand[]

    @BelongsTo(() => Type)
    type: Type[]

    @HasMany(() => Device_info)
    device_info: Device_info[]

    @HasMany(() => Basket_item)
    basket_item: Basket_item[]

}