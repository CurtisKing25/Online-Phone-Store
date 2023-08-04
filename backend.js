//MongoDB Password: CXPocKXpsvPehDcW

//Import mongoose
const mongoose = require('mongoose');
//Import express
const express = require('express');
//Imports Node.js file system
const fs = require('fs').promises;

// create the ExpressJS app
const app = express();
app.use(express.json());


//Connects to atlas account
//Link for documentation: https://mongoosejs.com/docs/connections.html
mongoose.connect("mongodb+srv:");

//PERSONAL DETAILS

//Create Personal Details schema
//Added in timestamps
const personalDetailsSchema = new mongoose.Schema(
  {
    personalInformation:
    {
      title: String,
      firstName: String,
      surname: String,
      mobile: String,
      email: String
    },
    billingAddress:
      {
        line1: String,
        line2: String,
        town: String,
        countyCity: String,
        eircode: String
      },
    shippingAddress:
      {
        line1: String,
        line2: String,
        town: String,
        countyCity: String,
        eircode: String
      }}
      ,
      {
        timestamps: true
      }
      );

//Create Personal Details Model
const personalDetailsModel = mongoose.model('personalDetails',personalDetailsSchema);


//POST PERSONAL DETAILS
app.post('/post/personaldetails', async (req, res) => 
{
  if (req.body.personalInformation.firstName && req.body.personalInformation.surname &&
  req.body.personalInformation.mobile && req.body.personalInformation.email &&
  req.body.billingAddress.line1 && req.body.billingAddress.town &&
  req.body.billingAddress.countyCity &&
  req.body.shippingAddress.line1 && req.body.shippingAddress.town && 
  req.body.shippingAddress.countyCity)
  {
  const personalDetails = new personalDetailsModel(
    {
      personalInformation:
      {
        title: req.body.personalInformation.title,
        firstName: req.body.personalInformation.firstName,
        surname: req.body.personalInformation.surname,
        mobile: req.body.personalInformation.mobile,
        email: req.body.personalInformation.email
      },
      billingAddress:
      {
        line1: req.body.billingAddress.line1,
        line2: req.body.billingAddress.line2,
        town: req.body.billingAddress.town,
        countyCity: req.body.billingAddress.countyCity,
        eircode: req.body.billingAddress.eircode
      },
    shippingAddress:
      {
        line1: req.body.shippingAddress.line1,
        line2: req.body.shippingAddress.line2,
        town: req.body.shippingAddress.town,
        countyCity: req.body.shippingAddress.countyCity,
        eircode: req.body.shippingAddress.eircode
      }
    }
    );

    try {
      await personalDetails.save();
      res.status(200).json("PERSONAL DETAILS CREATED")
    }
    catch (error) {
      res.status(400).json({ message: error.message })
      console.log("PERSONAL DETAILS NOT CREATED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide all required personal details as JSON"});
    console.log("Incorrect input for user");
  }
})

//GET PERSONAL DETAILS
app.post('/get/personaldetails',async (req,res)=>
{
  if (req.body.firstName && req.body.surname)
  {
    try
    {
      let userResult = await personalDetailsModel.findOne(
        {
          "personalInformation.firstName": req.body.firstName,
          "personalInformation.surname": req.body.surname
        });
      if(userResult === null)
      {
        res.status(200).json("User not in database");
        console.log("PERSONAL DETAILS NOT IN DATABASE");
      }
      else 
      {
        res.status(200).json(userResult);
        console.log("PERSONAL DETAILS RETRIVED");
      }
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("PERSONAL DETAILS NOT RETRIVED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide 'firstName':'text' and 'surname':'text' as JSON"});
    console.log("Incorrect input for user");
  }
})

//PUT PERSONAL DETAILS
app.put('/put/personaldetails',async (req,res)=>
{
  if (req.body.firstName && req.body.surname && 
    req.body.mobile && req.body.email && req.body.line1)
  {
    const findCustomer =
    { 
      "personalInformation.firstName": req.body.firstName,
      "personalInformation.surname": req.body.surname
    };

    const updateCustomer =
    { 
      "personalInformation.title":req.body.title,
      "personalInformation.mobile":req.body.mobile,
      "personalInformation.email":req.body.email,
      "shippingAddress.line1":req.body.line1
    };

    try
    {
      await personalDetailsModel.updateOne(findCustomer,updateCustomer);
      res.status(200).json("PERSONAL DETAILS UPDATED");
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("PERSONAL DETAILS NOT UPDATED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide all required details and newdetails as JSON"});
    console.log("Incorrect input for user");
  }
})

