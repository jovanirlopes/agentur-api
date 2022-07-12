// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from "@ioc:Adonis/Core/Application";
import Drive from "@ioc:Adonis/Core/Drive";
import Event from "App/Models/Event";
import Photo from "App/Models/Photo";

export default class PhotosController {
  public s3 = Drive.use("s3");

  public path = Application.tmpPath("uploads");
  public fileName;

  public async store({ request, response, params }) {
    try {
      let photos = request.files("photos");
      let photosCreated: Photo[] = [];
      for (let photo of photos) {
        const name = await this.generateRandomName(photo.extname)
        await this.upload(photo, name)
        const created = await Photo.create({
          fileName: name,
          eventId: params.id
        })
        photosCreated.push(created)
      }
      return photosCreated
      // await this.upload();
      // return await Photo.create({
      //   fileName: this.photos.fileName,
      //   eventId: params.id,
      // });
    } catch (error) {
      response.badRequest(error.message);
    }
  }

  public async findByEvent({ response, params }) {
    try {
      const event = await Event.findOrFail(params.id);
      const photos = await Photo.findByOrFail("event_id", event.id);
      return photos;
    } catch (error) {
      response.badRequest({
        message: "Falha ao listar itens",
        error: error.message,
      });
    }
  }

  public async delete({ response, params }) {
    try {
      const photo = await Photo.findOrFail(params.id);
      await photo.delete();
      return "Deletado com sucesso";
    } catch (error) {
      response.badRequest({
        message: "Falha ao deletar item",
        error: error.message,
      });
    }
  }

  public async upload(file, name: string) {
    await file.moveToDisk(
      "./",
      {
        name: name,
        contentType: file.type + "/" + file.extname,
      },
      "s3"
    );
  }

  public async generateRandomName(ext: string) {
    return await (Math.random().toString(36).substring(2, 15) +
      "-" +
      Date.now().toString() +
      "." +
      ext);
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
