package pwr.aiir.logs

import io.micronaut.context.annotation.Parameter
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.QueryValue
import java.util.*

@Controller("/api/logs")
class LogController(private val logRepository: LogRepository) {

  @Get("/{id}")
  fun getForTask(@QueryValue(defaultValue = "0") page: Int, @QueryValue(defaultValue = "1000") size: Int, @Parameter @PathVariable("id") id : UUID) :Page<LogEntity> {
    return logRepository.findForTask(id, Pageable.from(page, size))
  }
}
