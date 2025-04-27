import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Device } from "src/device/device.model";

interface TypeAttr {
    name: string
}

@Table({tableName: 'type'})
export class Type extends Model<Type, TypeAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @HasMany(() => Device)
    device: Device[]
}