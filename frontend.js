//PERSONAL DETAILS

//POST PERSONAL DETAILS
function postPersonalDetails()
{
    let postPersonalInformationTitle = document.getElementById('postPersonalInformationTitle')
    let title = postPersonalInformationTitle.value;

    let postPersonalInformationFirstName = document.getElementById('postPersonalInformationFirstName')
    let firstName = postPersonalInformationFirstName.value;

    let postPersonalInformationSurname = document.getElementById('postPersonalInformationSurname')
    let surname = postPersonalInformationSurname.value;

    let postPersonalInformationMobile = document.getElementById('postPersonalInformationMobile')
    let mobile = postPersonalInformationMobile.value;

    let postPersonalInformationEmail = document.getElementById('postPersonalInformationEmail')
    let email = postPersonalInformationEmail.value;


    let postBillingAddressLine1 = document.getElementById('postBillingAddressLine1')
    let billingAddressLine1 = postBillingAddressLine1.value;

    let postBillingAddressLine2 = document.getElementById('postBillingAddressLine2')
    let billingAddressLine2 = postBillingAddressLine2.value;

    let postBillingAddressTown = document.getElementById('postBillingAddressTown')
    let billingTown = postBillingAddressTown.value;

    let postBillingAddressCounty = document.getElementById('postBillingAddressCounty')
    let billingCounty = postBillingAddressCounty.value;

    let postBillingAddressEircode = document.getElementById('postBillingAddressEircode')
    let billingEircode = postBillingAddressEircode.value;

    let postShippingAddressLine1 = document.getElementById('postShippingAddressLine1')
    let shippingAddressLine1 = postShippingAddressLine1.value;

    let postShippingAddressLine2 = document.getElementById('postShippingAddressLine2')
    let shippingAddressLine2 = postShippingAddressLine2.value;

    let postShippingAddressTown = document.getElementById('postShippingAddressTown')
    let shippingTown = postShippingAddressTown.value;

    let postShippingAddressCounty = document.getElementById('postShippingAddressCounty')
    let shippingCounty = postShippingAddressCounty.value;

    let postShippingAddressEircode = document.getElementById('postShippingAddressEircode')
    let shippingEircode = postShippingAddressEircode.value;


    if (firstName !== "" && surname !== "" && mobile !== "" && email !== "" &&
        billingAddressLine1 !== "" && billingTown !== "" && billingCounty !== "" && 
        shippingAddressLine1 !== "" && shippingTown !== "" && shippingCounty !== "")
    {
        postPersonalInformationTitle.value = "";
        postPersonalInformationFirstName.value = "";
        postPersonalInformationSurname.value = "";
        postPersonalInformationMobile.value = "";
        postPersonalInformationEmail.value = "";
        postBillingAddressLine1.value = "";
        postBillingAddressLine2.value = "";
        postBillingAddressTown.value = "";
        postBillingAddressCounty.value = "";
        postBillingAddressEircode.value = "";
        postShippingAddressLine1.value = "";
        postShippingAddressLine2.value = "";
        postShippingAddressTown.value = "";
        postShippingAddressCounty.value = "";
        postShippingAddressEircode.value = "";

        const postRequest = 
        {
            personalInformation: 
            {
                title: title,
                firstName: firstName,
                surname: surname,
                mobile: mobile,
                email: email,
            },
            billingAddress: 
            {
              line1:billingAddressLine1,
              line2: billingAddressLine2,
              town: billingTown,
              countyCity: billingCounty,
              eircode: billingEircode
            },
            shippingAddress: 
            {
              line1: shippingAddressLine1,
              line2: shippingAddressLine2,
              town: shippingTown,
              countyCity: shippingCounty,
              eircode: shippingEircode
            }
        }

        fetch('/post/personaldetails',
                {
                    method: 'POST',
                    body: JSON.stringify(postRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                //parses response as JSON
                .then(response => response.json())
                //Uses json
                .then(data => 
                {
                    alert(data);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    console.log('Fetch request completed.');
                  });
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//GET PERSONAL DETAILS
function getPersonalDetails()
{
    let getPersonalInformationFirstName = document.getElementById('getPersonalInformationFirstName')
    let firstName = getPersonalInformationFirstName.value;

    let getPersonalInformationSurname = document.getElementById('getPersonalInformationSurname')
    let surname = getPersonalInformationSurname.value;

    if (firstName !== "" && surname !== "")
    {
        getPersonalInformationFirstName.value = "";
        getPersonalInformationSurname.value = "";

        const getRequest = 
        {
            firstName: firstName,
            surname: surname
        }

        fetch('/get/personaldetails',
                {
                    method: 'POST',
                    body: JSON.stringify(getRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        const personalDetails = data;
        if(data.personalInformation == null)
        {
            document.getElementById('getPersonalDetailsAnswer').innerHTML = "";
            alert("Personal Details NOT Found");
        }
        else
        {
            const formattedPersonalInformation = "Title:"+personalDetails.personalInformation.title+
            "<br>First name:"+personalDetails.personalInformation.firstName+
            "<br>Surname:"+personalDetails.personalInformation.surname+
            "<br>Mobile:"+personalDetails.personalInformation.mobile+
            "<br>Email:"+personalDetails.personalInformation.email;

            const formattedBillingAddress = "Billing Line 1:"+personalDetails.billingAddress.line1+
            "<br>Billing Line 2:"+personalDetails.billingAddress.line2+
            "<br>Billing Town:"+personalDetails.billingAddress.town+
            "<br>Billing County:"+personalDetails.billingAddress.countyCity+
            "<br>Billing Eircode:"+personalDetails.billingAddress.eircode;

            const formattedShippingAddress = "Shipping Line 1:"+personalDetails.shippingAddress.line1+
            "<br>Shipping Line 2:"+personalDetails.shippingAddress.line2+
            "<br>Shipping Town:"+personalDetails.shippingAddress.town+
            "<br>Shipping County:"+personalDetails.shippingAddress.countyCity+
            "<br>Shipping Eircode:"+personalDetails.shippingAddress.eircode;

            document.getElementById('getPersonalDetailsAnswer').innerHTML = formattedPersonalInformation+
            "<br><br>"+formattedBillingAddress+
            "<br><br>"+formattedShippingAddress;
        }
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//PUT PERSONAL DETAILS
function putPersonalDetails()
{
    let putPersonalInformationFirstName = document.getElementById('putPersonalInformationFirstName')
    let firstName = putPersonalInformationFirstName.value;

    let putPersonalInformationSurname = document.getElementById('putPersonalInformationSurname')
    let surname = putPersonalInformationSurname.value;

    let putPersonalInformationTitle = document.getElementById('putPersonalInformationTitle')
    let title = putPersonalInformationTitle.value;

    let putPersonalInformationMobile = document.getElementById('putPersonalInformationMobile')
    let mobile = putPersonalInformationMobile.value;

    let putPersonalInformationEmail = document.getElementById('putPersonalInformationEmail')
    let email = putPersonalInformationEmail.value;


    let putShippingAddressLine1 = document.getElementById('putShippingAddressLine1')
    let shippingAddressLine1 = putShippingAddressLine1.value;

    if (firstName !== "" && surname !== "" && mobile !== "" && email !== "" && shippingAddressLine1 !== "")
    {
        putPersonalInformationFirstName.value = "";
        putPersonalInformationSurname.value = "";
        putPersonalInformationTitle.value = "";
        putPersonalInformationMobile.value = "";
        putPersonalInformationEmail.value = "";
        putShippingAddressLine1.value = "";

        const putRequest = 
        {
            firstName: firstName,
            surname: surname,
            title: title,
            mobile: mobile,
            email: email,
            line1: shippingAddressLine1
        }

        fetch('/put/personaldetails',
                {
                    method: 'PUT',
                    body: JSON.stringify(putRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        alert(data);
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//DELETE PERSONAL DETAILS
function deletePersonalDetails()
{
    let deleteFirstName = document.getElementById('deletePersonalInformationFirstName')
    let firstName = deleteFirstName.value;
    
    let deleteSurname = document.getElementById('deletePersonalInformationSurname');
    let surname = deleteSurname.value;
    
    let deleteMobile = document.getElementById('deletePersonalInformationMobile');
    let mobile = deleteMobile.value;
    
    let deleteEmail = document.getElementById('deletePersonalInformationEmail');
    let email = deleteEmail.value;

    if (firstName !== "" && surname !== "" && mobile !== "" && email !== "")
    {
        deleteFirstName.value = "";
        deleteSurname.value = "";
        deleteMobile.value = "";
        deleteEmail.value = "";

        const deleteRequest = 
        {
            firstName: firstName,
            surname: surname,
            mobile: mobile,
            email: email
        }

        fetch('/delete/personaldetails',
                {
                    method: 'DELETE',
                    body: JSON.stringify(deleteRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        alert(data);
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}


//ITEM DETAILS

//POST ITEM DETAILS
function postItemDetails()
{
    let postManufacturer = document.getElementById('postItemDetailsManufacturer')
    let manufacturer = postManufacturer.value;
    
    let postModel = document.getElementById('postItemDetailsModel');
    let model = postModel.value;
    
    let postPrice = document.getElementById('postItemDetailsPrice');
    let price = postPrice.value;

    if (manufacturer !== "" && model !== "" && price !== "")
    {
        postManufacturer.value = "";
        postModel.value = "";
        postPrice.value = "";

        const postRequest = 
        {
            manufacturer: manufacturer,
            model: model,
            price: price
        }

        fetch('/post/itemdetails',
                {
                    method: 'POST',
                    body: JSON.stringify(postRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                //parses response as JSON
                .then(response => response.json())
                //Uses json
                .then(data => 
                {
                    alert(data);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    console.log('Fetch request completed.');
                  });
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//GET ITEM DETAILS
function getItemDetails()
{
    let getManufacturer = document.getElementById('getItemDetailsManufacturer')
    let manufacturer = getManufacturer.value;

    let getModel = document.getElementById('getItemDetailsModel');
    let model = getModel.value;

    if (manufacturer !== "" && model !== "")
    {
        getManufacturer.value = "";
        getModel.value = "";

        const getRequest = 
        {
            manufacturer: manufacturer,
            model: model
        }

        fetch('/get/itemdetails',
                {
                    method: 'POST',
                    body: JSON.stringify(getRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        const itemDetails = data.item;
        if(data.item == null)
        {
            document.getElementById('getItemDetailsAnswer').innerHTML = "";
            alert("Item Details NOT Found");
        }
        else
        {
            const formattedDetails = "Manufacturer:"+itemDetails.manufacturer+"<br>Model:"+itemDetails.model+"<br>Price: "+itemDetails.price;
            document.getElementById('getItemDetailsAnswer').innerHTML = formattedDetails;
        }
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//PUT ITEM DETAILS
function putItemDetails()
{
    let putManufacturer = document.getElementById('putItemDetailsManufacturer')
    let manufacturer = putManufacturer.value;

    let putModel = document.getElementById('putItemDetailsModel');
    let model = putModel.value;

    let putPrice = document.getElementById('putItemDetailsPrice');
    let price = putPrice.value;

    if (manufacturer !== "" && model !== "" && price !== "")
    {
        putManufacturer.value = "";
        putModel.value = "";
        putPrice.value = "";

        const putRequest = 
        {
            manufacturer: manufacturer,
            model: model,
            price: price
        }

        fetch('/put/itemdetails',
                {
                    method: 'PUT',
                    body: JSON.stringify(putRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        alert(data);
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//DELETE ITEM DETAILS
function deleteItemDetails()
{
    let deleteManufacturer = document.getElementById('deleteItemDetailsManufacturer')
    let manufacturer = deleteManufacturer.value;

    let deleteModel = document.getElementById('deleteItemDetailsModel');
    let model = deleteModel.value;
    
    let deletePrice = document.getElementById('deleteItemDetailsPrice');
    let price = deletePrice.value;

    if (manufacturer !== "" && model !== "" && price !== "")
    {
        deleteManufacturer.value = "";
        deleteModel.value = "";
        deletePrice.value = "";
        
        const deleteRequest = 
        {
            manufacturer: manufacturer,
            model: model,
            price: price
        }

        fetch('/delete/itemdetails',
                {
                    method: 'DELETE',
                    body: JSON.stringify(deleteRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        alert(data);
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}


//ORDER DETAILS

//Makes an array to store several Order items
let itemArray = [];

//POST ORDER DETAILS
function postOrderDetails()
{

    let postOrderDetailsTitle = document.getElementById('postOrderDetailsTitle')
    let title = postOrderDetailsTitle.value;

    let postOrderDetailsFirstName = document.getElementById('postOrderDetailsFirstName')
    let firstName = postOrderDetailsFirstName.value;

    let postOrderDetailsSurname = document.getElementById('postOrderDetailsSurname')
    let surname = postOrderDetailsSurname.value;

    let postOrderDetailsMobile = document.getElementById('postOrderDetailsMobile')
    let mobile = postOrderDetailsMobile.value;

    let postOrderDetailsEmail = document.getElementById('postOrderDetailsEmail')
    let email = postOrderDetailsEmail.value;

    let postOrderDetailsManufacturer = document.getElementById('postOrderDetailsManufacturer')
    let manufacturer = postOrderDetailsManufacturer.value;

    let postOrderDetailsModel = document.getElementById('postOrderDetailsModel')
    let model = postOrderDetailsModel.value;

    let postOrderDetailsPrice = document.getElementById('postOrderDetailsPrice')
    let price = postOrderDetailsPrice.value;

    if (firstName !== "" && surname !== "" && mobile !== "" && email !== "" && 
        manufacturer !== "" && model !== "" && price !== "")
    {
        postOrderDetailsTitle.value = "";
        postOrderDetailsFirstName.value = "";
        postOrderDetailsSurname.value = "";
        postOrderDetailsMobile.value = "";
        postOrderDetailsEmail.value = "";
        postOrderDetailsManufacturer.value = "";
        postOrderDetailsModel.value = "";
        postOrderDetailsPrice.value = "";

        itemArray.push(
        {
            manufacturer: manufacturer,
            model: model,
            price: price
        });

        const postRequest = 
        {
            personalInformation:
            {
                title: title,
                firstName: firstName,
                surname: surname,
                mobile: mobile,
                email: email
            },
            item: itemArray
        }

        fetch('/post/orderdetails',
                {
                    method: 'POST',
                    body: JSON.stringify(postRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
                .then((data) => 
                {
                    alert(data);
                })
      .finally(() => {
        itemArray = [];
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//Adds Order item to array
function addOrderItem()
{
    let postOrderDetailsManufacturer = document.getElementById('postOrderDetailsManufacturer')
    let manufacturer = postOrderDetailsManufacturer.value;

    let postOrderDetailsModel = document.getElementById('postOrderDetailsModel')
    let model = postOrderDetailsModel.value;

    let postOrderDetailsPrice = document.getElementById('postOrderDetailsPrice')
    let price = postOrderDetailsPrice.value;

    if (manufacturer !== "" && model !== "" && price !== "")
    {
        postOrderDetailsManufacturer.value = "";
        postOrderDetailsModel.value = "";
        postOrderDetailsPrice.value = "";

        itemArray.push(
        {
            manufacturer: manufacturer,
            model: model,
            price: price
        });
        alert("Order Item Added");
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//Clears Order items array
function clearOrderItems()
{
    itemArray = [];
    alert("Order Items Cleared");
}

//GET ORDER DETAILS
function getOrderDetails()
{
    let getOrderDetailsFirstName = document.getElementById('getOrderDetailsFirstName')
    let firstName = getOrderDetailsFirstName.value;

    let getOrderDetailsSurname = document.getElementById('getOrderDetailsSurname')
    let surname = getOrderDetailsSurname.value;

    let getOrderDetailsMobile = document.getElementById('getOrderDetailsMobile')
    let mobile = getOrderDetailsMobile.value;

    let getOrderDetailsEmail = document.getElementById('getOrderDetailsEmail')
    let email = getOrderDetailsEmail.value;

    if (firstName !== "" && surname !== "" && mobile !== "" && email !== "")
    {
        getOrderDetailsFirstName.value = "";
        getOrderDetailsSurname.value = "";
        getOrderDetailsMobile.value = "";
        getOrderDetailsEmail.value = "";

        const getRequest = 
        {
            firstName: firstName,
            surname: surname,
            mobile: mobile,
            email: email
        }

        fetch('/get/orderdetails',
                {
                    method: 'POST',
                    body: JSON.stringify(getRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        const orderDetails = data;
        if(data.personalInformation == null)
        {
            document.getElementById('getOrderDetailsAnswer').innerHTML = "";
            alert("Order Details NOT Found");
        }
        else
        {
            const formattedPersonalInformation = "Title:"+orderDetails.personalInformation.title+
            "<br>First name:"+orderDetails.personalInformation.firstName+
            "<br>Surname:"+orderDetails.personalInformation.surname+
            "<br>Mobile:"+orderDetails.personalInformation.mobile+
            "<br>Email:"+orderDetails.personalInformation.email;

            document.getElementById('getOrderDetailsAnswer').innerHTML = formattedPersonalInformation;

            for(i = 0; i < orderDetails.item.length; i++)
            {
                const formattedItemDetails = "Manufacturer:"+orderDetails.item[i].manufacturer+
                "<br>Model:"+orderDetails.item[i].model+
                "<br>Price: "+orderDetails.item[i].price;
                document.getElementById('getOrderDetailsAnswer').innerHTML += "<br><br>"+formattedItemDetails;
            }
        }
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//PUT ORDER DETAILS
function putOrderDetails()
{
    let putOrderDetailsFirstName = document.getElementById('putOrderDetailsFirstName')
    let firstName = putOrderDetailsFirstName.value;
    
    let putOrderDetailsSurname = document.getElementById('putOrderDetailsSurname')
    let surname = putOrderDetailsSurname.value;
    
    let putOrderDetailsMobile = document.getElementById('putOrderDetailsMobile')
    let mobile = putOrderDetailsMobile.value;
    
    let putOrderDetailsEmail = document.getElementById('putOrderDetailsEmail')
    let email = putOrderDetailsEmail.value;

    let putOrderDetailsManufacturer = document.getElementById('putOrderDetailsManufacturer')
    let manufacturer = putOrderDetailsManufacturer.value;
    
    let putOrderDetailsModel = document.getElementById('putOrderDetailsModel');
    let model = putOrderDetailsModel.value;
    
    let putOrderDetailsPrice = document.getElementById('putOrderDetailsPrice');
    let price = putOrderDetailsPrice.value;
    
    let putNewOrderDetailsEmail = document.getElementById('putNewOrderDetailsEmail')
    let newEmail = putNewOrderDetailsEmail.value;

    if (firstName !== "" && surname !== "" && mobile !== "" && email !== "" &&
        manufacturer !== "" && model !== "" && price !== "" && newEmail !== "")
    {
        putOrderDetailsFirstName.value = "";
        putOrderDetailsSurname.value = "";
        putOrderDetailsMobile.value = "";
        putOrderDetailsEmail.value = "";
        putOrderDetailsManufacturer.value = "";
        putOrderDetailsModel.value = "";
        putOrderDetailsPrice.value = "";
        putNewOrderDetailsEmail.value = "";

        const putRequest = 
        {
            firstName: firstName,
            surname: surname,
            mobile: mobile,
            email: email,
            newManufacturer: manufacturer,
            newModel: model,
            newPrice: price,
            newEmail: newEmail
        }

        fetch('/put/orderdetails',
                {
                    method: 'PUT',
                    body: JSON.stringify(putRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        alert(data);
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}

//DELETE ORDER DETAILS
function deleteOrderDetails()
{
    let deleteOrderDetailsFirstName = document.getElementById('deleteOrderDetailsFirstName')
    let firstName = deleteOrderDetailsFirstName.value;
    
    let deleteOrderDetailsSurname = document.getElementById('deleteOrderDetailsSurname');
    let surname = deleteOrderDetailsSurname.value;
    
    let deleteOrderDetailsMobile = document.getElementById('deleteOrderDetailsMobile');
    let mobile = deleteOrderDetailsMobile.value;
    
    let deleteOrderDetailsEmail = document.getElementById('deleteOrderDetailsEmail');
    let email = deleteOrderDetailsEmail.value;
    

    if (firstName !== "" && surname !== "" && mobile !== "" && email !== "")
    {
        deleteOrderDetailsFirstName.value = "";
        deleteOrderDetailsSurname.value = "";
        deleteOrderDetailsMobile.value = "";
        deleteOrderDetailsEmail.value = "";

        const deleteRequest = 
        {
            firstName: firstName,
            surname: surname,
            mobile: mobile,
            email: email
        }

        fetch('/delete/orderdetails',
                {
                    method: 'DELETE',
                    body: JSON.stringify(deleteRequest),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
      .then((data) => {
        alert(data);
      })
      .finally(() => {
        console.log('Fetch request completed.');
      });        
    }
    else
    {
        alert("Please fill in all marked fields");
    }
}