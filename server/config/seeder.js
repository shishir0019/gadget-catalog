const async = require('async');
const Category = require('../category/category.model');
const Brand = require('../brand/brand.model');
const User = require('../user/user.model');

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

const userSeeder = function(callback) {
    User.findOne({ role: 'admin' }, function(err, doc) {
        if(doc) {
            return callback(null, doc);
        }

        let user = new User();

        user.role = 'admin';
        user.displayName = 'Administrator';
        user.local.name = 'Administrator';
        user.local.email = 'admin@gadget-catalog.io';
        user.local.password = user.generateHash('password_that_will_change');

        user.save(function(err, doc) {
            if(err) return callback(err);
            callback(null, doc);
        });
    });
};

const categorySeeder = function(user, callback) {
    const array = [
        'Laptop', 'Motherboard', 'Processor', 'Mobile', 'Tablet', 'Memory', 'Gaming console & peripheral',
        'Networking', 'PSU', 'GPU', 'Storage', 'Monitor', 'Chassis', 'Audio', 'Computer accessories',
        'Optical drive', 'Keyboard & Mouse'
    ].sort();

    async.each(array, function(item, asyncCallback) {
        new Category({
            name: item,
            slug: convertToSlug(item),
            createdBy: user._id
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback(null, user);
    });
};

const brandSeeder = function(user, callback) {
    const array = [
        'Acer', 'Apple', 'Asus', 'AMD', 'Audio-Technica', 'Cooler Master', 'Corsair', 'Dell', 'HP', 'Intel', 'Microsoft', 'MSI', 'Nokia',
        'Nvidia', 'Samsung', 'Sony', 'Thermaltake', 'TP-Link', 'HTC', 'Lenovo', 'ZOTAC', 'Western Digital'
    ].sort();

    async.each(array, function(item, asyncCallback) {
        new Brand({
            name: item,
            slug: convertToSlug(item),
            createdBy: user._id
        }).save(function() {
            asyncCallback();
        });
    }, function() {
        callback();
    });
};

exports.run = function () {
    async.waterfall([ userSeeder, categorySeeder, brandSeeder ], function(err) {
        if(err) console.error(err);
        else console.info('DB seed completed!');
    });
};
