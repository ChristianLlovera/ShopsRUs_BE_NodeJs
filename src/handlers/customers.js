//@ts-check
/**@Module CustomersHandler */

import {Op} from 'sequelize'
import modelCustomers from '../database/models/customers'
import {validateDiscounts} from './discounts'

/**
 * Devuelve una lista con todos los clientes.
 * @param {Object} req objeto de solicitud http 
 * @param {Object} res objeto de respuesta http
 */
export const getAllCustomers = async (req,res)=>{
    /** Extrae todos los clientes de la base de datos */
    const data = await modelCustomers.findAll() 
    /** Devuelve una lista en formato Json con todos los clientes*/
    res.status(200).json([...data])
}

/**
 * Crea un nuevo cliente en la base de datos
 * @param {Object} req Objeto con la solicitud http
 * @param {Object} res Objeto con la respuesta http
 */
export const createCustomer = async (req,res)=>{
    /** Extrae los datos de name y discounts del cuerpo de la solicitud 
     * y las guarda en sus respectivas constantes por medio de desestructuración de objeto
    */
    const {name, discounts} = req.body

    /**si alguno de los datos necesarios no existe envía un error 400
     * y frena la ejecución de la función
     */
    if(!name || !discounts){ 
         res.status(400).json({message:'Invalid Request'})
         return
    }

    /** Si existe uno o más descuentos en los datos inicia una validación */
    if(discounts.length > 0){
        /** Se valida que los descuentos pasados en la solicitud existan en la base de datos */
        const validate = await validateDiscounts(discounts)

        /** Si no existe alguno de los descuentos enviados envía un error 400 
         * y frena la ejecución de la función
        */
        if(!validate){
         res.status(400).json({message:'One or more invalid discount types'})
         return 
        }
    }
    
    try{

        /** Crea el nuevo usuario en la base de datos */
        const customer = await modelCustomers.create({
            name,
            discounts: discounts,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        /** Devuelve status 200 con los datos del usuario creado y un mensaje de éxitos */
        res.status(200).json({
            message:'The customer was created!',
            data:customer
        })
        
    }catch(err){
        /** Si falla la creación del cliente devuelve un error 500 */
        res.status(500).json({message:'Internal Server Error'})
    }

}

/**
 * Extrae un usuario específico por su id
 * @param {Object} req Objeto con la solicitud http
 * @param {Object} res Objeto con la respuesta http
 */
export const getCustomerById = async (req,res)=>{

    /** Se guardan los datos del parámetro id en una constante */
    const {id} = req.params

    /** Si el valor del parámetro no es un número o no existe devuelve un error 400 
     * y frena la ejecución de la función
    */
    if(isNaN(Number(id))){
        res.status(400).send({message:'Invalid Format'})
        return
    }

    /** Se realiza una consulta a la base de datos donde el id del cliente sea igual al enviado */
    const customer = await modelCustomers.findOne({where:{id: Number(id) }})

    /** Si no encuentra al cliente devuelve un error 404
     * y frena la ejecución de la función
    */
    if(!customer){
        res.status(404).send({message:'Customer not Found'})
        return
    }

    /** Devuelve los datos del cliente con un status 200 */
    res.status(200).json(customer)
    
    
}

/**
 * Busca coincidencias de clientes por un nombre 
 * @param {Object} req Objeto con la solicitud http
 * @param {Object} res Objeto con la respuesta http
 */
export const getCustomerByName = async (req,res)=>{
    /** Extrae el valor de name en los parámetros y lo guarda en una constante*/
    const {name} = req.params

    /**si no hay un nombre devuelve error 400 y frena la ejecución */
    if(!name){
        res.status(400).send({message:'Invalid Request'})
        return
    }

    /** Realiza una búsqueda de coincidencia con name en la base de datos*/
    const customer = await modelCustomers.findAll({where:{name: {[Op.iLike]: `%${name}%`} }})

    /** Si no consigue ninguna coincidencia devuelve un error 404 */
    if(customer.length === 0){
        res.status(404).send({message:'Customer not Found'})
        return
    }

    /**Devuelve una lista con todas las coincidencias encontradas */
    res.status(200).json(customer)
}