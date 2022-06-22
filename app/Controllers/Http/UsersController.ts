// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class UsersController {
  public async auth({ request, response, auth }) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const token = await auth.use("api").attempt(email, password);
      return token;
    } catch (error) {
      return response.badRequest({ message: "Falha na autenticação." });
    }
  }

  public async register({ request, response }) {
    try {
      const user = await User.create(request.all());
      return user;
    } catch (error) {
      return response.badRequest({
        message: "Falha ao criar usuário",
        detail: error,
      });
    }
  }

  public async update({ request, params, response }) {
    try {
      const user = await User.findOrFail(params.id);
      await user.merge(request.all()).save();
      return user;
    } catch (error) {
      response.badRequest({
        message: "Falha ao alterar usuário",
        error: error,
      });
    }
  }
}
