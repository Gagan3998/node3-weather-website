const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app=express()
const port=process.env.PORT || 3000

// define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

// setup handle bar engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'gagan'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'gagan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       title:'Help',
       name:'gagan',
       helpText:'This is some helpful text'
        
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
             error:'please provide address'
         })
     }
     
     
     geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(longitude,latitude, (error, forecastdata) => {
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastdata,
                location,
                address
            })
           
          })

     })
      

        })

        app.get('/products',(req,res)=>{
            if(!req.query.search){
               return res.send({
                    error:'please provide products'
                })
            }
            console.log(req.query.search)
            res.send({
                products:[]
            })
        })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'gagan',
        errorMessage:'help article not found'
    })
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'gagan',
        errorMessage:'about article not found'
    })
})


 app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'gagan',
        errorMessage:'page not found'
    })
 })
        

app.listen(port,()=>{
    console.log('Server is up on port 3000.')
})
