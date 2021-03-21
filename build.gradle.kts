plugins {
    id("org.jetbrains.kotlin.jvm") version "1.4.10"
    id("org.jetbrains.kotlin.kapt") version "1.4.10"
    id("org.jetbrains.kotlin.plugin.allopen") version "1.4.10"
    id("com.github.johnrengelman.shadow") version "6.1.0"
    id("io.micronaut.application") version "1.3.4"
    id("com.google.cloud.tools.jib") version "2.6.0"
    id("com.moowork.node") version "1.3.1"
    jacoco
}

version = "0.1"
group = "pwr.aiir"

val kotlinVersion=project.properties.get("kotlinVersion")
repositories {
    mavenCentral()
}

kapt {
  arguments {
    arg("micronaut.openapi.views.spec", "redoc.enabled=true,rapidoc.enabled=true,swagger-ui.enabled=true,swagger-ui.theme=flattop")
  }
}

micronaut {
    runtime("netty")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("pwr.aiir.*")
    }
}

dependencies {
    kapt("io.micronaut.data:micronaut-data-processor")
    kapt("io.micronaut:micronaut-inject-java")
    kapt("io.micronaut:micronaut-validation")
    kapt("io.micronaut.openapi:micronaut-openapi")
    implementation("io.micronaut:micronaut-validation")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:${kotlinVersion}")
    implementation("org.jetbrains.kotlin:kotlin-reflect:${kotlinVersion}")
    implementation("io.micronaut.kotlin:micronaut-kotlin-runtime")
    implementation("io.micronaut:micronaut-runtime")
    implementation("javax.annotation:javax.annotation-api")
    implementation("io.micronaut:micronaut-http-client")
    implementation("io.swagger.core.v3:swagger-annotations")
    implementation("io.micronaut.flyway:micronaut-flyway")
    implementation("io.micronaut.sql:micronaut-jdbc-hikari")
    implementation("io.micronaut.data:micronaut-data-hibernate-jpa")
    implementation("io.micronaut.sql:micronaut-hibernate-jpa")
    implementation("io.micronaut.kotlin:micronaut-kotlin-extension-functions")
    //implementation("io.micronaut:micronaut-discovery-client")
    //implementation("io.micronaut.kafka:micronaut-kafka")
    runtimeOnly("ch.qos.logback:logback-classic")
    runtimeOnly("com.fasterxml.jackson.module:jackson-module-kotlin")
    //runtimeOnly("com.h2database:h2")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.testcontainers:testcontainers")
    testImplementation("org.testcontainers:junit-jupiter")
    testRuntimeOnly("org.testcontainers:postgresql")
}

sourceSets {
  val testE2e by creating {
  }
}


application {
    mainClass.set("pwr.aiir.ApplicationKt")
}

java {
    sourceCompatibility = JavaVersion.toVersion("11")
}

node {
  version = "15.11.0"
}

tasks {
    compileKotlin {
        kotlinOptions {
            jvmTarget = "11"
        }
    }
    compileTestKotlin {
        kotlinOptions {
            jvmTarget = "11"
        }
    }

    test {
      useJUnitPlatform()
      finalizedBy(jacocoTestReport)
    }

    jacocoTestReport {
      dependsOn(test)
      reports.xml.isEnabled = true
    }

    register<com.moowork.gradle.node.npm.NpmTask>("npmBuild") {
      group = "angular"
      dependsOn(npmInstall)
      setArgs(listOf("run", "build", "--", "--prod", "--output-path=build/resources/main/static"))
    }

    jibDockerBuild {
      dependsOn("npmBuild")
    }

    jib {
        to {
            image = "gcr.io/myapp/jib-image"
        }
    }
}
