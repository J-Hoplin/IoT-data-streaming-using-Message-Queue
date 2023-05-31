import express, { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv'
import * as amqp from 'amqplib'
import morgan from 'morgan'
import { logger, stream } from './log'
import { ErrorResponse } from './dto/error.response'

config({
  path: `${__dirname}/../env/.env`
})

const app = express()

app.set('port', +(process.env.PORT as string) || 4500)
app.use(morgan('combined'))
app.use(
  express.json(),
  express.urlencoded({
    extended: false
  }),
  morgan('dev', { stream })
)


app.use((req: Request, res: Response, next: NextFunction) => {
  const error: ResponseError = new Error(`${req.method} ${req.route} router not found`)
  error.code = 404;
  next(error)
})

app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error : ${req.method} ${req.route} - ${err.message}`)
  const errorResponse = new ErrorResponse({
    statusCode: err.code || 500,
    message: err.message
  })
  return res.status(errorResponse.statusCode).json(
    errorResponse
  )
})

export default app