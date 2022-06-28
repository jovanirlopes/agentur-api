import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/events/:id/upload", "PhotosController.store");
  Route.get("/events/:id", "PhotosController.findByEvent");
  Route.get("/", "PhotosController.index");
  Route.get("/:id", "PhotosController.find");
  Route.delete("/:id", "PhotosController.delete");
}).prefix("photos");
