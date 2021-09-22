import {Router} from 'express'
import {getAllDiscounts, getDiscountByType, createDiscount} from '../handlers/discount'

const router = Router()

router.post('/', createDiscount)
router.get('/', getAllDiscounts)
router.get('/:type', getDiscountByType)

export default router