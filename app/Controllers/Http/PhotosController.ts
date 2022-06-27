// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { S3 } from "aws-sdk";
import Application from "@ioc:Adonis/Core/Application";

export default class PhotosController {
  public storage = new S3({
    endpoint: process.env.STORAGE_ENDPOINT,
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_ID,
    s3BucketEndpoint: true,
  });

  public path = Application.tmpPath("uploads");
  public file;

  public async index({ response }) {
    try {
      return await this.listAll();
    } catch (error) {
      response.badRequest(error);
    }
  }

  public async listAll() {
    return await this.storage.listObjects({ Bucket: "agentur" }).promise();
  }

  public async store({ request, response }) {
    try {
      this.file = request.file("photo");
      await this.file.move(this.path);
      return await this.s3Store();
    } catch (error) {
      response.badRequest(error);
    }
  }

  public async s3Store() {
    await this.storage.putObject(
      {
        Body: Buffer.from(this.file.filePath),
        Bucket: "Agentur",
        Key: await this.generateFIleName(),
      },
      (err) => (err ? false : true)
    );
  }

  public async generateFIleName() {
    const name = await Date.now().toString();
    return name + "." + this.file.extname;
  }
}
