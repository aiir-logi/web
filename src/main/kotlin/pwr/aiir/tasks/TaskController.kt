package pwr.aiir.tasks

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post

@Controller("api")
class TaskController(private val taskService: TaskService) {

  @Get("tasks")
  fun getTasks(): List<Task> {
    return taskService.list()
  }

  @Post("tasks")
  fun addTask(task : Task) {
    taskService.add(task)
  }
}
