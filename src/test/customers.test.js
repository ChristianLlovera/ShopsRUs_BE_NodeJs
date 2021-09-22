import request from 'supertest'
import app from '../app'

describe('Pruebas EndPoints de Clientes', ()=>{

    test('GET/ totos los clientes', async() => {
    
    const response = await request(app).get('/api/customers')
    
    //valida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //valida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //valida que devuelva una lista de objetos
    expect(response.body.length).toBeDefined();
    expect(response.body.length).not.toBe(0)


    })

    test('GET/ cliente por id', async()=>{

    const response = await request(app).get('/api/customers/1')

    //valida que se resuelva la solicitud
    expect(response.statusCode).toBe(200)

    //valida que la respuesta sea en formato json
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    //valida que devuelva el usuario del id:1
    expect(response.body.id).toBe(1);

    })

    test('GET/ cliente por id no encontrado', async()=>{

        const response = await request(app).get('/api/customers/100')
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //valida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Customer not Found'});
    
    })

    test('GET/ cliente por id formato no valido', async()=>{

        const response = await request(app).get('/api/customers/c')
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //valida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Invalid Format'});
    
    })

    test('GET/ cliente por nombre', async()=>{

        const response = await request(app).get('/api/customers/search/jhon')
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(200)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //valida que devuelva el usuario por el nombre
        expect(response.body[0].name).toBe('Jhon Doe');
    
    })

    test('GET/ cliente por nombre error', async()=>{

        const response = await request(app).get('/api/customers/search/z')
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    
        //valida que devuelva el mensaje de error
        expect(response.body).toEqual({message:'Customer not Found'});
    
    })

    test('POST/ crear cliente', async()=>{

        const response = await request(app).post('/api/customers').send({name:'Jhon Doe',discounts:[]})
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(200)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //valida que creo el nuevo usuario
        expect(response.body.data.name).toBe('Jhon Doe');
    
    })

    test('POST/ crear cliente invalid request', async()=>{

        const response = await request(app).post('/api/customers').send({})
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //valida que envie el mensaje de error
        expect(response.body).toEqual({message:'Invalid Request'});
    
    })

    test('POST/ crear cliente invalid request, discounts no validos', async()=>{

        const response = await request(app).post('/api/customers')
        .send({
            name:"Christian Llovera",
            discounts:["none","affiliate"]
        })
    
        //valida que se resuelva la solicitud
        expect(response.statusCode).toBe(400)
    
        //valida que la respuesta sea en formato json
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        
        //valida que envie el mensaje de error
        expect(response.body).toEqual({message:'One or more invalid discount types'});
    
    })

})