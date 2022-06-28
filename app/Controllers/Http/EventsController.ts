// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from "App/Models/Event";

export default class EventsController {
  public page: number;
  public searchField: string | null;

  public async index({ response, request }) {
    this.page = request.qs().page || 1;
    this.searchField = request.qs().search || null;
    try {
      const result = await this.search();
      return result;
    } catch (error) {
      return response.badRequest({
        message: "Falha ao listar eventos",
        error: error.message,
      });
    }
  }

  public async search() {
    if (this.searchField === null) {
      const events = await Event.query()
        .preload("category")
        .preload("status")
        .preload("photos")
        .paginate(this.page);
      return events;
    } else {
      const events = await Event.query()
        .whereILike("title", "%" + this.searchField + "%")
        .orWhereILike("info", "%" + this.searchField + "%")
        .preload("category")
        .preload("status")
        .preload("photos")
        .paginate(this.page);
      return events;
    }
  }

  public async store({ request, response }) {
    try {
      const event = await Event.create(request.all());
      return event;
    } catch (error) {
      return response.badRequest({
        message: "Falha ao incluir evento",
        error: error.message,
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

  public async update({ response, request, params }) {
    try {
      const event = await Event.findOrFail(params.id);
      await event.merge(request.all()).save();
      return event;
    } catch (error) {
      response.badRequest({ message: "Falha ao alterar evento", error: error });
    }
  }
}
