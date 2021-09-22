import {Op} from 'sequelize'
import model from "../database/models/customers"
import discounts from '../database/models/discounts'
import modelDiscounts from "../database/models/discounts"

const validateDiscounts = async (discounts) => {

    const discountsList = await modelDiscounts.findAll()
    let validate = false
    for (const row of discounts){
        validate = false
        
        for(const disc of discountsList){
            if(disc.type === row){
                validate = true
            }
        }

        if(!validate){return}
    }

    return validate

}

export const getAllCustomers = async (req,res)=>{
    const data = await model.findAll() 
    res.status(200).json([...data])
}

export const createCustomer = async (req,res)=>{
    const {name, discounts} = req.body

    // si no se reciben los datos necesarios para crear el usuario envia un error
    if(!name || !discounts){ 
         res.status(400).json({message:'Invalid Request'})
         return
    }

    if(discounts.length > 0){
        const validate = await validateDiscounts(discounts)
        if(!validate){
            console.log(validate)
         res.status(400).json({message:'One or more invalid discount types'})
         return 
        }
    }
    
    try{

        const customer = await model.create({
            name,
            discounts: discounts,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.status(200).json({
            message:'The customer was created!',
            data:customer
        })
        
    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }


}

export const getCustomerById = async (req,res)=>{

    const {id} = req.params

    if(isNaN(Number(id))){
        res.status(400).send({message:'Invalid Format'})
        return
    }

    const customer = await model.findOne({where:{id: Number(id) }})

    if(!customer){
        res.status(400).send({message:'Customer not Found'})
        return
    }

    res.status(200).json(customer)


}

export const getCustomerByName = async (req,res)=>{
    const {name} = req.params

    const customer = await model.findAll({where:{name: {[Op.iLike]: `%${name}%`} }})

    if(customer.length === 0){
        res.status(400).send({message:'Customer not Found'})
        return
    }

    res.status(200).json(customer)
}