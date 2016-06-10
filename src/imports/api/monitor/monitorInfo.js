import { Mongo } from 'meteor/mongo';

export const Monitor = new Mongo.Collection('Monitor');

// Deny all client-side updates since this collection will only be managed by the server
Monitor.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Monitor.schema = new SimpleSchema({
  kioskId: { type: String },
  status: { type: Number, decimal: false }
});

Monitor.attachSchema(Monitor.schema);

// ensure unique documents
Monitor.publicFields = {
  kioskId: 1,
  status: 1
};