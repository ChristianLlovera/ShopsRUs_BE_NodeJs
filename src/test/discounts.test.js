import request from 'supertest'
import app from '../app'
import {discountForAmount,discountForYears,discountPercentageValid,validateDiscounts,totalDiscount} from '../handlers/discounts'

describe('Pruebas EndPoints de Descuentos', ()=>{

    test('validateDiscount',async()=>{
        const discountValid = await validateDiscounts(['empore'])
        expect(discountValid).toBe(false)
    })

    test('discountForAmount',async()=>{
        const discount = await discountForAmount(990)
        expect(discount).toBe(45)
    })

    test('discountForYear',async()=>{
        const customer = {createdAt: '2019-10-3 21:40:52.821-04'}
        const forYears = await discountForYears(customer)
        expect(forYears).toBe(true)
    })

    test('discountPercentageValid sin descuento',async()=>{
        const customer = {discounts:[],createdAt: '2020-10-3 21:40:52.821-04'}
        const discountValid = await discountPercentageValid(customer)
        expect(discountValid).toEqual({discount:'n/a',percent:0})
    })

    test('discountPercentageValid con descuento por años',async()=>{
        const customer = {discounts:[],createdAt: '2019-10-3 21:40:52.821-04'}
        const discountValid = await discountPercentageValid(customer)
        expect(discountValid).toEqual({discount:'years',percent:5})
    })

    test('discountPercentageValid con lista de descuentos',async()=>{
        const customer = {discounts:["employee","affiliate"],createdAt: '2020-10-3 21:40:52.821-04'}
        const discountValid = await discountPercentageValid(customer)
        expect(discountValid).toEqual({discount:'employee',percent:30})
    })

    test('totalDiscount sin descuento',async()=>{
        const customer =  {discounts:[],createdAt: '2020-10-3 21:40:52.821-04'}
        const items = []
        const total = await totalDiscount(customer,items)
        expect(total).toBe(0)
    })

    test('totalDiscount con descuento',async()=>{
        const customer =  {discounts:["employee","affiliate"],createdAt: '2020-10-3 21:40:52.821-04'}
        const items = [
            {quantity:1,price:20,type:'edible'},
            {quantity:3,price:30,type:'normal'},
            {quantity:1,price:700,type:'normal'}
        ]

        const total = await totalDiscount(customer,items)
        expect(total).toBe(237)
    })

    test('POST/ crear descuento', async()=>{
        
        const type = `special${Math.random()}`
        const response = await request(app).post('/api/discounts').send({type:type, percent:25})
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(200)

        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //válida que creo el nuevo descuento
        expect(response.body.data.type).toBe(type);
        
    })
    
    test('GET/ totos los descuentos', async() => {
        
    const response = await request(app).get('/api/discounts')

    //válida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //válida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //válida que devuelva una lista de objetos
    expect(response.body.length).toBeDefined();
    expect(response.body.length).not.toBe(0)


    })

    test('GET/ descuento por tipo', async()=>{

    const response = await request(app).get('/api/discounts/affiliate')

    //válida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //válida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //válida que devuelva el descuento del tipo affiliate
    expect(response.body.type).toBe('affiliate');

    })

    test('GET/ descuento por tipo no encontrado', async()=>{

        const response = await request(app).get('/api/discounts/none')
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(404)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //válida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Discount not Found'});
    
    })


    test('POST/ crear descuento invalid request', async()=>{

        const response = await request(app).post('/api/discounts').send({})
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //válida que envíe el mensaje de error
        expect(response.body).toEqual({message:'Invalid Request'});
    
    })

    test('POST/ crear descuento repedito', async()=>{

        const response = await request(app).post('/api/discounts').send({type:'affiliate', percent:25})
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(409)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //válida que envíe el mensaje de error
        expect(response.body).toEqual({message:'Discount rate already exists'});
    
    })

})