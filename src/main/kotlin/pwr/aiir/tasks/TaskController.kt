package pwr.aiir.tasks

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post

@Controller("/api")
class TaskController(private val taskService: TaskService) {

  @Get("tasks")
  fun getTasks(): List<Task> {
    return taskService.list()
  }

  @Post("tasks")
  fun addTask(@Body task : TaskDTO) :HttpResponse<Task> {
    return HttpResponse.created(taskService.add(task))
  }
}
