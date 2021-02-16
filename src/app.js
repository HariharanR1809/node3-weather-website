const path=require('path')
const express=require('express') 
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast =require('./utils/forecast')


//Define paths for express config
const publicpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
const app=express()

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
//setup static dictionary to serve
app.use(express.static(publicpath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Jack'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Jack'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Jack',
        helptext:'This is help page'
    })
})
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Jack',
//     },{
//         name:'Sparrow'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'Sunny',
//         location:'Chennai'
//     })
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:' You must provide a address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address:req.query.address
            })
          })
    })

    
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })    
    }
    console.log(req.query)
    res.send({
        products:{}
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found',
        name:'Jack'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'404 Error',
        name:'Jack'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})