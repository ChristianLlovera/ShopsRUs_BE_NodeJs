//@ts-check
/**@Module DiscountsHandler */
import {Op} from 'sequelize'
import discounts from '../database/models/discounts'
import modelDiscounts from "../database/models/discounts"

/**
 * @typedef {Object} Customer
 * @property {Number} id
 * @property {String} name
 * @property {Array} discounts
 * @property {String} createdAt
 * @property {String} updatedAt
 */

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
 * Esta función se encarga de validar si existe un descuento en la base de datos
 * @param {Array<String>} discounts Recibe una Array de Strings con los descuentos que se quieren validar
 * @returns {Promise} Retorna true si existe el descuento, de lo contrario retorna false
 */

 export const validateDiscounts = async (discounts) => {
     /** extrae la lista de descuentos en la base de datos*/
     const discountsList = await modelDiscounts.findAll()
     
     /**@type {Boolean}*/
     let validate = false
     
     /**recorre los descuentos que recibidos */
     for (const row of discounts){
         
         validate = false /**cada vez que inicia el ciclo coloca el valor en false*/
         
         /**compara el valor del ciclo actual con la lista de descuentos */
         for(const disc of discountsList){
             /**si un valor coincide con la lista de descuentos cambia validate a true*/
             if(disc.type === row){
                 validate = true
                }
            }
            
            /** si en el bucle anterior no cabio a true es porque ya existe un valor
             * inválido así que frena el ciclo para que no siga buscando 
             */
            if(!validate){return validate}
            
        }
        
        /** si todos los valores están en la lista de descuentos devuelve true
         * de lo contrario devuelve false
         */
        return validate

}

/**
 * devuelve el descuento de 5 por cada 100
 * @param {Number} amount monto a validar
 * @returns {Promise}
 */
 export const discountForAmount = (amount) =>{
    
    return new Promise(resolve=>{
        const result = Math.trunc(amount / 100)*5;
        resolve(result)
    })

}

/**
 * devuelve true si el cliente aplica para el descuento por años
 * @param {Customer} customer datos del cliente
 * @returns {Promise}
 */
 export const discountForYears = (customer) =>{

    return new Promise(resolve=>{

        /**@type {Object} */
        const register = new Date(customer.createdAt)

        /**@type {Object} */
        const now = new Date()

        /**año en milisegundos */
        const months = 86400000 * 30.416666666666668
        const years = months * 12

        /**tiempo transcurrido en milisegundo */
        const timeElapsed = now - register

        /**se divide el tiempo transcurrido entre los milisegundos de un año 
        * y redondea al entero más cercano 
        * */
        const totalYears = Math.floor(timeElapsed / years)

        /** si la cantidad de años es mayor o igual a 2 retorna true de lo contrario retorna false*/
        resolve(totalYears >= 2 ? true : false)
    })

}

/**
 * devuelve el descuento de porcentaje válido para un cliente
 * @param {Customer} customer datos del cliente
 * @returns {Promise}
 */

 export const discountPercentageValid = (customer) => {

    return new Promise( async(resolve) =>{

        /**Si no hay descuentos en el cliente revisa si es válido el descuento por año */
        if(customer.discounts.length === 0){
            const isValidForYear = await discountForYears(customer)
            if(isValidForYear){
                return resolve({discount:'years', percent:5})
            }
        }

        /**Si el cliente tiene descuentos revisa cuál es el descuento mayor */
        if(customer.discounts.length > 0){

            const listDiscount = []

            for(const discount of customer.discounts){
               
               const isValidDiscount = await validateDiscounts([discount])
               if(isValidDiscount){
                const result = await modelDiscounts.findOne({raw:true,where:{type: {[Op.iLike]: discount}}})
                listDiscount.push(result)
               }
               
            }

            /** Ordena los descuento de mayor a menor */
            listDiscount.sort((a,b) => b.percent - a.percent)
            
            /**Toma el descuento mayor */
            const {type,percent} = listDiscount.shift()

            /**devuelve los datos del descuento */
            return resolve({discount:type, percent})

        }

        
        resolve({discount:'n/a', percent:0})
    })
}

