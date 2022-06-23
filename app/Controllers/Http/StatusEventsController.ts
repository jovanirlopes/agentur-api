// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StatusEvent from "App/Models/StatusEvent";

export default class StatusEventsController {
  public page: number;
  public searchField: string | null;

  public async index({ response, request }) {
    this.page = request.qs().page || 1;
    this.searchField = request.qs().searchField || null;
    try {
      return await this.search();
    } catch (error) {
      response.badRequest({
        message: "Falha ao listar status dos eventos",
        error: error,
      });
    }
  }

  private async search() {
    if (this.searchField === null) {
      return await StatusEvent.query().paginate(this.page);
    } else {
      return await StatusEvent.query()
        .whereILike("name", this.searchField)
        .paginate(this.page);
    }
  }
}
