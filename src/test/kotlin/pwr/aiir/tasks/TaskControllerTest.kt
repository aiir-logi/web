package pwr.aiir.tasks

import io.micronaut.http.HttpHeaders
import io.micronaut.http.MediaType
import io.micronaut.runtime.server.EmbeddedServer
import io.micronaut.test.extensions.junit5.annotation.MicronautTest
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import org.apache.http.HttpStatus
import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.CoreMatchers.notNullValue
import org.hamcrest.collection.IsEmptyCollection.empty
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.util.*

@MicronautTest
class TaskControllerTest(private var embeddedServer: EmbeddedServer) {

  @BeforeEach
  fun before() {
    RestAssured.port = embeddedServer.port
  }

  @Test
  fun addNew() {
    given()
      .`when`().get("/api/tasks")
      .then()
      .statusCode(HttpStatus.SC_OK)
      .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
      .body("$", empty<List<Task>>())

    val task = Task(null, "test")

    given()
      .contentType(MediaType.APPLICATION_JSON).body(task)
      .`when`().post("/api/tasks")
      .then()
      .statusCode(HttpStatus.SC_CREATED)
      .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
      .body("name", equalTo(task.name))
      .body("id", notNullValue())
  }
}