/**
 * 
 * @param {Customer} customer cliente al que se le aplican los descuentos
 * @param {Array<Item>} items artículos a los que se les aplica el descuento
 * @returns {Promise}
 */
export const totalDiscount = async (customer,items) =>{

    /**
     * calcula el porcentaje del monto requerido
     * @param {Number} percent porcentaje válido
     * @param {Number} amount monto a calcular
     */
    const percentage = (percent,amount) =>  (percent/ 100) * amount
    

    return new Promise(async(resolve)=>{
        
        /** inicio la variable de total en 0 */
        let total = 0

        /** reviso si hay descuentos válidos para el cliente */
        const discountValid = await discountPercentageValid(customer)

        /** si hay descuentos válidos para el cliente recorro los items */
        if(discountValid.percent != 0){
            const {percent} = discountValid

            for(const item of items){

                const {price,quantity} = item
                const amount = price * quantity

                /**si es un artículo no comestible aplico el descuento */
                if(item.type === 'normal'){
                    total += percentage(percent,amount)
                }
            }
        }  
            /**devuelvo el total a descontar */
            resolve(total)
    })
}

/**
 * Devuelve una lista con todos los descuentos
 * @param {Object} req Objeto con la solicitud http
 * @param {Object} res Objeto con la respuesta http
 */
export const getAllDiscounts = async (req,res)=>{

    /** Busca todos los descuentos en la base de datos */
    const data = await modelDiscounts.findAll() 

    /** Retorna status 200 con la lista de descuentos */
    res.status(200).json([...data])
}

/**
 * Crea un nuevo descuento en la base de datos
 * @param {Object} req Objeto con la solicitud http
 * @param {Object} res Objeto con la respuesta http
 */
export const createDiscount = async (req,res)=>{
    /**Extrae los datos de type y percent del cuerpo de la solicitud y los guarda
     * en unas constantes
     */
    const {type,percent} = req.body

    /** Si no existe alguno de los datos necesarios para crear el nuevo descuento
     * envía un error 400 y frena la ejecución de la función
     */
    if(!type || !percent){ 
         res.status(400).json({message:'Invalid Request'})
         return
    }
    
    try{

        /**Crea el nuevo descuento en la base de datos*/
        const discount = await modelDiscounts.create({
            type,
            percent,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        /**Devuelve un status 200 con los datos del descuento creado y un mensaje de éxito */
        res.status(200).json({
            message:'The Discount was created!',
            data: discount
        })
        
    }catch(err){
        /** Si ya existe el tipo de descuento en la base de datos
         * devuelve un error 409 y frena la ejecución
         */
        if(err.name === 'SequelizeUniqueConstraintError')
        {
            res.status(409).json({message:'Discount rate already exists'})
            return
        }

        /**Si falla la creación del descuento envía un error 500 */
        res.status(500).json({message:'Internal Server Error'})
    }

}

/**
 * Busca un descuento por tipo
 * @param {Object} req Objeto con la solicitud http
 * @param {Object} res Objeto con la respuesta http
 */
export const getDiscountByType = async (req,res)=>{
    /**Extrae el valor de type de los parámetros y lo guarda en una constante */
    const {type} = req.params

    /**Busca el descuento en la base de datos donde el tipo sea igual al solicitado */
    const discount = await modelDiscounts.findOne({where:{type: {[Op.iLike]: type} }})

    /**Si no encuentra el tipo de descuento devuelve un error 404
     * y frena la ejecución
     */
    if(!discount){
        res.status(404).send({message:'Discount not Found'})
        return
    }

    /**Devuelve el descuento por el tipo indicado con status 200 */
    res.status(200).json(discount)
}