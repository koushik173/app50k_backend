const expess = require('express')
const app = expess()

const port = 5000


const userRouter = require('./routes/userRoutes')
app.use('/api', userRouter)



app.get('/',(req, res)=>{
    res.send('hello from roy home')
})

app.listen(port, ()=>{
    console.log(`listening from on port ${port}`);
})
