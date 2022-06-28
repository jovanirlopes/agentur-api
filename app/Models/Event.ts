import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";
import StatusEvent from "./StatusEvent";
import Photo from "./Photo";

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public info: string;

  @column()
  public place: string;

  @column()
  public startDate: DateTime;

  @column()
  public endDate: DateTime;

  @column()
  public categoryId: number;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @column()
  public statusEventId: number;

  @belongsTo(() => StatusEvent)
  public status: BelongsTo<typeof StatusEvent>;

  @hasMany(() => Photo)
  public photos: HasMany<typeof Photo>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
