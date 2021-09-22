import {Router} from 'express'
import {getAllCustomers,getCustomerById, getCustomerByName, createCustomer} from '../handlers/customers'

const router = Router()

router.post('/', createCustomer)
router.get('/', getAllCustomers)
router.get('/:id', getCustomerById)
router.get('/search/:name', getCustomerByName)

export default router