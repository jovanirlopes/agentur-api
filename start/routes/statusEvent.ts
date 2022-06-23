import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "StatusEvent.index");
  Route.post("/", "StatusEvent.store").middleware("auth");
  Route.get("/:id", "StatusEvent.find");
  Route.delete("/:id", "StatusEvent.delete").middleware("auth");
  Route.put("/:id", "StatusEvent.updates");
}).prefix("/status/events");
