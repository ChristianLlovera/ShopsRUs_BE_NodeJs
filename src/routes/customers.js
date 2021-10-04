//@ts-check
/**@Module CustomersRouetes */
import {Router} from 'express'
import {getAllCustomers,getCustomerById, getCustomerByName, createCustomer} from '../handlers/customers'

const router = Router()

/**
 * @name CreateCustomer Crea un nuevo cliente
 * @path {POST} /api/customers
 * @code {400} solicitud inválida
 * @code {500} error de servidor
 * @code {200} proceso exitoso
 * @body {String} name: es el nombre del cliente
 * @body {Array} discounts: una lista de strings con los nombres de los descuentos
 * @response {Object} metadata Objeto de respuesta
 * @response {String} metadata.message Mensaje de éxito
 * @response {Object} metadata.data Datos del cliente creado
 */
router.post('/', createCustomer)

/**
 * @name getAllCustomers Retorna todos los clientes
 * @path {GET} /api/customers
 * @code {200} proceso exitoso
 * @response {Object} metadata Objeto de respuesta
 */
router.get('/', getAllCustomers)

/**
 * @name getCustomerById Retorna todos los clientes
 * @path {GET} /api/customers/
 * @code {400} solicitud inválida
 * @code {404} cliente no encontrado
 * @code {200} proceso exitoso
 * @params {Number} :id Id del cliente
 * @response {Object} metadata Objeto de respuesta
 */
router.get('/:id', getCustomerById)

/**
 * @name getCustomerByName Retorna todas las coincidencias con el nombre
 * @path {GET} /api/customers/search/
 * @code {400} solicitud inválida
 * @code {404} cliente no encontrado
 * @code {200} proceso exitoso
 * @params {String} :name nombre para la búsqueda
 * @response {Object} metadata Objeto de respuesta
 */
router.get('/search/:name', getCustomerByName)

export default router