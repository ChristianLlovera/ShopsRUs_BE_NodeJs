import request from 'supertest'
import app from '../app'
import {calculateAmount} from '../handlers/invoices'

describe('Pruebas EndPoints de Invoices',()=>{

    test('calculateAmount',async()=>{
       const items = [{price:20,quantity:1},{price:30,quantity:1},{price:700,quantity:1}]
       const amount = await calculateAmount(items)
       expect(amount).toBe(750)
    })


    test('GET/ envoice por id', async()=>{

        const response = await request(app).get('/api/invoices/1')

        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(200)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //válida que devuelva la factura del id:1
        expect(response.body.id).toBe(1);

    })

    test('GET/ envoice por id no encontrado', async()=>{

        const response = await request(app).get('/api/invoices/144')

        //válida que devuelva status 404
        expect(response.statusCode).toBe(404)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //válida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Invoice not Found'});

    })
})