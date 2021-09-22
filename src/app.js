import express,{json} from 'express'
import initialRoutes from './routes/main'
import customersRoutes from './routes/customers'
import invoicesRoutes from './routes/invoices'
import discountsRoutes from './routes/discounts'

const app = express()

//middlewares
app.use(json())

//routes
app.use(initialRoutes)
app.use('/api/customers',customersRoutes)
app.use('/api/invoices',invoicesRoutes)
app.use('/api/discounts',discountsRoutes)

export default app