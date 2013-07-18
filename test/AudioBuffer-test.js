var assert = require('assert')
  , _ = require('underscore')
  , AudioBuffer = require('../lib/AudioBuffer')

describe('AudioBuffer', function() {

  it('should be created with the right attributes', function() {
    var ab = new AudioBuffer(3, 100, 44100)
      , data1 = ab.getChannelData(0)
      , data2 = ab.getChannelData(1)
      , data3 = ab.getChannelData(2)

    assert.equal(ab.sampleRate, 44100)
    assert.equal(ab.length, 100)
    assert.equal(ab.numberOfChannels, 3)
    _.toArray(data1).forEach(function(val) { assert.equal(val, 0) })
    _.toArray(data2).forEach(function(val) { assert.equal(val, 0) })
    _.toArray(data3).forEach(function(val) { assert.equal(val, 0) })
    assert.equal(data1.length, 100)
    assert.equal(data2.length, 100)
    assert.equal(data3.length, 100)
  })

  it('should throw an error with invalid creation arguments', function() {
    assert.throws(function() { new AudioBuffer('a', 100, 44100) })
    assert.throws(function() { new AudioBuffer(3, -1, 44100) })
    assert.throws(function() { new AudioBuffer(3, 100, 'rr') })
  })

  describe('getChannelData', function() {

    it('should return valid channels', function() {
      var ab = new AudioBuffer(2, 3, 44100)
      assert.equal(ab.getChannelData(0), ab._data[0])
      assert.equal(ab.getChannelData(1), ab._data[1])
    })

    it('should throw an error if the channel is not valid', function() {
      var ab = new AudioBuffer(2, 3, 44100)
      assert.throws(function() { ab.getChannelData(2) })
    })

  })

  describe('filledWithVal', function() {

    it('should return a buffer with the value given', function() {
      var ab = AudioBuffer.filledWithVal(111, 4, 200, 44100)
        , data1 = ab.getChannelData(0)
        , data2 = ab.getChannelData(1)
        , data3 = ab.getChannelData(2)

      assert.equal(ab.sampleRate, 44100)
      assert.equal(ab.length, 200)
      assert.equal(ab.numberOfChannels, 4)
      _.toArray(data1).forEach(function(val) { assert.equal(val, 111) })
      _.toArray(data2).forEach(function(val) { assert.equal(val, 111) })
      _.toArray(data3).forEach(function(val) { assert.equal(val, 111) })
      assert.equal(data1.length, 200)
      assert.equal(data2.length, 200)
      assert.equal(data3.length, 200)
    })

  })

  describe('fromArray', function() {

    it('should create an AudioBuffer from an array of arrays', function() {
      var array = [
        [1, 2, 3, 4],
        [11, 22, 33, 44],
        [111, 222, 333, 444]
      ]
      var ab = AudioBuffer.fromArray(array, 44100)
      assert.equal(ab.numberOfChannels, 3)
      assert.equal(ab.sampleRate, 44100)
      assert.equal(ab.length, 4)
      for (var i = 0; i < 3; i++)
        assert.ok(ab.getChannelData(i) instanceof Float32Array)
      assert.deepEqual(_.toArray(ab.getChannelData(0)), [1, 2, 3, 4])
      assert.deepEqual(_.toArray(ab.getChannelData(1)), [11, 22, 33, 44])
      assert.deepEqual(_.toArray(ab.getChannelData(2)), [111, 222, 333, 444])
    })

    it('should create an AudioBuffer from an array of Float32Array', function() {
      var array = [
        new Float32Array([1, 2, 3, 4]),
        new Float32Array([11, 22, 33, 44]),
        new Float32Array([111, 222, 333, 444])
      ]
      var ab = AudioBuffer.fromArray(array, 44100)
      assert.equal(ab.numberOfChannels, 3)
      assert.equal(ab.sampleRate, 44100)
      assert.equal(ab.length, 4)
      for (var i = 0; i < 3; i++)
        assert.ok(ab.getChannelData(i) instanceof Float32Array)
      assert.deepEqual(_.toArray(ab.getChannelData(0)), [1, 2, 3, 4])
      assert.deepEqual(_.toArray(ab.getChannelData(1)), [11, 22, 33, 44])
      assert.deepEqual(_.toArray(ab.getChannelData(2)), [111, 222, 333, 444])
    })

  })

  describe('slice', function() {

    it('should slice properly all channels', function() {
      var sliced
        , ab = AudioBuffer.fromArray([
          [1, 2, 3, 4, 5],
          [11, 22, 33, 44, 55],
          [111, 222, 333, 444, 555]
        ], 22050)
      slice = ab.slice(0)
      assert.equal(slice.length, 5)
      assert.equal(slice.numberOfChannels, 3)
      assert.equal(slice.sampleRate, 22050)
      assert.deepEqual(_.toArray(slice.getChannelData(0)), [1, 2, 3, 4, 5])
      assert.deepEqual(_.toArray(slice.getChannelData(1)), [11, 22, 33, 44, 55])
      assert.deepEqual(_.toArray(slice.getChannelData(2)), [111, 222, 333, 444, 555])

      slice = ab.slice(3)
      assert.equal(slice.length, 2)
      assert.equal(slice.numberOfChannels, 3)
      assert.equal(slice.sampleRate, 22050)
      assert.deepEqual(_.toArray(slice.getChannelData(0)), [4, 5])
      assert.deepEqual(_.toArray(slice.getChannelData(1)), [44, 55])
      assert.deepEqual(_.toArray(slice.getChannelData(2)), [444, 555])

      slice = ab.slice(1, 3)
      assert.equal(slice.length, 2)
      assert.equal(slice.numberOfChannels, 3)
      assert.equal(slice.sampleRate, 22050)
      assert.deepEqual(_.toArray(slice.getChannelData(0)), [2, 3])
      assert.deepEqual(_.toArray(slice.getChannelData(1)), [22, 33])
      assert.deepEqual(_.toArray(slice.getChannelData(2)), [222, 333])
    })

  })

})