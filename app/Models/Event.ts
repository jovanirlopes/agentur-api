import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";
import StatusEvent from "./StatusEvent";

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column()
  public statusEventId: number;

  @belongsTo(() => StatusEvent)
  public status: BelongsTo<typeof StatusEvent>;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
