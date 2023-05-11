import config from '@shared/config.json' assert { type: 'json' }
import { Logger } from '@shared/Logger.js'
import express from 'express'
import { DataSource } from 'typeorm'
import { EntityTypes } from './models/index.js'
import { initMiddleware } from './routes/wsUtil.js'

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
  entities: EntityTypes,
  synchronize: true
})
await databaseSource.initialize()
const databaseManager = databaseSource.manager
logger.log('Database connection created ($0:$1/$2)', config.backend.database.host, config.backend.database.port, config.backend.database.database)

const webServer = express()
webServer.listen(config.webserver.main.port, config.webserver.main.host, () => {
  logger.log('WebServer started on $0:$1', config.webserver.main.host, config.webserver.main.port)
  import('./routes/index.js')
})
initMiddleware(webServer)

import('./cdn/cdn.js')

export {
  webServer as ws,
  logger,
  databaseManager as db
}