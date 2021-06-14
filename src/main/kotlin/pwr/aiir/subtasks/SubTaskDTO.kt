package pwr.aiir.subtasks

import java.time.Instant
import java.util.*

data class SubTaskDTO(
  var id: UUID?,
  var startDate: Instant?,
  var endDate: Instant?,
  var status: SubTaskStatus?
)
