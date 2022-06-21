// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from "App/Models/Event";

export default class EventsController {
  public async index({ response, request }) {
    const page = request.qs().page || 1;
    const search = request.qs().search || null;
    try {
      if (search === null) {
        const events = await Event.query().paginate(page);
        return events;
      } else {
        const events = await Event.query()
          .whereILike("title", "%" + search + "%")
          .orWhereILike("info", "%" + search + "%")
          .paginate(page);
        return events;
      }
    } catch (error) {
      return response.badRequest({
        message: "Falha ao listar eventos",
        error: error,
      });
    }
  }

  public async store({ request, response }) {
    try {
      const event = await Event.create(request.all());
      return event;
    } catch (error) {
      return response.badRequest({
        message: "Falha ao incluir evento",
        error: error,
      });
    }
  }

  public async find({ response, params }) {
    try {
      const event = Event.findOrFail(params.id);
      return event;
    } catch (error) {
      return response.badRequest({
        message: "Falha ao buscar evento",
        error: error,
      });
    }
  }

  public async delete({ response, params }) {
    try {
      const event = await Event.findOrFail(params.id);
      event.delete();
      return;
    } catch (error) {
      return response.badRequest({
        message: "Falha ao deletare vento",
        error: error,
      });
    }
  }
}
