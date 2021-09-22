import {Op} from 'sequelize'
import model from "../database/models/discounts"

export const getAllDiscounts = async (req,res)=>{
    const data = await model.findAll() 
    res.status(200).json([...data])
}

export const createDiscount = async (req,res)=>{
    const {type,percent} = req.body

    // si no se reciben los datos necesarios para crear el usuario envia un error
    if(!type || !percent){ 
         res.status(400).json({message:'Invalid Request'})
         return
    }
    
    try{

        const discount = await model.create({
            type,
            percent,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.status(200).json({
            message:'The Discount was created!',
            data: discount
        })
        
    }catch(err){
        
        if(err.name === 'SequelizeUniqueConstraintError')
        {
            res.status(400).json({message:'Discount rate already exists'})
            return
        }

        res.status(500).json({message:'Internal Server Error'})
    }


}

export const getDiscountByType = async (req,res)=>{
    const {type} = req.params

    const discount = await model.findOne({where:{type: {[Op.iLike]: type} }})

    if(!discount){
        res.status(400).send({message:'Discount not Found'})
        return
    }

    res.status(200).json(discount)
}