package pwr.aiir.tasks

import pwr.aiir.subtasks.SubTask
import pwr.aiir.subtasks.SubTaskDTO
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
                  private val subTaskKafkaClient: SubTaskKafkaClient) {

  private val SUBTASKS_COUNT: Int = 20

  fun list(): List<TaskDTO> {
    val tasks = taskRepository.findAll().toList()
    return tasks.map { task -> toDTO(task) }
  }

  private fun toDTO(task : Task): TaskDTO {
    return TaskDTO(
      id = task.id,
      name = task.name,
      startDate = task.startDate,
      endDate = task.endDate,
      filters = task.subtasks.first().filters!!,
      subtasks = task.subtasks.map { subTask -> SubTaskDTO(
        id = subTask.id,
        startDate = subTask.startDate,
        endDate = subTask.endDate,
        status = subTask.subTaskStatus
      ) }
    )
  }

  fun add(task: TaskDTO): Task {

    var taskEntity = Task(
      id = task.id,
      name = task.name,
      startDate = task.startDate,
      endDate = task.endDate,
      subtasks = createSubtasks(task)
    )
    taskEntity = taskRepository.save(taskEntity)
    taskEntity.subtasks.forEach { subTask -> subTaskKafkaClient.sendSubTask(subTask) }
    return taskEntity
  }

  private fun createSubtasks(task: TaskDTO): List<SubTask> {
    Objects.requireNonNull(task.startDate, "Received null time-of-day for start.");
    Objects.requireNonNull(task.endDate, "Received null time-of-day for stop.");

    var subtasks = ArrayList<SubTask>()
    var start = task.startDate
    val timeBetweenDates = start?.until(task.endDate, ChronoUnit.MILLIS)

    Objects.requireNonNull(timeBetweenDates, "Dates cannot be the same");

    val incrementTime = timeBetweenDates!!.div(SUBTASKS_COUNT)

    while (!start!!.isAfter(task.endDate)) {
      val subTask = SubTask(startDate = start)
      start = start.plus(incrementTime, ChronoUnit.MILLIS)

      if (start.isAfter(task.endDate)) {
        subTask.endDate = task.endDate!!
      } else {
        subTask.endDate = start
      }
      subTask.filters = task.filters
      subtasks.add(subTask)
    }
    return subtasks
  }
}
