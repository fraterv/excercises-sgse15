var assert = require("assert");
var Converter = require("./converter").Converter;
var c = new Converter();

console.log(c.hexToRgb('zzzzzz'));

describe('RGBToHex', function() {
    it('should return ffffff for (255, 255, 255)', function() {
        assert.equal(c.rgbToHex(255, 255, 255), 'ffffff');
    });
    it('should return 000000 for (0, 0, 0)', function() {
        assert.equal(c.rgbToHex(0, 0, 0), '000000');
    })
    it('should throw an error for (300, 300, 300)', function() {
        assert.throws(function() { c.rgbToHex(300, 300, 300); });
    })
    it('should throw an error for (-1, 0, 0)', function() {
        assert.throws(function() { c.rgbToHex(-1, 0, 0); });
    })
    it('should throw an error for (0, 0)', function() {
        assert.throws(function() { c.rgbToHex(0, 0); });
    })
    it('should throw an error for (0, 0, 0, 0)', function() {
        assert.throws(function() { c.rgbToHex(0, 0, 0, 0); });
    })
    it('should throw an error for (0.5, 0, 0)', function() {
        assert.throws(function() { c.rgbToHex(0.5, 0, 0); });
    })
});

describe('Hex2RGB', function() {
    var exceptions = [
        'zzzzzz',
        'ffffffff',
        'ffff',
        '-010000',
        null
    ];

    exceptions.forEach(function(test) {
        it('should throw an error for input ' + test, function() {
            assert.throws(function() { c.hexToRgb(test); });
        })
    });

    var ok = [
        {input: 'ffffff', expected: [255, 255, 255]},
        {input: '000000', expected: [0, 0, 0]}
    ];

    ok.forEach(function(test) {
        it('converts ' + test.input + ' to ' + test.expected, function() {
            assert.deepEqual(c.hexToRgb(test.input), test.expected);

        })
    });
});




/*
    it('should return [255, 255, 255] for ffffff', function() {
        assert.deepEqual(c.hexToRgb('ffffff'), [255, 255, 255]);
    });
    it('should return [0, 0, 0] for 000000', function() {
        assert.deepEqual(c.hexToRgb('000000'), [0, 0, 0]);
    });
    it('should throw an error for -010000', function() {
        assert.throws(function() { c.hexToRgb('-010000') });
    });
    it('should throw an error for missing arg', function() {
        assert.throws(function() { c.hexToRgb() });
    });
    it('should throw an error for ffff', function() {
        assert.throws(function() { c.hexToRgb('ffff') });
    });
    it('should throw an error for ffffffff', function() {
        assert.throws(function() { c.hexToRgb('ffffffff') });
    });
    it('should throw an error for zzzzzz', function() {
        assert.throws(function() { c.hexToRgb('zzzzzz') });
    });
*/
