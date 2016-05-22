import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Providers } from '../../api/providers.js';

import './addProvider.html'

Template.addProvider.onRendered(function() {
  $('select').material_select();
});

Template.addProvider.events({
    'submit .add-provider': function (e) {
        e.preventDefault()

        var name = e.target.name.value,
            email = e.target.email.value,
            phone = e.target.phone.value,
            city = e.target.city.value,
            address = e.target.address.value,
            category = e.target.category.value,
            price = e.target.price.value,
            message = e.target.message.value;
            
            

        Providers.insert({
            name: name,
            email: email,
            phone: phone,
            city: city,
            address: address,
            category: category,
            price: price,
            message: message,
            createdAt: new Date()
        })

        FlashMessages.sendSuccess('Service was added successfully! Thank you for working with us.');
        Router.go('/')
    }
})