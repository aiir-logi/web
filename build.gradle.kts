plugins {
    id("org.jetbrains.kotlin.jvm") version "1.4.10"
    id("org.jetbrains.kotlin.kapt") version "1.4.10"
    id("org.jetbrains.kotlin.plugin.allopen") version "1.4.10"
    id("com.github.johnrengelman.shadow") version "6.1.0"
    id("io.micronaut.application") version "1.3.4"
    id("com.google.cloud.tools.jib") version "2.6.0"
    id("com.github.node-gradle.node") version "3.0.1"
    id("org.ajoberstar.grgit") version "4.1.0"
    jacoco
    id("org.sonarqube") version "3.0"
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
    testImplementation("io.rest-assured:rest-assured:4.3.1")
}


application {
    mainClass.set("pwr.aiir.ApplicationKt")
}

java {
    sourceCompatibility = JavaVersion.toVersion("11")
}

@CacheableTask
abstract class NpxCachableTask : com.github.gradle.node.npm.task.NpxTask()

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

    npmInstall {
      onlyIf { (System.getenv("NPM_INSTALL_CACHED") ?: "") != "true" }
    }

    register<NpxCachableTask>("buildWebapp") {
      group = "angular"
      command.set("ng")
      args.set(listOf("build", "--prod"))
      dependsOn("npmInstall")
      inputs.dir(project.fileTree("src/main/webapp").exclude("**/*.spec.ts"))
      inputs.dir("node_modules")
      inputs.files("angular.json", ".browserslistrc", "tsconfig.json", "tsconfig.app.json")
      outputs.dir("${project.buildDir}/webapp")
    }

    register<NpxCachableTask>("testWebapp") {
      group = "angular"
      command.set("jest")
      args.set(listOf("--coverage"))
      dependsOn("npmInstall")
      inputs.dir("src/main/webapp")
      inputs.dir("node_modules")
      inputs.files("angular.json", ".browserslistrc", "jest.config.js", "tsconfig.json", "tsconfig.spec.json")
      outputs.dir("${project.buildDir}/reports/units")
      outputs.dir("${project.buildDir}/test-results/units")
    }

    register<NpxCachableTask>("testWebappE2e") {
      group = "angular"
      command.set("jest")
      args.set(listOf("--config=./jest.config.e2e.js"))
      dependsOn("npmInstall", "buildWebapp")
      inputs.dir("${project.buildDir}/webapp")
      inputs.dir("src/testE2e")
      inputs.dir("node_modules")
      inputs.files("angular.json", ".browserslistrc", "tsconfig.json", "tsconfig.spec.json")
      outputs.dir("${project.buildDir}/reports/testE2e")
      outputs.dir("${project.buildDir}/test-results/testE2e")
    }

    register<com.github.gradle.node.npm.task.NpxTask>("testWebappE2eLocal") {
      group = "angular"
      environment.put("LOCAL_ENV", "true")
      command.set("jest")
      args.set(listOf("--config=./jest.config.e2e.js"))
      dependsOn("npmInstall", "buildWebapp")
      inputs.dir("${project.buildDir}/webapp")
      inputs.dir("src/testE2e")
      inputs.dir("node_modules")
      inputs.files("angular.json", ".browserslistrc", "tsconfig.json", "tsconfig.spec.json")
      outputs.dir("${project.buildDir}/reports/testE2e")
      outputs.dir("${project.buildDir}/test-results/testE2e")
    }

    build {
      dependsOn("testWebapp", "testWebappE2e")
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

sourceSets {
  kotlin {
    main {
      resources {
        srcDir(tasks.getByName("buildWebapp"))
      }
    }
  }
  val testE2e by creating {
  }
}
