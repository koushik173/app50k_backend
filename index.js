const expess = require('express')
const app = expess()

const port = 5000

app.get('/',(req, res)=>{
    res.send('hello from roy home')
})

app.get('/login',(req, res)=>{
    res.send('from login')
})

app.listen(port, ()=>{
    console.log(`listening from on port ${port}`);
})