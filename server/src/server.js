import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './routes/apiRoutes.js'
dotenv.config()
const app=express()
const port=Number(process.env.PORT||5000)
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:5173'}))
app.use(express.json({limit:'1mb'}))
app.use('/api',apiRoutes)
app.get('/',(_req,res)=>res.send('VPS School API is running. Visit /api/health'))
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({message:'Internal server error.'})})
app.listen(port,()=>console.log(`VPS School API listening at http://localhost:${port}`))
