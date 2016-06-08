import { Mongo } from 'meteor/mongo';

export const Weathers = new Mongo.Collection('Weathers');

// Deny all client-side updates since this collection will only be managed by the server
Weathers.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Weathers.schema = new SimpleSchema({
  city: { type: String },
  temperature: { type: Number, decimal: true },
  humidity: { type: Number, decimal: true },
  img: { type: String }
});

Weathers.attachSchema(Weathers.schema);

// ensure unique documents
Weathers.publicFields = {
  city: 1,
  temperature: 1,
  humidity: 1,
  img: 1
};