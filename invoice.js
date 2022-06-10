// javascript

// On 'Add New Item" button press - 
// TASK and TOTAL html is created with JavaScript and 
// Invoice Description is passed into the TASK section
// Cost is passed into the TOTAL section
let customInvoiceItm = []
// Input Field area variables
let invoiceDescr = document.getElementById("invoice-descr")
let invoiceNmbr = document.getElementById("invoice-nmbr")
let clientName = document.getElementById("client-name")
let clientEmail = document.getElementById("client-email")


// Area where the custom items are rendered to
let invoiceItemsArea = document.querySelector(".invoice-items")

// Task and Total area variables
let invTask = document.getElementById("inv-task")
let invTotal = document.getElementById("inv-total")
let totalAmount = document.getElementById("total-amount")

// Client Summary variables

let clientSumName = document.getElementById("client-sum-name")
let clientSumEmail = document.getElementById("client-sum-email")

// // Remove button variable
// const rmvBtn = document.getElementById("remove-btn")

const addNewItemBtn = document.getElementById("add-new-item")
const removeBtn = document.getElementById('clear-invoice')
let removeLastEntry = document.getElementById('remove-last-entry')

const invoiceItemsFromLocalStorage = JSON.parse(localStorage.getItem("customInvoiceItm"))
let renderItems = invoiceItemsFromLocalStorage
console.log(renderItems)
// check if invoiceItemsFromLocalStorage is truthy
// If so, set invoiceArr array to its value and call the addCustomItem() function
if (invoiceItemsFromLocalStorage) {
    customInvoiceItm = invoiceItemsFromLocalStorage
    addCustomItem(customInvoiceItm)
}



// RENDER HTML FROM BOTH INPUTS DESCRIPTION AND COST AND DISPALY VIA invoiceItemsArea.innerHTML

function addCustomItem(renderItems) {
    let customItem = ""
    for(let i = 0; i < customInvoiceItm.length; i++){
        customItem += `
        <div class="invoice-task-total">
        <h3 id="inv-task" class="item">${renderItems[i].service}</h3>

        <button id="remove-last-entry">--remove</button>
        <h3 id="inv-total" class="item">$ ${renderItems[i].cost}</h3>
        </div>
        `
    }

    // Outputs the input from the input forms onto the screen
    invoiceItemsArea.innerHTML = customItem
    
}



// listens for button click and pushes a value from the user entered values from input fields "invoiceDescr" and "invoiceNmbr" Custom Invoice Item Description and Cost into the invoiceArr array
addNewItemBtn.addEventListener("click", function() {
    if(invoiceDescr.value === "" && invoiceNmbr.value === "" && clientName.value === "" && clientEmail.value === "") return 
    
     // Object that sorts input values into its own category
    let items = 
    {
        client:clientName.value,
        email:clientEmail.value,
        service:invoiceDescr.value,
        cost:invoiceNmbr.value
    }

    customInvoiceItm.push(items)

    // Clears the Custom Invoice Item and Cost value fields
    console.log(customInvoiceItm)
    
    clientName.value = ""
    clientEmail.value = ""
    invoiceDescr.value = ""
    invoiceNmbr.value = ""
    // Saves these values into Browser's local storage
    localStorage.setItem("customInvoiceItm", JSON.stringify(customInvoiceItm))
    
    addCustomItem(customInvoiceItm)
})


// SAVE TO LOCALSTORAGE AND RENDER TO DOM ON ENTER KEYPRESS
document.addEventListener('keypress', function() {
    // if Enter is pressed (as keyCode === 13 is for keyboard key)
    if (event.key === 'Enter') {
        if(invoiceDescr.value === "" && invoiceNmbr.value === "") return 
    
        // Object that sorts input values into its own category
       let items = 
       {
           client:clientName.value,
           email:clientEmail.value,
           service:invoiceDescr.value,
           cost:invoiceNmbr.value
       }
   
       customInvoiceItm.push(items)
        // clear the input field for a new entry
        clientName.value = ""
        clientEmail.value = ""
        invoiceDescr.value = ""
        invoiceNmbr.value = ""
        // save the new input into localStorage in the browser
        localStorage.setItem("customInvoiceItm", JSON.stringify(customInvoiceItm))
        // addDescriptionItem(customInvoiceItm)
        // addCostItem(customInvoiceItm)
        addCustomItem(customInvoiceItm)
    }
})



// CALCULATE THE TOTAL OF ALL ITEMS COSTS IN AN ARRAY

// With Arrow Function 
// let sum = customInvoiceItm.reduce((x, {cost}) => x + +cost, 0)

// Without Arrow Function
let sum = customInvoiceItm.reduce(function(x, {cost}){
      return (x+ +cost)
    },0)

// console.log(sum)
// render to DOM into the TOTAL AMOUNT area with an $ sign before the sum, using 
totalAmount.innerText = ` ${sum}`

// RENDER CLIENT'S NAME AND EMAIL TO THE DOM

// let nameOfClient = customInvoiceItm.reduce (({email},{client}) => email+client)
// let emailOfClient = customInvoiceItm.reduce (({client},{email}) => client+email)

let nameOfClient = customInvoiceItm.reduce(function(email, {client}){
    return (email+client)
  },"")

  let emailOfClient = customInvoiceItm.reduce(function(client, {email}){
    return (client+email)
  },"")

clientSumName.innerHTML = nameOfClient
clientSumEmail.innerHTML = emailOfClient





// Check if all the input fields are filled in otherwise can't press Input Button
// function testFinish(){
//     let frm = document.getElementById('form')
//     if (frm['descr'].value && frm['cost'].value)
//       frm['add-item'].disabled = false
//     } 

//Deletes localStorage saved items after clicking the deleteBtn
removeBtn.addEventListener("click", function() {
    localStorage.clear()
    customInvoiceItm = []
    totalAmount.innerText = ""
    clientSumName.innerHTML = ""
    clientSumEmail.innerHTML = ""
    addCustomItem(customInvoiceItm)
    
})


// REMOVE LAST INLINE ENTRY 
// removeLastEntry.addEventListener("click", function() {

//     let items = 
//     {
//         service:invoiceDescr.value,
//         cost:invoiceNmbr.value
//     }

//     customInvoiceItm.pop(items)
//     addCustomItem(customInvoiceItm)
// })

