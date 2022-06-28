// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from "@ioc:Adonis/Core/Application";
import Drive from "@ioc:Adonis/Core/Drive";
import Photo from "App/Models/Photo";

export default class PhotosController {
  public s3 = Drive.use("s3");

  public path = Application.tmpPath("uploads");
  public file;
  public fileName;

  public async store({ request, response, params }) {
    try {
      this.file = request.file("photo");
      await this.upload();
      return await Photo.create({
        fileName: this.file.fileName,
        eventId: params.id,
      });
    } catch (error) {
      response.badRequest(error);
    }
  }

  public async upload() {
    await this.generateRandomName();
    await this.file.moveToDisk(
      "./",
      {
        name: this.fileName,
        contentType: this.file.type + "/" + this.file.extname,
      },
      "s3"
    );
  }

  public async generateRandomName() {
    this.fileName = await (Math.random().toString(36).substring(2, 15) +
      "-" +
      Date.now().toString() +
      "." +
      this.file.extname);
  }

  public async find({ response, params }) {
    try {
      const photo = await Photo.findOrFail(params.id);
      return await this.s3.getSignedUrl(photo.fileName);
    } catch (error) {
      response.badRequest(error.message);
    }
  }
}
