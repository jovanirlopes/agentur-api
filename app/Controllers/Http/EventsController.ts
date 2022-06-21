// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from "App/Models/Event";

export default class EventsController {
  public async index({ response }) {
    try {
      const events = await Event.all();
      return events;
    } catch (error) {
      response.badRequest({ message: "Falha ao listar eventos", error: error });
    }
  }

  public async store({ request, response }) {
    try {
      const event = await Event.create(request.all());
      return event;
    } catch (error) {
      response.badRequest({ message: "Falha ao incluir evento", error: error });
    }
  }
}