//DELETE PERSONAL DETAILS
app.delete('/delete/personaldetails',async (req,res)=>
{
  if (req.body.firstName && req.body.surname && req.body.mobile && req.body.email)
  {
    try
    {
      await personalDetailsModel.deleteOne(
        { 
          "personalInformation.firstName":req.body.firstName,
          "personalInformation.surname":req.body.surname,
          "personalInformation.mobile": req.body.mobile,
          "personalInformation.email": req.body.email
        });
        res.status(200).json("PERSONAL DETAILS DELETED");
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("PERSONAL DETAILS NOT DELETED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide 'firstName':'text', 'surname':'text', 'mobile':'text' and 'email':'text' as JSON"});
    console.log("Incorrect input for order");
  }
})


//ITEM DETAILS


//Create item details schema
//Added timestamps
const itemDetailsSchema = new mongoose.Schema(
  {
    item:
      {
        manufacturer: String,
        model: String,
        price: String
      }
  }
  ,
      {
        timestamps: true
      }
  );

//Creates item details model
const itemDetailsModel = mongoose.model('itemDetails', itemDetailsSchema);

//POST ITEM DETAILS
app.post('/post/itemdetails', async (req, res) => 
{
  if (req.body.manufacturer && req.body.model && req.body.price)
  {
    const itemDetails = new itemDetailsModel(
      {
        item:
        {
          manufacturer: req.body.manufacturer,
          model: req.body.model,
          price: "€" + req.body.price
        }
      }
    );

    try 
    {
      await itemDetails.save();
      res.status(200).json("ITEM DETAILS CREATED")
    }
    catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
  else
  {
    res.status(400).send({message: "Must provide all required item details as JSON"});
  }
})

//GET ITEM DETAILS
app.post('/get/itemdetails',async (req,res)=>
{
  console.log(req.body);
  if (req.body.manufacturer && req.body.model)
  {
    try
    {
      let itemResult = await itemDetailsModel.findOne(
        {
          "item.manufacturer": req.body.manufacturer,
          "item.model": req.body.model
        });
      if(itemResult === null)
      {
        res.status(200).json("Item not in database");
        console.log("ITEM DETAILS NOT IN DATABASE");
      }
      else 
      {
        res.status(200).json(itemResult);
        console.log("ITEM DETAILS RETRIVED");
      }
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("ITEM DETAILS NOT RETRIVED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide 'manufacturer':'text' and 'model':'text' as JSON"});
    console.log("Incorrect input for item");
  }
})

//PUT ITEM DETAILS
app.put('/put/itemdetails',async (req,res)=>
{
  if (req.body.manufacturer && req.body.model && req.body.price)
  {
    try
    {
      console.log(req.body.manufacturer);
      console.log(req.body.model);
      console.log(req.body.price);
      await itemDetailsModel.updateOne(
        { 
          "item.manufacturer": req.body.manufacturer,
          "item.model": req.body.model
        },
        { 
          "item.price": "€"+req.body.price
        });

      res.status(200).json("ITEM DETAILS UPDATED");
      console.log("ITEM DETAILS UPDATED");
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("ITEM DETAILS NOT UPDATED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide 'manufacturer':'text', 'model':'text' and 'price':'text' as JSON"});
    console.log("Incorrect input for user");
  }
})

//DELETE ITEM DETAILS
app.delete('/delete/itemdetails',async (req,res)=>
{
  if (req.body.manufacturer && req.body.model && req.body.price)
  {
    try
    {
      await itemDetailsModel.deleteOne(
        { 
          "item.manufacturer":req.body.manufacturer,
          "item.model":req.body.model,
          "item.price": "€"+req.body.price
        });
        res.status(200).json("ITEM DETAILS DELETED");
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("ITEM DETAILS NOT DELETED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide 'manufacturer':'text', 'model':'text' and 'price':'text' as JSON"});
    console.log("Incorrect input for order");
  }
})



//ORDER DETAILS

//Create order details schema
const orderDetailsSchema = new mongoose.Schema(
  {
    personalInformation:
    {
      title: String,
      firstName: String,
      surname: String,
      mobile: String,
      email: String
    },
    item:[
      {
        manufacturer: String,
        model: String,
        price: String
      },
    ]
  }
  ,
  {
    timestamps: true
  }
  );

//Create order details model
const orderDetailsModel = mongoose.model('orderDetails', orderDetailsSchema);


//POST ORDER DETAILS
app.post('/post/orderdetails', async (req, res) => 
{
  if (req.body.personalInformation.firstName && req.body.personalInformation.surname &&
    req.body.personalInformation.mobile && req.body.personalInformation.email &&
    req.body.item.length > 0)
  {
    // title: req.body.personalInformation.title
    const orderDetails = new orderDetailsModel(
      {
        personalInformation:
        {
          title: req.body.personalInformation.title,
          firstName: req.body.personalInformation.firstName,
          surname: req.body.personalInformation.surname,
          mobile: req.body.personalInformation.mobile,
          email: req.body.personalInformation.email
        },
        item: req.body.item.map(item => 
          ({
            manufacturer: item.manufacturer,
            model: item.model,
            price: "€"+item.price
          })
        )
      }
    );

    try {
      await orderDetails.save();
      res.status(200).json("ORDER DETAILS CREATED")
    }
    catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
  else
  {
    res.status(400).send({message: "Must provide all required order details as JSON"});
  }
})

//GET ORDER DETAILS
app.post('/get/orderdetails',async (req,res)=>
{
  if (req.body.firstName && req.body.surname && req.body.mobile && req.body.email)
  {
    try
    {
      let orderResult = await orderDetailsModel.findOne(
        {
          "personalInformation.firstName": req.body.firstName,
          "personalInformation.surname": req.body.surname,
          "personalInformation.mobile": req.body.mobile,
          "personalInformation.email": req.body.email
        });
      if(orderResult === null)
      {
        res.status(200).json("Order not in database");
        console.log("ORDER DETAILS NOT IN DATABASE");
      }
      else 
      {
        res.status(200).json(orderResult);
        console.log("ORDER DETAILS RETRIVED");
      }
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("ORDER DETAILS NOT RETRIVED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide 'firstName':'text', 'surname':'text', 'mobile':'text' and 'email':'text' as JSON"});
    console.log("Incorrect input for order");
  }
})

//PUT ORDER DETAILS
app.put('/put/orderdetails',async (req,res)=>
{
  if (req.body.firstName && req.body.surname && req.body.mobile && req.body.email &&
      req.body.newManufacturer && req.body.newModel && req.body.newPrice && req.body.newEmail)
  {
    try
    {
      await orderDetailsModel.updateOne(
        { 
          "personalInformation.firstName":req.body.firstName,
          "personalInformation.surname":req.body.surname,
          "personalInformation.mobile": req.body.mobile,
          "personalInformation.email": req.body.email
        },
        {
          "item.0.manufacturer": req.body.newManufacturer,
          "item.0.model": req.body.newModel,
          "item.0.price": "€"+req.body.newPrice,
          "personalInformation.email":req.body.newEmail
        });

      res.status(200).json("ORDER DETAILS UPDATED");
      console.log("ORDER DETAILS UPDATED");
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("ORDER DETAILS NOT UPDATED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide all required order details as JSON"});
    console.log("Incorrect input for user");
  }
})

//DELETE ORDER DETAILS
app.delete('/delete/orderdetails',async (req,res)=>
{
  if (req.body.firstName && req.body.surname && req.body.mobile && req.body.email)
  {
    try
    {
      await orderDetailsModel.deleteOne(
        { 
          "personalInformation.firstName":req.body.firstName,
          "personalInformation.surname":req.body.surname,
          "personalInformation.mobile": req.body.mobile,
          "personalInformation.email": req.body.email
        });
        res.status(200).json("ORDER DETAILS DELETED");
    }
    catch(error)
    {
      res.status(500).json({message: error.message})
      console.log("ORDER DETAILS NOT DELETED");
    }
  }
  else
  {
    res.status(400).send({message: "Must provide 'firstName':'text', 'surname':'text', 'mobile':'text' and 'email':'text' as JSON"});
    console.log("Incorrect input for order");
  }
})

app.use(express.static(__dirname));

//Gets the HTML page and sends it to the client when the website is accessed
app.get('/', (req, res) => 
{
    res.sendFile(__dirname + '/frontend.html');
});
    
    
// listen for requests on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  }); 
    


/*
Database design:
I used a denormalised model for my database. I made a 3 collection one for each set of details.  
As a result when making my orderDetails collection,
I retreived from my userDetails and itemDetails collections to create the orders

Links:

https://www.geeksforgeeks.org/express-js-res-sendfile-function/
https://codeforgeek.com/handle-get-post-request-express-4/
https://www.section.io/engineering-education/rendering-html-pages-as-a-http-server-response-using-node-js/
https://coder-coder.com/display-divs-side-by-side/
https://expressjs.com/en/4x/api.html
https://www.w3schools.com/jsref/api_fetch.asp
https://www.mongodb.com/docs/manual/reference/command/update/

No Framework used
*/