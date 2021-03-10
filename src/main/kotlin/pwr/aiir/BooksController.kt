package pwr.aiir

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.reactivex.Flowable

@Controller("/books")
class BooksController(private val bookCatalogueOperations: BookCatalogueOperations) {

    @Get
    fun index(): Flowable<BookRecommendation> {
        return bookCatalogueOperations.findAll()
            .map { (_, name) -> BookRecommendation(name) }
    }
}
