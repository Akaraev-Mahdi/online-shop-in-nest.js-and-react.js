import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Device } from "./device.model";

@Table({tableName: 'device_info'})
export class Device_info extends Model<Device_info> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @ForeignKey(() => Device)
    @Column({type: DataType.INTEGER, allowNull: false})
    deviceId: number

    @BelongsTo(() => Device)
    device: Device[]
}