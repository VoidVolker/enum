import { Enum } from '../src/enum.js'

describe 'Enum', =>
    describe 'constructor', =>
        describe 'accepts', =>

            table = [
                ['object, arr, options', [{ a: 0 }, ['b'], {}]]
                ['object, options', [{ a: 0, b: 1 }, {}]]
                ['arr, options', [[ 'a', 'b'], {}]]
                ['object, arr', [{ a: 0 }, ['b']]]
                ['object', [{ a: 0, b: 1 }]]
                ['arr', [[ 'a', 'b']]]
            ]

            table.forEach(  (arr) =>
                s = arr[0]
                args = arr[1]
                it s, =>
                    e = new Enum ...args
                    expect(e).toBeInstanceOf Enum
                    expect(e.key).toEqual { a: 0, b: 1 }
                    expect(e.value).toEqual { 0: 'a', 1: 'b' }
            )

        describe 'options', =>
            it 'index', =>
                i = 3
                arr = ['a', 'b']
                e = new Enum ['a', 'b'], i: i
                expect(e.i).toBe i + arr.length
                expect(e.key).toEqual { a: 3, b: 4 }
                expect(e.value).toEqual { 3: 'a', 4: 'b' }

            it 'next', =>
                i = 3
                multiplier = 3
                next = -> @i += multiplier
                arr = ['a', 'b']
                e = new Enum ['a', 'b'], { i: i, next: next }
                expect(e.i).toBe i + arr.length * multiplier
                expect(e.key).toEqual { a: 3, b: 6  }
                expect(e.value).toEqual { 3: 'a', 6: 'b' }

        describe 'throws', =>
            it 'if value repeats in pairs', =>
                t = => new Enum { a: 0, b: 0 }
                expect(t).toThrow TypeError

            it 'if value in pairs not a number', =>
                t = => new Enum { a: '0' }
                expect(t).toThrow TypeError

            it 'if name not a string in names list', =>
                t = => new Enum [0]
                expect(t).toThrow TypeError

            it 'if name repeats in names list', =>
                t = => new Enum ['a', 'a']
                expect(t).toThrow TypeError

    describe 'methods', =>
        describe 'dynamic', =>
            it 'forKeys()', =>
                e = new Enum { a: 0 }, ['b']
                keys = []
                e.forKeys (key) -> keys.push key
                expect(keys).toEqual ['a', 'b']

            it 'forValues()', =>
                e = new Enum { a: 0 }, ['b']
                values = []
                e.forValues (value) -> values.push value
                expect(values).toEqual [0, 1]

            it 'forEach()', =>
                e = new Enum { a: 0 }, ['b']
                pairs = []
                e.forEach (key, value) -> pairs.push [key, value]
                expect(pairs).toEqual [['a', 0], ['b', 1]]

            it 'keys()', =>
                e = new Enum { a: 0 }, ['b']
                keys = e.keys()
                expect(keys).toEqual ['a', 'b']

            it 'values()', =>
                e = new Enum { a: 0 }, ['b']
                values = e.values()
                expect(values).toEqual [0, 1]

            it 'hasKey()', =>
                e = new Enum { a: 0 }, ['b']
                expect(e.hasKey('a')).toEqual true
                expect(e.hasKey('b')).toEqual true

            it 'hasValue()', =>
                e = new Enum { a: 0 }, ['b']
                expect(e.hasValue(0)).toEqual true
                expect(e.hasValue(1)).toEqual true

        describe 'static', =>

            describe 'new()', =>
                it 'object, array', =>
                    Enum.i = 0
                    e = Enum.new { a: 0 }, ['b']
                    expect(e).toBeInstanceOf Enum
                    expect(e.i).toBe 2
                    expect(Enum.i).toBe 2
                    expect(e.key).toEqual { a: 0, b: 1 }
                    expect(e.value).toEqual { 0: 'a', 1: 'b' }

                it 'array, global i', =>
                    Enum.i = 0
                    e1 = Enum.new ['a', 'b']
                    e2 = Enum.new ['c', 'd']

                    expect(e1).toBeInstanceOf Enum
                    expect(e2).toBeInstanceOf Enum
                    expect(e1.i).toBe 2
                    expect(e2.i).toBe 4
                    expect(Enum.i).toBe 4
                    expect(e1.key).toEqual { a: 0, b: 1 }
                    expect(e2.key).toEqual { c: 2, d: 3 }
                    expect(e1.value).toEqual { 0: 'a', 1: 'b' }
                    expect(e2.value).toEqual { 2: 'c', 3: 'd' }

                it 'counter inheritance', =>
                    Enum.i = 123
                    class FooEnum extends Enum
                        @i = 0
                    e1 = FooEnum.new ['a', 'b']
                    e2 = FooEnum.new ['c', 'd']

                    expect(e1).toBeInstanceOf FooEnum
                    expect(e2).toBeInstanceOf FooEnum
                    expect(e1.i).toBe 2
                    expect(e2.i).toBe 4
                    expect(Enum.i).toBe 123
                    expect(FooEnum.i).toBe 4
                    expect(e1.key).toEqual { a: 0, b: 1 }
                    expect(e2.key).toEqual { c: 2, d: 3 }
                    expect(e1.value).toEqual { 0: 'a', 1: 'b' }
                    expect(e2.value).toEqual { 2: 'c', 3: 'd' }

                it 'options -> i', =>
                    Enum.i = 0
                    e1 = Enum.new ['a', 'b'], i: 3
                    e2 = Enum.new ['c', 'd']

                    expect(e1).toBeInstanceOf Enum
                    expect(e2).toBeInstanceOf Enum
                    expect(e1.i).toBe 5
                    expect(e2.i).toBe 7
                    expect(Enum.i).toBe 7
                    expect(e1.key).toEqual { a: 3, b: 4 }
                    expect(e2.key).toEqual { c: 5, d: 6 }
                    expect(e1.value).toEqual { 3: 'a', 4: 'b' }
                    expect(e2.value).toEqual { 5: 'c', 6: 'd' }

            it 'raw()', =>
                e = Enum.raw { a: 0 }, ['b']
                expect(e).toEqual { a: 0, b: 1, 0: 'a', 1: 'b', [Enum.index]: 2 }

            it 'fromRaw()', =>
                r = Enum.raw { a: 0 }, ['b']
                e = Enum.fromRaw r
                expect(e).toBeInstanceOf Enum
                expect(e.i).toBe 1
                expect(e.key).toEqual { a: 0, b: 1 }
                expect(e.value).toEqual { 0: 'a', 1: 'b' }
