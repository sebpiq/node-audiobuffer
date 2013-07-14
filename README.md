AudioBuffer
=============

An implementation of [Web Audio API's AudioBuffer](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioBuffer) for node.js. Example :

```javascript
var myBuffer = new AudioBuffer(44100, [         // sample rate
  new Float32Array([0.1, 0.1, 0, -0.1, -0.1]),  // channel 1
  new Float32Array([-0.1, -0.1, 0, 0.1, 0.1])   // channel 2
])
```


Installation on Node.js
========================

You can install it with `npm` :

```
npm install AudioBuffer
```


API
=====

###AudioBuffer(sampleRate, data)

`sampleRate` is the sample-rate for the PCM audio data in samples per second.

`data` is an array containing the list of channels as `Float32Arrays`.


###AudioBuffer.zeros(sampleRate, channels, length)

Returns an `AudioBuffer` filled with zeros.