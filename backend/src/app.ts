import config from '@shared/config.json' assert { type: 'json' }
import { Logger } from '@shared/Logger.js'
import express from 'express'
import { DataSource } from 'typeorm'

const logger = new Logger(
  config.backend.logger.includeDate,
  config.backend.logger.isVerbose,
  config.backend.logger.highlightColor
)

const databaseSource = new DataSource({
  type: 'mysql',
  host: config.backend.database.host,
  port: config.backend.database.port,
  username: config.backend.database.user,
  password: config.backend.database.password,
  database: config.backend.database.database,
})
await databaseSource.initialize()
logger.log('Database connection created ($0:$1/$2)', config.backend.database.host, config.backend.database.port, config.backend.database.database)
const databaseDriver = databaseSource.driver

const webServer = express()
webServer.listen(config.webserver.port, config.webserver.host, () => {
  logger.log('WebServer started on $0:$1', config.webserver.host, config.webserver.port)
  import('./routes/index.js')
})

export {
  webServer as ws,
  logger,
  databaseDriver as db
}