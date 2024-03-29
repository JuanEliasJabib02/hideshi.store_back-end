
const mercadopago = require("mercadopago");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })

mercadopago.configure({ access_token: process.env.MERCADOPAGO_ACCCES_TOKEN })


const createPayment = async (orderData, cart) => {
  try {


    const productsForMercadoPago =  await cart?.map(product => {
      const item = {
        title: product.title,
        description: product.size,
        picture_url: product.picture_url,
        quantity: product.quantity,
        currency_id: "CO",
        unit_price:product.unit_price
      }
      return item
    })


    const preference = {
    binarymode_mode: true, /* Dont access pendings */
    items: productsForMercadoPago,
    payer: {
      name: orderData.name,
      surname: orderData.surname,
      email: orderData.email,
      phone: {
        area_code: orderData.phone, // I put the area code for the moment because when i use the property phone is bugged
      }
    },
    shipments: {
        receiver_address: {
          street_name: orderData.address,
          city_name: orderData.city,
          zip_code: orderData.email
        }
    },
    back_urls: {
      success: "https://hideshi.netlify.app/",
      failure: "",
      pending:""
    },
    auto_return: "approved",
      notification_url: "https://046e-181-32-147-163.ngrok.io/api/v1/order"
    }
    const payment = await mercadopago.preferences.create(preference)
    return payment
    
} catch (error) {
  next(error)
}

}



module.exports = {
  createPayment
}