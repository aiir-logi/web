package pwr.aiir.subtasks

import pwr.aiir.annotation.NoArg
import pwr.aiir.filter.Filter
import pwr.aiir.logs.LogEntity
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@NoArg
data class SubTask(
  @Id
  @GeneratedValue
  var id: UUID? = null,
  var startDate: Instant = Instant.now(),
  var endDate: Instant = Instant.now(),
  @ManyToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
  var filters: List<Filter>? = Collections.emptyList(),
  @OneToMany(cascade = [CascadeType.ALL])
  var results: List<LogEntity>? = Collections.emptyList(),
  var finished: Boolean = false,
)
