package pwr.aiir.webapp

import io.micronaut.http.HttpHeaders
import io.micronaut.http.HttpStatus
import io.micronaut.http.MediaType
import io.micronaut.runtime.server.EmbeddedServer
import io.micronaut.test.extensions.junit5.annotation.MicronautTest
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import org.hamcrest.CoreMatchers.equalTo
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

@MicronautTest
class IndexControllerTest(private val server: EmbeddedServer) {
    @BeforeEach
    fun before() {
        RestAssured.port = server.port
    }

    @Test
    fun forward() {
        given()
            .`when`().get("")
            .then()
            .statusCode(HttpStatus.OK.code)
            .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML)
            .body("html.head.title", equalTo("Title"))
            .body("html.body", equalTo("Hello World!"))
    }
}
