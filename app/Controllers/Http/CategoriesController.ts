// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category";
import Event from "App/Models/Event";

export default class CategoriesController {
  public async index({ response, request }) {
    try {
      const result = await this.search(
        request.qs().search,
        request.qs().page || 0
      );
      return result;
    } catch (error) {
      response.badRequest({
        message: "Falha ao listar categorias",
        error: error,
      });
    }
  }

  public async store({ response, request }) {
    try {
      const category = await Event.create(request.all());
      return category;
    } catch (error) {
      response.badRequest({
        message: "Falha ao inserir categoria",
        originalMessage: error.message,
      });
    }
  }

  private async search(search, page) {
    if (search) {
      const category = await Category.query().paginate(page);
      return category;
    } else {
      const category = await Category.query()
        .whereILike("category", search)
        .paginate(page);
      return category;
    }
  }
}
