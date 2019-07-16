const express = require('express')
const bodyParser = require('body-parser')
const  request =  require('request')
const app = express() 
const port = process.env.PORT || 3000


app.use(bodyParser.json())

app.post('/POStatus', (req,res) => {
    const PurchaseorderNo = req.body.PurchaseorderNo;
    var demourl = 'https://xx.xx.xx:44306/sap/opu/odata/SAP/ZPODETAILS_SRV/PurchaseOrderSet?$filter=(PoNumber eq'+"'"+PurchaseorderNo+"'"+')&$format=json';

    var headers = {
       'Authorization':    'Basic c2dob3NoOldlbGNvbWUwMQ==',
       'Content-Type':     'application/json',
       'Accept': 'application/json'
   };
   
   
   var options = { method: 'GET',
     url: demourl,
     headers: headers 
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
            var resultData = JSON.parse(body);
             if(resultData.d.results.length > 0){
                var poStatus = resultData.d.results[0].ProcStat;
                
                  res.send({
          replies: [{
            type: 'text',
            content: 'Current Purchase order Status is:'+' '+poStatus
          }], 
          conversation: {
            memory: { key: 'value' }
          }
        })
            }else {
                res.send({
                      replies: [{
                        type: 'text',
                        content: 'Invalid order No',
                      }], 
                      conversation: {
                        memory: { key: 'value' }
                      }
                    })
            }
            
        } else {
            res.send('Error happened')
        }
    })
     


})
  
 

  app.post('/PrStatus', (req,res) => {
    const PurchaseReqNo = req.body.PurchaseReqNo;
    var demourl = 'https://xx.xx.xx:44306/sap/opu/odata/SAP/ZPREQDETAILS_SRV/PurchaseRequisitionSet?$filter=(PreqNo eq'+"'"+PurchaseReqNo+"'"+')&$format=json';

    var headers = {
       'Authorization':    'Basic c2dob3NoOldlbGNvbWUwMQ==',
       'Content-Type':     'application/json',
       'Accept': 'application/json'
   };
   
   
   var options = { method: 'GET',
     url: demourl,
     headers: headers 
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
            var resultData = JSON.parse(body);
             if(resultData.d.results.length > 0){
                var prStatus = resultData.d.results[0].ProcStat;
                var shortText= resultData.d.results[0].ShortText;
                var PoNumber = resultData.d.results[0].PoNumber;
                  res.send({
          replies: [{
            type: 'text',
            content: 'Current Purchase Requisition Status is:'+' '+prStatus+ ' '+'for '+shortText+' and PO number is '+' '+PoNumber,
          }], 
          conversation: {
            memory: { key: 'value' }
          }
        })
            }else {
                res.send({
                      replies: [{
                        type: 'text',
                        content: 'Invalid Requisition number',
                      }], 
                      conversation: {
                        memory: { key: 'value' }
                      }
                    })
            }
            
        } else {
            res.send('Error happened')
        }
    })
     


})

app.get('/POStatus', (req, res) => {
    console.log(req.body) 
    res.send('Wrong operation type, it should be Post') 
  }) 

app.get('/PrStatus', (req, res) => {
  console.log(req.body) 
  res.send('Wrong operation type, it should be Post') 
}) 

app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send('Wrong path specified') 
}) 
app.listen(port, () => { 
  console.log('Server is running on port '+port) 
})

