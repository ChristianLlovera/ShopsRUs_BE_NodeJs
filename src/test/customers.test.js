import request from 'supertest'
import app from '../app'

describe('Pruebas EndPoints de Clientes', ()=>{

    test('GET/ totos los clientes', async() => {
    
    const response = await request(app).get('/api/customers')
    
    //válida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //válida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //válida que devuelva una lista de objetos
    expect(response.body.length).toBeDefined();
    expect(response.body.length).not.toBe(0)


    })

    test('GET/ cliente por id', async()=>{

    const response = await request(app).get('/api/customers/1')

    //válida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //válida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //válida que devuelva el usuario del id:1
    expect(response.body.id).toBe(1);

    })

    test('GET/ cliente por id no encontrado', async()=>{

        const response = await request(app).get('/api/customers/100')
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(404)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //válida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Customer not Found'});
    
    })

    test('GET/ cliente por id formato no válido', async()=>{

        const response = await request(app).get('/api/customers/c')
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //válida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Invalid Format'});
    
    })

    test('GET/ cliente por nombre', async()=>{

        const response = await request(app).get('/api/customers/search/jhon')
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(200)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //válida que devuelva el usuario por el nombre
        expect(response.body[0].name).toBe('Jhon Doe');
    
    })

    test('GET/ cliente por nombre error', async()=>{

        const response = await request(app).get('/api/customers/search/z')
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(404)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //válida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Customer not Found'});
    
    })

    test('POST/ crear cliente', async()=>{

        const response = await request(app).post('/api/customers').send({name:'Jhon Doe',discounts:[]})
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(200)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //válida que creo el nuevo usuario
        expect(response.body.data.name).toBe('Jhon Doe');
    
    })

    test('POST/ crear cliente invalid request', async()=>{

        const response = await request(app).post('/api/customers').send({})
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //válida que envie el mensaje de error
        expect(response.body).toEqual({message:'Invalid Request'});
    
    })

    test('POST/ crear cliente invalid request, discounts no válidos', async()=>{

        const response = await request(app).post('/api/customers')
        .send({
            name:"Christian Llovera",
            discounts:["none","affiliate"]
        })
    
        //válida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //válida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //válida que envíe el mensaje de error
        expect(response.body).toEqual({message:'One or more invalid discount types'});
    
    })

})