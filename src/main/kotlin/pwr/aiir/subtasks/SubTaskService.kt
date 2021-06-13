package pwr.aiir.subtasks

import javax.inject.Singleton

@Singleton
class SubTaskService(private val subtaskRepository: SubtaskRepository) {


  fun createSubTasks(subTasks: List<SubTask>): ArrayList<SubTask> {
    val results = subtaskRepository.saveAll(subTasks);
    val subTaskList = ArrayList<SubTask>()
    results.forEach { subTaskList.add(it) }
    return subTaskList
  }
}
