var t;
t = Object.prototype.toString;
var isNumber = function (v) {
  return t.call(v) === '[object Number]' && Number(v).valueOf() == v;
};
var isString = function (v) {
  return t.call(v) === '[object String]';
};
var isArray = Array.isArray;
var isObject = function (v) {
  return t.call(v) === '[object Object]';
};
var typeGet = function (v) {
  return t.call(v).slice(8, -1);
};
var Enum, hasProp, nullObj;
hasProp = Object.prototype.hasOwnProperty;
nullObj = function () {
  return Object.create(null);
};
Enum = function () {
  class Enum {
    constructor(pairs, arr) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var i, key, len, opt, value;
      this.key = nullObj();
      this.value = nullObj();
      if (isObject(arr)) {
        options = arr;
        arr = null;
      }
      if (isArray(pairs)) {
        arr = pairs;
        pairs = null;
      }
      opt = Object.assign({}, this.constructor.default, Enum.default, options);
      this.i = opt.i;
      if (opt.next) {
        this.next = opt.next;
      }
      if (pairs) {
        for (key in pairs) {
          value = pairs[key];
          if (hasProp.call(this.value, value)) {
            throw new TypeError(`Enum '${key}: ${value}' value already defined as: '${this.value[value]}: ${value}'`);
          }
          if (!isNumber(value)) {
            throw new TypeError('Only number type enum value is allowed: ' + value);
          }
          this.key[key] = value;
          this.value[value] = key;
          this.i = value;
        }
      }
      if (arr) {
        for (i = 0, len = arr.length; i < len; i++) {
          key = arr[i];
          while (hasProp.call(this.value, this.i.toString())) {
            this.next();
          }
          if (!isString(key)) {
            throw new TypeError(`Only string enum name is allowed: ${key}<${typeGet(key)}>`);
          }
          if (hasProp.call(this.key, key)) {
            throw new TypeError(`Enum '${key}: ${this.i}' name already defined as: '${key}: ${this.key[key]}'`);
          }
          this.key[key] = this.i;
          this.value[this.i] = key;
        }
        this.next();
      }
    }
    forKeys(cb, thisArg) {
      var key;
      thisArg = thisArg || this;
      for (key in this.key) {
        cb.call(thisArg, key);
      }
      return this;
    }
    forValues(cb, thisArg) {
      var key, ref, value;
      thisArg = thisArg || this;
      ref = this.key;
      for (key in ref) {
        value = ref[key];
        cb.call(thisArg, value);
      }
      return this;
    }
    forEach(cb, thisArg) {
      var key, ref, value;
      thisArg = thisArg || this;
      ref = this.key;
      for (key in ref) {
        value = ref[key];
        cb.call(thisArg, key, value);
      }
      return this;
    }
    keys() {
      var key, results;
      results = [];
      for (key in this.key) {
        results.push(key);
      }
      return results;
    }
    values() {
      var key, ref, results, value;
      ref = this.key;
      results = [];
      for (key in ref) {
        value = ref[key];
        results.push(value);
      }
      return results;
    }
    hasKey(key) {
      return hasProp.call(this.key, key);
    }
    hasValue(value) {
      return hasProp.call(this.value, value);
    }
    raw() {
      var key, rawEnm, ref, value;
      rawEnm = nullObj();
      ref = this.key;
      for (key in ref) {
        value = ref[key];
        rawEnm[key] = value;
        rawEnm[value] = key;
      }
      rawEnm[Enum.index] = this.i;
      return rawEnm;
    }
    static next() {
      return this.i++;
    }
    static new(obj, arr) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var enm;
      if (isObject(arr)) {
        options = arr;
        arr = null;
      }
      if (!options.hasOwnProperty('i')) {
        options.i = this.i;
      }
      enm = new this(obj, arr, options);
      this.i = enm.i;
      return enm;
    }
    static raw(obj, arr, options) {
      return new this(obj, arr, options).raw();
    }
    static fromRaw(rawEnm) {
      var key, keys, value;
      keys = {};
      for (key in rawEnm) {
        value = rawEnm[key];
        if (isNumber(value)) {
          keys[key] = value;
        }
      }
      return new this(keys);
    }
  }
  Enum.default = {
    i: 0
  };
  Enum.prototype.next = Enum.next;
  Enum.index = Symbol('i');
  Enum.i = 0;
  return Enum;
}.call(this);
var Enum$1 = Enum;
export { Enum, Enum$1 as default };

//# sourceMappingURL=enum.bundle.js.map