package pwr.aiir.tasks

import pwr.aiir.subtasks.SubTask
import pwr.aiir.subtasks.SubTaskKafkaClient
import pwr.aiir.subtasks.SubTaskService
import java.time.Duration
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*
import javax.inject.Singleton
import kotlin.collections.ArrayList

@Singleton
class TaskService(private val taskRepository: TaskRepository,
                  private val subTaskService: SubTaskService,
                  private val subTaskKafkaClient: SubTaskKafkaClient) {

  fun list(): List<Task> {
    return taskRepository.findAll().toList()
  }

  fun add(task: Task): Task {

    sendSubTasks(task)
    return taskRepository.save(task)
  }

  private fun sendSubTasks(task: Task) {
    Objects.requireNonNull(task.startDate, "Received null time-of-day for start.");
    Objects.requireNonNull(task.endDate, "Received null time-of-day for stop.");

    var subtasks = ArrayList<SubTask>()
    val start = task.startDate

    while (!start!!.isAfter(task.endDate)) {
      val subTask = SubTask(startDate = start)
      start.plus(1, ChronoUnit.HOURS)

      if (start.isAfter(task.endDate)) {
        subTask.endDate = task.endDate!!
      } else {
        subTask.endDate = start
      }
      subtasks.add(subTask)
    }

    subtasks = subTaskService.createSubTasks(subtasks);
    subtasks.forEach { subTaskKafkaClient.sendSubTask(it) }
  }
}
