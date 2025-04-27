import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Device } from "src/device/device.model";

interface BrandAttr {
    name: string
}

@Table({tableName: 'brand'})
export class Brand extends Model<Brand, BrandAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @HasMany(() => Device)
    device: Device[]
}