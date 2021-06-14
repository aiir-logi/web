package pwr.aiir.tasks

import pwr.aiir.filter.Filter
import pwr.aiir.subtasks.SubTask
import java.time.Instant
import java.util.*

data class TaskDTO (
  var id: UUID?,
  var name: String?,
  var startDate: Instant?,
  var endDate: Instant?,
  var filters: List<Filter>
) {
}
