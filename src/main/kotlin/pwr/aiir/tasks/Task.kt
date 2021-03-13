package pwr.aiir.tasks

import io.micronaut.core.annotation.Introspected
import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Task(
  @Id
  @GeneratedValue
  var id: UUID? = null,
  var name: String? = null
) {
}
