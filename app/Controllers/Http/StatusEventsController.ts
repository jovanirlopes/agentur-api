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
        message: "Falha ao listar os itens",
        error: error,
      });
    }
  }

  public async find({ response, params }) {
    try {
      return await StatusEvent.findOrFail(params.id);
    } catch (error) {
      return response.badRequest({
        message: "Falha ao buscar registro",
        error: error,
      });
    }
  }

  public async store({ response, request }) {
    try {
      return await StatusEvent.create(request.all());
    } catch (error) {
      return response.badRequest({
        message: "Falha ao inserir o registro",
        error: error,
      });
    }
  }

  public async delete({ response, params }) {
    try {
      const statusEvent = await StatusEvent.findOrFail(params.id);
      await statusEvent.delete();
      return { message: "Deletado com sucesso", statusEvent };
    } catch (error) {
      return response.badRequest({
        message: "Falha ao deletar o registro",
        error: error,
      });
    }
  }

  public async update({ response, request, params }) {
    try {
      const statusEvent = await StatusEvent.findOrFail(params.id);
      await statusEvent.merge(request.all()).save();
      return statusEvent;
    } catch (error) {
      return response.badRequest({message: "Falha ao atualizar o registro"})
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
