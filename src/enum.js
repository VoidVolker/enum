// Generated by CoffeeScript 2.7.0
var Enum, hasProp, nullObj;

import {
  isNumber,
  isString,
  isObject,
  isArray,
  typeGet
} from '@voidvolker/is';

hasProp = Object.prototype.hasOwnProperty;

nullObj = function() {
  return Object.create(null);
};

Enum = (function() {
  class Enum {
    constructor(pairs, arr, options = {}) {
      var i, key, len, opt, value;
      this.key = nullObj();
      this.value = nullObj();
      // In case of 2 arguments move 'options' from 'arr' (arr/obj and options)
      if (isObject(arr)) {
        options = arr;
        arr = null;
      }
      // In case of 1 or 2 arguments move 'arr' from 'obj' (arr, obj and arr; first case)
      if (isArray(pairs)) {
        arr = pairs;
        pairs = null;
      }
      opt = Object.assign({}, this.constructor.default, Enum.default, options);
      this.i = opt.i;
      if (opt.next) {
        this.next = opt.next;
      }
      // Process key-value pairs
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
      // Process keys with autoincrement
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

    // Enum initiated from global counter
    static new(obj, arr, options = {}) {
      var enm;
      // In case of 2 arguments move 'options' from 'arr' (arr/obj and options)
      if (isObject(arr)) {
        options = arr;
        arr = null;
      }
      if (!options.hasOwnProperty('i')) {
        // Set global counter
        options.i = this.i;
      }
      // Create new enum using global counter and this as constructor
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

  };

  Enum.default = {
    i: 0
  };

  Enum.prototype.next = Enum.next;

  // Index symbol for raw enums
  Enum.index = Symbol('i');

  // Global counter
  Enum.i = 0;

  return Enum;

}).call(this);

export default Enum;

export {
  Enum
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzIjpbInNyYy9lbnVtLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxRQUFUO0VBQW1CLFFBQW5CO0VBQTZCLFFBQTdCO0VBQXVDLE9BQXZDO0VBQWdELE9BQWhEO0NBQUEsTUFBQTs7QUFFQSxPQUFBLEdBQVUsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7QUFDM0IsT0FBQSxHQUFVLFFBQUEsQ0FBQSxDQUFBO1NBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkO0FBQUg7O0FBRUo7RUFBTixNQUFBLEtBQUE7SUFLSSxXQUFhLENBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYSxVQUFVLENBQUEsQ0FBdkIsQ0FBQTtBQUNqQixVQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtNQUFRLElBQUMsQ0FBQSxHQUFELEdBQU8sT0FBQSxDQUFBO01BQ1AsSUFBQyxDQUFBLEtBQUQsR0FBUyxPQUFBLENBQUEsRUFEakI7O01BSVEsSUFBRyxRQUFBLENBQVMsR0FBVCxDQUFIO1FBQ0ksT0FBQSxHQUFVO1FBQ1YsR0FBQSxHQUFNLEtBRlY7T0FKUjs7TUFTUSxJQUFHLE9BQUEsQ0FBUSxLQUFSLENBQUg7UUFDSSxHQUFBLEdBQU07UUFDTixLQUFBLEdBQVEsS0FGWjs7TUFJQSxHQUFBLEdBQU0sTUFBTSxDQUFDLE1BQVAsQ0FBYyxDQUFBLENBQWQsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUEvQixFQUF3QyxJQUFJLENBQUMsT0FBN0MsRUFBc0QsT0FBdEQ7TUFDTixJQUFDLENBQUEsQ0FBRCxHQUFLLEdBQUcsQ0FBQztNQUNULElBQW9CLEdBQUcsQ0FBQyxJQUF4QjtRQUFBLElBQUMsQ0FBQSxJQUFELEdBQVEsR0FBRyxDQUFDLEtBQVo7T0FmUjs7TUFrQlEsSUFBRyxLQUFIO1FBQ0ksS0FB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YUFBdUIsSUFBSSxJQUFKLENBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsT0FBaEIsQ0FBd0IsQ0FBQyxHQUF6QixDQUFBO0lBQXZCOztJQUVJLE9BQVQsT0FBUyxDQUFDLE1BQUQsQ0FBQTtBQUNkLFVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtNQUFRLElBQUEsR0FBTyxDQUFBO01BQ1AsS0FBQSxhQUFBOztRQUNJLElBQUcsUUFBQSxDQUFTLEtBQVQsQ0FBSDtVQUNJLElBQUksQ0FBQyxHQUFELENBQUosR0FBWSxNQURoQjs7TUFESjthQUdBLElBQUksSUFBSixDQUFNLElBQU47SUFMTTs7RUF6R2Q7O0VBRUksSUFBQyxDQUFBLE9BQUQsR0FDSTtJQUFBLENBQUEsRUFBRztFQUFIOztpQkE2RUosSUFBQSxHQUFNLElBQUksQ0FBQzs7O0VBR1gsSUFBQyxDQUFBLEtBQUQsR0FBUSxNQUFBLENBQU8sR0FBUDs7O0VBR1IsSUFBQyxDQUFBLENBQUQsR0FBSTs7Ozs7O0FBMkJSLE9BQUEsUUFBZTs7QUFDZixPQUFBO0VBQVMsSUFBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzTnVtYmVyLCBpc1N0cmluZywgaXNPYmplY3QsIGlzQXJyYXksIHR5cGVHZXQgfSBmcm9tICdAdm9pZHZvbGtlci9pcydcblxuaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbm51bGxPYmogPSAtPiBPYmplY3QuY3JlYXRlIG51bGxcblxuY2xhc3MgRW51bVxuXG4gICAgQGRlZmF1bHQ6XG4gICAgICAgIGk6IDBcblxuICAgIGNvbnN0cnVjdG9yOiAocGFpcnMsIGFyciwgb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAa2V5ID0gbnVsbE9iaigpXG4gICAgICAgIEB2YWx1ZSA9IG51bGxPYmooKVxuXG4gICAgICAgICMgSW4gY2FzZSBvZiAyIGFyZ3VtZW50cyBtb3ZlICdvcHRpb25zJyBmcm9tICdhcnInIChhcnIvb2JqIGFuZCBvcHRpb25zKVxuICAgICAgICBpZiBpc09iamVjdCBhcnJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcnJcbiAgICAgICAgICAgIGFyciA9IG51bGxcblxuICAgICAgICAjIEluIGNhc2Ugb2YgMSBvciAyIGFyZ3VtZW50cyBtb3ZlICdhcnInIGZyb20gJ29iaicgKGFyciwgb2JqIGFuZCBhcnI7IGZpcnN0IGNhc2UpXG4gICAgICAgIGlmIGlzQXJyYXkgcGFpcnNcbiAgICAgICAgICAgIGFyciA9IHBhaXJzXG4gICAgICAgICAgICBwYWlycyA9IG51bGxcblxuICAgICAgICBvcHQgPSBPYmplY3QuYXNzaWduIHt9LCBAY29uc3RydWN0b3IuZGVmYXVsdCwgRW51bS5kZWZhdWx0LCBvcHRpb25zXG4gICAgICAgIEBpID0gb3B0LmlcbiAgICAgICAgQG5leHQgPSBvcHQubmV4dCBpZiBvcHQubmV4dFxuXG4gICAgICAgICMgUHJvY2VzcyBrZXktdmFsdWUgcGFpcnNcbiAgICAgICAgaWYgcGFpcnNcbiAgICAgICAgICAgIGZvciBrZXksIHZhbHVlIG9mIHBhaXJzXG4gICAgICAgICAgICAgICAgaWYgaGFzUHJvcC5jYWxsIEB2YWx1ZSwgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvciBcIkVudW0gJyN7a2V5fTogI3t2YWx1ZX0nIHZhbHVlIGFscmVhZHkgZGVmaW5lZCBhczogJyN7QHZhbHVlW3ZhbHVlXX06ICN7dmFsdWV9J1wiXG4gICAgICAgICAgICAgICAgaWYgbm90IGlzTnVtYmVyIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IgJ09ubHkgbnVtYmVyIHR5cGUgZW51bSB2YWx1ZSBpcyBhbGxvd2VkOiAnICsgdmFsdWVcbiAgICAgICAgICAgICAgICBAa2V5W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIEB2YWx1ZVt2YWx1ZV0gPSBrZXlcbiAgICAgICAgICAgICAgICBAaSA9IHZhbHVlXG5cbiAgICAgICAgIyBQcm9jZXNzIGtleXMgd2l0aCBhdXRvaW5jcmVtZW50XG4gICAgICAgIGlmIGFyclxuICAgICAgICAgICAgZm9yIGtleSBpbiBhcnJcbiAgICAgICAgICAgICAgICBAbmV4dCgpIHdoaWxlIGhhc1Byb3AuY2FsbCBAdmFsdWUsIEBpLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICBpZiBub3QgaXNTdHJpbmcga2V5XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IgXCJPbmx5IHN0cmluZyBlbnVtIG5hbWUgaXMgYWxsb3dlZDogI3trZXl9PCN7dHlwZUdldCBrZXl9PlwiXG4gICAgICAgICAgICAgICAgaWYgaGFzUHJvcC5jYWxsIEBrZXksIGtleVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yIFwiRW51bSAnI3trZXl9OiAje0BpfScgbmFtZSBhbHJlYWR5IGRlZmluZWQgYXM6ICcje2tleX06ICN7QGtleVtrZXldfSdcIlxuICAgICAgICAgICAgICAgIEBrZXlba2V5XSA9IEBpXG4gICAgICAgICAgICAgICAgQHZhbHVlW0BpXSA9IGtleVxuICAgICAgICAgICAgQG5leHQoKVxuXG4gICAgZm9yS2V5czogKGNiLCB0aGlzQXJnKSAtPlxuICAgICAgICB0aGlzQXJnID0gdGhpc0FyZyBvciBAXG4gICAgICAgIGZvciBrZXkgb2YgQGtleVxuICAgICAgICAgICAgY2IuY2FsbCB0aGlzQXJnLCBrZXlcbiAgICAgICAgQFxuXG4gICAgZm9yVmFsdWVzOiAoY2IsIHRoaXNBcmcpIC0+XG4gICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnIG9yIEBcbiAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleVxuICAgICAgICAgICAgY2IuY2FsbCB0aGlzQXJnLCB2YWx1ZVxuICAgICAgICBAXG5cbiAgICBmb3JFYWNoOiAoY2IsIHRoaXNBcmcpIC0+XG4gICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnIG9yIEBcbiAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleVxuICAgICAgICAgICAgY2IuY2FsbCB0aGlzQXJnLCBrZXksIHZhbHVlXG4gICAgICAgIEBcblxuICAgIGtleXM6IC0+IGtleSBmb3Iga2V5IG9mIEBrZXlcblxuICAgIHZhbHVlczogLT4gdmFsdWUgZm9yIGtleSwgdmFsdWUgb2YgQGtleVxuXG4gICAgaGFzS2V5OiAoa2V5KSAtPiBoYXNQcm9wLmNhbGwgQGtleSwga2V5XG5cbiAgICBoYXNWYWx1ZTogKHZhbHVlKSAtPiBoYXNQcm9wLmNhbGwgQHZhbHVlLCB2YWx1ZVxuXG4gICAgcmF3OiAtPlxuICAgICAgICByYXdFbm0gPSBudWxsT2JqKClcbiAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleVxuICAgICAgICAgICAgcmF3RW5tW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgcmF3RW5tW3ZhbHVlXSA9IGtleVxuICAgICAgICByYXdFbm1bRW51bS5pbmRleF0gPSBAaVxuICAgICAgICByYXdFbm1cblxuICAgIG5leHQ6IEVudW0ubmV4dFxuXG4gICAgIyBJbmRleCBzeW1ib2wgZm9yIHJhdyBlbnVtc1xuICAgIEBpbmRleDogU3ltYm9sICdpJ1xuXG4gICAgIyBHbG9iYWwgY291bnRlclxuICAgIEBpOiAwXG5cbiAgICBAbmV4dDogLT4gQGkrK1xuXG4gICAgIyBFbnVtIGluaXRpYXRlZCBmcm9tIGdsb2JhbCBjb3VudGVyXG4gICAgQG5ldzogKG9iaiwgYXJyLCBvcHRpb25zID0ge30pIC0+XG4gICAgICAgICMgSW4gY2FzZSBvZiAyIGFyZ3VtZW50cyBtb3ZlICdvcHRpb25zJyBmcm9tICdhcnInIChhcnIvb2JqIGFuZCBvcHRpb25zKVxuICAgICAgICBpZiBpc09iamVjdCBhcnJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcnJcbiAgICAgICAgICAgIGFyciA9IG51bGxcbiAgICAgICAgIyBTZXQgZ2xvYmFsIGNvdW50ZXJcbiAgICAgICAgb3B0aW9ucy5pID0gQGkgaWYgbm90IG9wdGlvbnMuaGFzT3duUHJvcGVydHkgJ2knXG4gICAgICAgICMgQ3JlYXRlIG5ldyBlbnVtIHVzaW5nIGdsb2JhbCBjb3VudGVyIGFuZCB0aGlzIGFzIGNvbnN0cnVjdG9yXG4gICAgICAgIGVubSA9IG5ldyBAIG9iaiwgYXJyLCBvcHRpb25zXG4gICAgICAgIEBpID0gZW5tLmlcbiAgICAgICAgZW5tXG5cbiAgICBAcmF3OiAob2JqLCBhcnIsIG9wdGlvbnMpIC0+IG5ldyBAKG9iaiwgYXJyLCBvcHRpb25zKS5yYXcoKVxuXG4gICAgQGZyb21SYXc6IChyYXdFbm0pIC0+XG4gICAgICAgIGtleXMgPSB7fVxuICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiByYXdFbm1cbiAgICAgICAgICAgIGlmIGlzTnVtYmVyIHZhbHVlXG4gICAgICAgICAgICAgICAga2V5c1trZXldID0gdmFsdWVcbiAgICAgICAgbmV3IEAga2V5c1xuXG5cbmV4cG9ydCBkZWZhdWx0IEVudW1cbmV4cG9ydCB7IEVudW0gfVxuIl19
