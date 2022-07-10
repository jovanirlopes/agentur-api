import { DateTime } from "luxon";
import { afterFetch, BaseModel, beforeDelete, column } from "@ioc:Adonis/Lucid/Orm";
import Drive from "@ioc:Adonis/Core/Drive";

export default class Photo extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fileName: string;

  @column()
  public url: string;

  @column()
  public eventId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @afterFetch()
  public static async afterFetchHook(photos: Photo[]) {
    for (let photo of photos) {
      photo.url = await Drive.use("s3").getSignedUrl(photo.fileName);
    }
  }

  @beforeDelete()
  public static async beforeDeleteHook(photo: Photo) {
    await Drive.use('s3').delete(photo.fileName)
  }
}
