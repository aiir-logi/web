package pwr.aiir.tasks

import javax.inject.Singleton

@Singleton
class TaskService(private val taskRepository: TaskRepository) {

  fun list() : List<Task> {
    return taskRepository.findAll().toList()
  }

  fun add(task : Task) : Task {
    return taskRepository.save(task)
  }
}
