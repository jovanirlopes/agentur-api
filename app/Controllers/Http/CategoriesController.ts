// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category";

export default class CategoriesController {
  public async index({ response, request }) {
    try {
      const search = request.qs().search;
      const page = request.qs().page;
      if (search) {
        const category = await Category.query().paginate(page);
        return category;
      } else {
        const category = await Category.query()
          .whereILike("category", search)
          .paginate(page);
        return category;
      }
    } catch (error) {
      response.badRequest({
        message: "Falha ao listar categorias",
        error: error,
      });
    }
  }
}
