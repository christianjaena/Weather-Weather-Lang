const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const schema = new Schema({
	id: {
		type: Number,
		required: true,
	},
});

const SampleSchema = Model('SampleSchema', schema)
module.exports = SampleSchema;
