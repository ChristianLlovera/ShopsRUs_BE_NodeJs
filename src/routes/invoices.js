//@ts-check
/**@Module InvoicesRoutes */
import {Router} from 'express'
import {getInvoiceById} from '../handlers/invoices'

const router = Router()

/**
 * @name getInvoiceById devuelve la factura del id requerido
 * @path {GET} /api/invoices/:id
 * @code {404} factura no encontrada
 * @code {200} proceso exitoso
 * @params {String} :id tipo de factura a buscar
 * @response {Object} metadata Objeto de respuesta
 */
router.get('/:id', getInvoiceById)

export default router