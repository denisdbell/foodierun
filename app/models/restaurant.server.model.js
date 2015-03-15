'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Restaurant Schema
 */
var RestaurantSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please enter Restaurant name',
		trim: true
	},
	slogan: {
		type: String,
		default: '',
		required: 'Please enter slogan',
		trim: true
	},
	logo: {
		type: String,
		default: '',
		required: 'Please add a logo',
		trim: true
	},
	address: {
		logitude: Number,
		latitude: Number,
		street: String,
		town: String,
		parish: String
	},
	phoneNumbers: [String],
	email: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your email',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
});

mongoose.model('Restaurant', RestaurantSchema);
