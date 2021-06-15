package pwr.aiir.logs

import io.micronaut.data.annotation.Join
import io.micronaut.data.annotation.Query
import io.micronaut.data.annotation.Repository
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.data.repository.CrudRepository
import io.micronaut.data.repository.PageableRepository
import java.util.*

@Repository
interface LogRepository : PageableRepository<LogEntity, UUID> {

 @Query(value = "select log_entity.* from log_entity join sub_task_log_entity stle on log_entity.id = stle.results_id join sub_task st on st.id = stle.sub_task_id join task_sub_task tst on st.id = tst.subtasks_id where tst.task_id = :taskId",
    countQuery = "select count(*) from log_entity join sub_task_log_entity stle on log_entity.id = stle.results_id join sub_task st on st.id = stle.sub_task_id join task_sub_task tst on st.id = tst.subtasks_id where tst.task_id = :taskId", nativeQuery = true, readOnly = true)
  fun findForTask(taskId: UUID, pageable: Pageable): Page<LogEntity>
}
