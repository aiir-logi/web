package pwr.aiir.subtasks

import io.micronaut.configuration.kafka.annotation.KafkaClient
import io.micronaut.configuration.kafka.annotation.Topic

@KafkaClient
interface SubTaskKafkaClient {

  @Topic("subTask")
  fun sendSubTask(subTask: SubTask)
}
