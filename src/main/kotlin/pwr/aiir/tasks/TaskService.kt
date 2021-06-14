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
                  private val subTaskKafkaClient: SubTaskKafkaClient) {

  fun list(): List<Task> {
    return taskRepository.findAll().toList()
  }

  fun add(task: TaskDTO): Task {

    //sendSubTasks(task)
    var taskEntity = Task(
      id = task.id,
      name = task.name,
      startDate = task.startDate,
      endDate = task.endDate,
      subtasks = createSubtasks(task)
    )
    taskEntity = taskRepository.save(taskEntity)
    taskEntity.subtasks.forEach{subTask -> subTaskKafkaClient.sendSubTask(subTask) }
    return taskEntity
  }

  private fun createSubtasks(task: TaskDTO) : List<SubTask> {
    Objects.requireNonNull(task.startDate, "Received null time-of-day for start.");
    Objects.requireNonNull(task.endDate, "Received null time-of-day for stop.");

    var subtasks = ArrayList<SubTask>()
    var start = task.startDate

    while (!start!!.isAfter(task.endDate)) {
      val subTask = SubTask(startDate = start)
      start = start.plus(1, ChronoUnit.HOURS)

      if (start.isAfter(task.endDate)) {
        subTask.endDate = task.endDate!!
      } else {
        subTask.endDate = start
      }
      subTask.filters = task.filters
      subtasks.add(subTask)


    }
    return subtasks
    //subtasks = subTaskService.createSubTasks(subtasks);
    //subtasks.forEach { subTaskKafkaClient.sendSubTask(it) }
  }
}
