// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category";

export default class CategoriesController {
  public page: number;
  public searchField: string | null;

  public async index({ response, request }) {
    this.page = request.qs().page || 1;
    this.searchField = request.qs().search || null;
    try {
      return await this.search();
    } catch (error) {
      return response.badRequest({
        message: "Falha ao listar categorias",
        error: error,
      });
    }
  }

  public async store({ response, request }) {
    try {
      return await Category.create(request.all());
    } catch (error) {
      return response.badRequest({
        message: "Falha ao inserir categoria",
        originalMessage: error,
      });
    }
  }

  public async delete({ response, params }) {
    try {
      const category = await Category.findOrFail(params.id);
      await category.delete();
      return { message: "deletado com sucesso.", category };
    } catch (error) {
      return response.badRequest({
        message: "Falha ao deletar catgegoria",
        Detail: error,
      });
    }
  }

  private async search() {
    if (this.searchField === null) {
      return await Category.query().paginate(this.page);
    } else {
      return await Category.query()
        .whereILike("category", this.searchField)
        .paginate(this.page);
    }
  }

  public async update({ response, request, params }) {
    try {
      const category = await Category.findOrFail(params.id);
      await category.merge(request.all()).save();
      return category;
    } catch (error) {
      return response.badRequest({
        message: "Falha ao editar categoria",
        error: error,
      });
    }
  }
}
