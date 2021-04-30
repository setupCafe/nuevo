import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

const app = express()

import indexRoutes from './routes/index'


//settings

app.set('port', process.env.PORT || 4000)


//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());


//routes
app.use('/api', indexRoutes)


//This folder for this applicarion will be use public

app.use('/uploads', express.static(path.resolve()))


export default app;