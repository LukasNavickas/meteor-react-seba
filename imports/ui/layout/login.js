import './login.html';

Template.login.helpers({
    userEmail: function () {
        return Meteor.user().emails[0].address
    }
})
Template.login.events({
    'click .register-link': function (e) {
        e.preventDefault()

        $('.panel-login').hide()
        $('.panel-register').fadeIn()
    },
    'click .login-link': function (e) {
        e.preventDefault()

        $('.panel-register').hide()
        $('.panel-login').fadeIn()
    },
    'submit .register-form': function (e) {
        e.preventDefault()

        var email = e.target.emailReg.value,
            password = e.target.passwordReg.value,
            password2 = e.target.passwordReg2.value


        if (isNotEmpty(email) &&
            isEmail(email) &&
            isNotEmpty(password) &&
            isNotEmpty(password2) &&
            areValidPasswords(password, password2)) {

            Accounts.createUser({
                email: email,
                password: password,
                profile: {
                    usertype: 'customer'
                }
            }, function (err) {
                if (err) {
                    FlashMessages.sendError('There was an error with registration')
                } else {
                    FlashMessages.sendSuccess('Account Created! You are now logged in')
                    Router.go('/dashboard')
                }
            })
        }
    },
    'submit .login-form': function (e) {
        e.preventDefault()

        var email = e.target.email.value
        var password = e.target.password.value

        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                e.target.email.value = email
                e.target.password.value = password
                FlashMessages.sendError(err.reason)
            } else {
                FlashMessages.sendSuccess('You are logged in')
                Router.go('/dashboard')
            }
        })

        e.target.email.value = ''
        e.target.password.value = ''
    },
    'submit .logout-form': function (e) {
        e.preventDefault()

        Meteor.logout(function (err) {
            if (err) {
                FlashMessages.sendError(err.reason)
            } else {
                FlashMessages.sendSuccess('You are now logged out')
                Router.go('/')
            }
        })
    }
})

// Validation Rules
var trimInput = function (val) {
    return val.replace(/^\s|\s*$/g, '')
}

var isNotEmpty = function (val) {
    if (val && val !== '') return true
    
    FlashMessages.sendError('Please fill in all fields')
    return false
}

var isEmail = function (val) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (filter.test(val)) return true

    FlashMessages.sendError('Please use a vaild email address')
    return false
}

var isValidPassword = function(password) {
    if (password.length < 6) {
        FlashMessages.sendError('Password must be at least 6 characters')
        return false
    }
    return true
}

var areValidPasswords = function (password, confirm) {
    if (!isValidPassword(password)) return false
    if (!isValidPassword(confirm))  return false
    if (password !== confirm) {
        FlashMessages.sendError('Passwords do not match')
        return false
    }
    return true
}
