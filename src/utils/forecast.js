
const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=baf737b258d53a89c71b82448bace2c7&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect to weather service',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out.It feels like '+body.current.feelslike+' degees out')
        }
    })
}
module.exports=forecast