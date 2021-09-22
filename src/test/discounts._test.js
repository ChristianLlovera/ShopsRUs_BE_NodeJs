import request from 'supertest'
import app from '../app'

describe('Pruebas EndPoints de Descuentos', ()=>{

    test('GET/ totos los descuentos', async() => {
    
    const response = await request(app).get('/api/discounts')
    
    //valida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //valida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //valida que devuelva una lista de objetos
    expect(response.body.length).toBeDefined();
    expect(response.body.length).not.toBe(0)


    })

    test('GET/ descuento por tipo', async()=>{

    const response = await request(app).get('/api/discounts/affiliate')

    //valida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //valida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //valida que devuelva el descuento del tipo affiliate
    expect(response.body.type).toBe('affiliate');

    })

    test('GET/ descuento por tipo no encontrado', async()=>{

        const response = await request(app).get('/api/discounts/none')
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //valida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Discount not Found'});
    
    })


    test('POST/ crear descuento', async()=>{

        const type = `special${Math.random()}`
        const response = await request(app).post('/api/discounts').send({type:type, percent:25})
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(200)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //valida que creo el nuevo descuento
        expect(response.body.data.type).toBe(type);
    
    })

    test('POST/ crear descuento invalid request', async()=>{

        const response = await request(app).post('/api/discounts').send({})
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //valida que envie el mensaje de error
        expect(response.body).toEqual({message:'Invalid Request'});
    
    })

    test('POST/ crear descuento repedito', async()=>{

        const response = await request(app).post('/api/discounts').send({type:'affiliate', percent:25})
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //valida que envie el mensaje de error
        expect(response.body).toEqual({message:'Discount rate already exists'});
    
    })

})