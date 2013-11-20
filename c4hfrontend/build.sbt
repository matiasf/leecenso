name := "c4hfrontend"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache
)

val appDependencies = Seq(
  "mysql" % "mysql-connector-java" % "5.5.31"
) 

play.Project.playScalaSettings
