import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "CategoriesController.index");
  Route.post("/", "CategoriesController.store").middleware("auth");
  Route.get("/:id", "CategoriesController.find");
  Route.delete("/:id", "CategoriesController.delete").middleware("auth");
  Route.put("/:id", "CategoriesController.updates");
}).prefix("/categories");
