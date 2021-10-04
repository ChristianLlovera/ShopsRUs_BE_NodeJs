//@ts-check
/**@Module DiscountsRoutes */
import {Router} from 'express'
import {getAllDiscounts, getDiscountByType, createDiscount} from '../handlers/discounts'

const router = Router()

/**
 * @name CreateDiscount Crea un nuevo descuento
 * @path {POST} /api/discounts
 * @code {400} solicitud inválida
 * @code {409} descuento ya existe
 * @code {500} error de servidor
 * @code {200} proceso exitoso
 * @body {String} type: es el nombre del descuento
 * @body {Array} percent: es el porcentaje de descuento
 * @response {Object} metadata Objeto de respuesta
 * @response {String} metadata.message Mensaje de éxito
 * @response {Object} metadata.data Datos del descuento creado
 */
router.post('/', createDiscount)

/**
 * @name getAllDiscounts devuelve una lista con todos los descuentos
 * @path {GET} /api/discounts
 * @code {200} proceso exitoso
 * @response {Object} metadata Objeto de respuesta
 */
router.get('/', getAllDiscounts)

/**
 * @name getDiscountByType devuelve el descuento del tipo requerido
 * @path {GET} /api/discounts/
 * @code {404} descuento no encontrado
 * @code {200} proceso exitoso
 * @params {String} :type tipo de descuento a buscar
 * @response {Object} metadata Objeto de respuesta
 */
router.get('/:type', getDiscountByType)

export default router