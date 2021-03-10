package pwr.aiir

import io.micronaut.http.annotation.Get
import io.micronaut.http.client.annotation.Client
import io.micronaut.retry.annotation.Recoverable
import io.reactivex.Flowable

@Client(id = "node")
@Recoverable(api = BookCatalogueOperations::class)
interface BookCatalogueClient : BookCatalogueOperations {

    @Get("/books")
    override fun findAll(): Flowable<Book>
}
