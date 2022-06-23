import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "StatusEventsController.index");
  Route.post("/", "StatusEventsController.store").middleware("auth");
  Route.get("/:id", "StatusEventsController.find");
  Route.delete("/:id", "StatusEventsController.delete").middleware("auth");
  Route.put("/:id", "StatusEventsController.updates");
}).prefix("/status/events");
