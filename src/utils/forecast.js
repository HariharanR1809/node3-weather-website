// const request=require('request')
// //
// // Goal: Create a reusable function for getting the forecast
// //
// // 1. Setup the "forecast" function in utils/forecast.js
// // 2. Require the function in app.js and call it as shown below
// // 3. The forecast function should have three potential calls to callback:
// //    - Low level error, pass string for error
// //    - Coordinate error, pass string for error
// //    - Success, pass forecast string for data (same format as from before)
// const forecast=(lat,lon,callback)=>{
//     const url='http://api.weatherstack.com/current?access_key=902d836b6cf59d8dbd59ee861a5ea01d&query=11.http://api.weatherstack.com/current?access_key=902d836b6cf59d8dbd59ee861a5ea01d&query='+lat+','+lon+'&units=f'
//     request({url:url,json:true},(error,response)=>{
//         if(error){
//             callback('Unable to connect with weather Stack',undefined)
//         }else if(response.body.error){
//             callback('Unable to find location',undefined)
//         }else{
//             callback(undefined,{
//             weather:response.body.current.weather_descriptions[0],
//             tempurature:response.body.current.temperature,
//             feelslike:response.body.current.feelslike,
//             region:response.body.location.region
//             })
//         }
//     })
//     }
    
    
// module.exports=forecast



const request=require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const forecast=(lat,lon,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=902d836b6cf59d8dbd59ee861a5ea01d&query='+lat+','+lon+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect with weather Stack',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'weather: '+body.current.weather_descriptions[0]+' tempurature: '+body.current.temperature+' feelslike: '+body.current.feelslike+' region: '+body.location.region)
        }
    })
    }
    
    
module.exports=forecast