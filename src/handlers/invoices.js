//@ts-check
/**@Module EnvoicesHandler */
import modelEnvocies from '../database/models/invoices'
import modelCustomers from '../database/models/customers'
import {discountPercentageValid,discountForAmount,totalDiscount} from './discounts'

/**
 * @typedef {Object} Item
 * @property {Number} id
 * @property {String} name
 * @property {Number} quantity
 * @property {Number} price
 * @property {String} type
 * @property {String} createdAt
 * @property {String} updatedAt
 */

/**
 * @typedef {Object} Customer
 * @property {Number} id
 * @property {String} name
 * @property {Array} discounts
 * @property {String} createdAt
 * @property {String} updatedAt
 */

/**
 * devuelve la suma de los precios para una factura
 * @param {Array<Item>} items lista de items de la factura
 * @returns {Promise}
 */
export const calculateAmount = (items)=>{

    return new Promise(resolve=>{
        /** la variable del monto arranca en 0 */
        let amount = 0

        /**Si hay valores para iterar en items realiza el cálculo */
        if(items.length > 0){
            for(const item of items){
                /** suma el valor de todos los precios */
                amount += (item.price * item.quantity)
            }
        }

        /** retorna la suma de los mostos */
        resolve(amount)
    })


}




/**
 * Devuelve una lista con todas las facturas
 * @param {Object} req Objeto con la solicitud http
 * @param {Object} res Objeto con la respuesta http
 */
export const getInvoiceById = async(req,res) => {

    /** Se guardan los datos del parámetro id en una constante */
    const {id} = req.params

    /** Si el valor del parámetro no es un número o no existe devuelve un error 400 
    * y frena la ejecución de la función
    */
    if(isNaN(Number(id))){
        res.status(400).send({message:'Invalid Format'})
        return
    }



    /** Se realiza una consulta a la base de datos donde el id de la factura sea igual al solicitado */
    const envoice = await modelEnvocies.findOne({raw:true, where:{id: Number(id) }})

    /** Si no encuentra la factura devuelve un error 404
     * y frena la ejecución de la función
    */
    if(!envoice){
        res.status(404).send({message:'Invoice not Found'})
        return
    }

    /** busca el cliente por el id */
    const customer = await modelCustomers.findOne({raw:true, where:{id: envoice.customerId }})

    /** busca el descuento de porcentaje válido para el cliente*/
    const discountValid = await discountPercentageValid(customer)

    /**calcula el monto de la factura */
    const amount = await calculateAmount(envoice.items)

    /**busca si tiene descuento por cada 100 $ gastados */
    const discountAmount = await discountForAmount(amount)

    /**calcula el total de descuento de porcentaje de la factura */
    const discount = await totalDiscount(customer,envoice.items)

    /** calcula el valor total a pagar restando los descuentos */
    const totalToPay = amount - (discount + discountAmount)

    const result = {
        id:envoice.id,
        customerId:envoice.customerId,
        items:envoice.items,
        discount,
        discountPercent:discountValid.percent,
        discountType:discountValid.discount,
        discountForAmount:discountAmount,
        amountInvoice:amount,
        totalToPay,
        createdAt:envoice.createdAt,
        updatedAt:envoice.updatedAt
    }

    /** Devuelve los datos de la factura con un status 200 */
    res.status(200).json(result)
}
