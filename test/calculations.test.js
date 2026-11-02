'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const c = require('../lib/calculations');
test('dew point follows the Magnus approximation', () => {
  assert.ok(Math.abs(c.dewPoint(20, 50).dew_point_c - 9.26) < 0.1);
});
test('surface margin is positive when the surface is above dew point', () => {
  assert.ok(Math.abs(c.moistureContext(20, 50, 12).condensation_margin_c - 2.74) < 0.1);
});
test('risk condition respects the configured minimum margin', () => {
  assert.equal(c.condensationRisk(20, 80, 15, 2), true);
  assert.equal(c.condensationRisk(20, 40, 15, 1), false);
});
test('invalid indoor temperature and humidity are rejected', () => {
  assert.throws(() => c.dewPoint(20, 0));
  assert.throws(() => c.dewPoint(200, 50));
});
