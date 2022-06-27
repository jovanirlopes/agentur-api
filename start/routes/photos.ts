import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/events/:id/upload", "PhotosController.store");
  Route.get("/", "PhotosController.index");
}).prefix("photos");
