package pwr.aiir.webapp

import io.micronaut.context.env.Environment
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.server.types.files.StreamedFile
import java.net.URL
import java.util.*

@Controller
class IndexController(private val environment: Environment) {


  @Get("/{path:(?!(swagger-ui|rapidoc|redoc))}")
  fun forward(path: String?): Optional<StreamedFile?>? {
    return environment.getResource("classpath:static/index.html").map { url: URL? ->
      StreamedFile(
        url
      )
    }
  }
}
