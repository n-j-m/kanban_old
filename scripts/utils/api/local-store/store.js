"use strict";

import result from "./result";

// Generate four random hex digits.
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function isObject(item) {
  return item === Object(item);
}

const defaultSerializer = {
  serialize(item) {
    return isObject(item) ? JSON.stringify(item) : item;
  },

  deserialize(data) {
    return data && JSON.parse(data);
  }
};

class Store {

  constructor(name, serializer) {
    if (typeof window === "undefined" || !window.localStorage)
      throw "Store: localStorage not supported in this environment";
    this.name = name;
    this.serializer = serializer || defaultSerializer;
    var store = this.localStorage().getItem(this.name);
    this.records = (store && store.split(",")) || [];
  }

  save() {
    this.localStorage().setItem(this.name, this.records.join(","));
  }

  create(model) {
    if (!model.id && model.id !== 0) {
      model.id = guid();
      model.set(model.idAttribute, model.id);
    }
    var itemName = this._itemName(model.id);
    console.log("itemName:", itemName);
    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
    this.records.push(model.id.toString());
    this.save();
    return this.find(model);
  }

  update(model) {
    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
    var modelId = model.id.toString();
    if (!contains(this.records, modelId)) {
      this.records.push(modelId);
      this.save();
    }
    return this.find(model);
  }

  find(model) {
    return this.serializer.deserialize(this.localStorage().getItem(this._itemName(model.id)));
  }

  findAll() {
    var result = [];
    for (var i = 0, id, data; i < this.records.length; i++) {
      id = this.records[i];
      data = this.serializer.deserialize(this.localStorage().getItem(this._itemName(id)));
      if (data != null) result.push(data);
    }
    return result;
  }

  destroy(model) {
    this.localStorage().removeItem(this._itemName(model.id));
    var modelId = model.id.toString();
    for (var i = 0, id; i < this.records.length; i++) {
      if (this.records[i] === modelId) {
        this.records.splice(i, 1);
      }
    }
    this.save();
    return model;
  }

  localStorage() {
    return window.localStorage;
  }

  // Clear localStorage for specific collection.
  _clear() {
    var local = this.localStorage(),
      itemRe = new RegExp("^" + this.name + "-");

    // Remove id-tracking item (e.g., "foo").
    local.removeItem(this.name);

    // Match all data items (e.g., "foo-ID") and remove.
    for (var k in local) {
      if (itemRe.test(k)) {
        local.removeItem(k);
      }
    }

    this.records.length = 0;
  }

  // Size of localStorage.
  _storageSize() {
    return this.localStorage().length;
  }

  _itemName(id) {
    return this.name+"-"+id;
  }

}

Store.sync = function(method, model, options) {
  var store = result(model, "localStorage") || result(model.collection, "localStorage");

  var resp, errorMessage;

  var Promise = !!this.Promise && this.Promise;
  var promise = false;

  try {

    switch (method) {
      case "read":
        resp = model.id != undefined ? store.find(model) : store.findAll();
        break;
      case "create":
        resp = store.create(model);
        break;
      case "update":
        resp = store.update(model);
        break;
      case "delete":
        resp = store.destroy(model);
        break;
    }

  } catch(error) {
    if (error.code === 22 && store._storageSize() === 0)
      errorMessage = "Private browsing is unsupported";
    else
      errorMessage = error.message;
  }

  if (resp) {
    if (options && options.success) {
      options.success(resp);
    }
    if (Promise) {
      promise = Promise.resolve(resp);
    }

  }
  else {
    errorMessage = errorMessage ? errorMessage
                                : "Record Not Found";

    if (options && options.error) {
      options.error(errorMessage);
    }

    if (Promise)
      promise = Promise.reject(errorMessage);
  }

  // add compatibility with $.ajax
  // always execute callback for success and error
  if (options && options.complete) options.complete(resp);

  return promise;
};

export default Store;