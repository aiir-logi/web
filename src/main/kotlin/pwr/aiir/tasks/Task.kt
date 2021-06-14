package pwr.aiir.tasks

import io.micronaut.core.annotation.Introspected
import pwr.aiir.annotation.NoArg
import pwr.aiir.filter.Filter
import pwr.aiir.subtasks.SubTask
import java.time.Instant
import java.util.*
import javax.persistence.*

@NoArg
@Entity
data class Task(
  @Id
  @GeneratedValue
  var id: UUID? = null,
  var name: String? = null,
  var startDate: Instant? = null,
  var endDate: Instant? = null,
  @OneToMany(cascade = [CascadeType.ALL])
  var subtasks: List<SubTask>
) {
}
