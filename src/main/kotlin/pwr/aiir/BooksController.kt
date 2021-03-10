package pwr.aiir

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.reactivex.Flowable
import javax.inject.Inject

@Controller("/books")
class BooksController(private val bookCatalogueOperations: BookCatalogueOperations, private val client: ProductClient) {

    @Get
    fun index(): Flowable<BookRecommendation> {
        for (i in 1..100) {
            client.sendProduct("Klucz_${i}", "testowy string")
        }

        return bookCatalogueOperations.findAll()
            .map { (_, name) -> BookRecommendation(name) }
    }
}
