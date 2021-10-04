import {Router} from 'express'
const path = require('path')

const router = Router()

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../docs/index.html'));
})

export default router