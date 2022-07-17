const mongoose = require('mongoose')
const{ ObjectId } = mongoose.Schema

const personSchema =  new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false
        },

        address: {
            country: {
                type: String
            },
            city: {
                type: String
            },
            zip: {
                type: String
            },
            address_1: {
                type: String 
            },
            address_2: {
                type: String 
            }
        }
    },
    {
        timestamps: true
    }
);

const PersonModel = mongoose.model( 'persons', personSchema )


module.exports = { PersonModel }