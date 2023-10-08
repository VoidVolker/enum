import { isNumber, isString, isObject, isArray, typeGet } from '@voidvolker/is'

hasProp = Object.prototype.hasOwnProperty
nullObj = -> Object.create null

class Enum

    @default:
        i: 0

    constructor: (pairs, arr, options = {}) ->
        @key = nullObj()
        @value = nullObj()

        # In case of 2 arguments move 'options' from 'arr' (arr/obj and options)
        if isObject arr
            options = arr
            arr = null

        # In case of 1 or 2 arguments move 'arr' from 'obj' (arr, obj and arr; first case)
        if isArray pairs
            arr = pairs
            pairs = null

        opt = Object.assign {}, @constructor.default, Enum.default, options
        @i = opt.i
        @next = opt.next if opt.next

        # Process key-value pairs
        if pairs
            for key, value of pairs
                if hasProp.call @value, value
                    throw new TypeError "Enum '#{key}: #{value}' value already defined as: '#{@value[value]}: #{value}'"
                if not isNumber value
                    throw new TypeError 'Only number type enum value is allowed: ' + value
                @key[key] = value
                @value[value] = key
                @i = value

        # Process keys with autoincrement
        if arr
            for key in arr
                @next() while hasProp.call @value, @i.toString()
                if not isString key
                    throw new TypeError "Only string enum name is allowed: #{key}<#{typeGet key}>"
                if hasProp.call @key, key
                    throw new TypeError "Enum '#{key}: #{@i}' name already defined as: '#{key}: #{@key[key]}'"
                @key[key] = @i
                @value[@i] = key
            @next()

    forKeys: (cb, thisArg) ->
        thisArg = thisArg or @
        for key of @key
            cb.call thisArg, key
        @

    forValues: (cb, thisArg) ->
        thisArg = thisArg or @
        for key, value of @key
            cb.call thisArg, value
        @

    forEach: (cb, thisArg) ->
        thisArg = thisArg or @
        for key, value of @key
            cb.call thisArg, key, value
        @

    keys: -> key for key of @key

    values: -> value for key, value of @key

    hasKey: (key) -> hasProp.call @key, key

    hasValue: (value) -> hasProp.call @value, value

    raw: ->
        rawEnm = nullObj()
        for key, value of @key
            rawEnm[key] = value
            rawEnm[value] = key
        rawEnm[Enum.index] = @i
        rawEnm

    next: Enum.next

    # Index symbol for raw enums
    @index: Symbol 'i'

    # Global counter
    @i: 0

    @next: -> @i++

    # Enum initiated from global counter
    @new: (obj, arr, options = {}) ->
        # In case of 2 arguments move 'options' from 'arr' (arr/obj and options)
        if isObject arr
            options = arr
            arr = null
        # Set global counter
        options.i = @i if not options.hasOwnProperty 'i'
        # Create new enum using global counter and this as constructor
        enm = new @ obj, arr, options
        @i = enm.i
        enm

    @raw: (obj, arr, options) -> new @(obj, arr, options).raw()

    @fromRaw: (rawEnm) ->
        keys = {}
        for key, value of rawEnm
            if isNumber value
                keys[key] = value
        new @ keys


export default Enum
export { Enum }
