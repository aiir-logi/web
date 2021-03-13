package pwr.aiir.tasks

import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository
import java.util.*

@Repository
interface TaskRepository : CrudRepository<Task, UUID> {
}
