package pwr.aiir

import io.reactivex.Flowable

interface BookCatalogueOperations {
    fun findAll(): Flowable<Book>
}
