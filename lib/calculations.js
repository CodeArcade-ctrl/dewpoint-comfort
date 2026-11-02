'use strict';
function indoorTemperature(value, name) {
  if (!Number.isFinite(value) || value < -80 || value > 100) throw new Error(`${name} must be between -80 and 100 °C.`);
  return value;
}
function humidity(value) {
  if (!Number.isFinite(value) || value <= 0 || value > 100) throw new Error('Relative humidity must be greater than 0 and at most 100%.');
  return value;
}
function dewPoint(roomTempC, humidityPercent) {
  const temp = indoorTemperature(roomTempC, 'Room temperature');
  const rh = humidity(humidityPercent);
  const gamma = Math.log(rh / 100) + (17.62 * temp) / (243.12 + temp);
  const dewPointC = (243.12 * gamma) / (17.62 - gamma);
  return { dew_point_c: dewPointC };
}
function moistureContext(roomTempC, humidityPercent, surfaceTempC) {
  const dew = dewPoint(roomTempC, humidityPercent).dew_point_c;
  const surface = indoorTemperature(surfaceTempC, 'Surface temperature');
  return { dew_point_c: dew, condensation_margin_c: surface - dew };
}
function condensationRisk(roomTempC, humidityPercent, surfaceTempC, minimumMarginC) {
  if (!Number.isFinite(minimumMarginC) || minimumMarginC < 0 || minimumMarginC > 30) throw new Error('Minimum margin must be between 0 and 30 °C.');
  return moistureContext(roomTempC, humidityPercent, surfaceTempC).condensation_margin_c <= minimumMarginC;
}
function humidityAbove(humidityPercent, thresholdPercent) {
  const rh = humidity(humidityPercent);
  if (!Number.isFinite(thresholdPercent) || thresholdPercent < 0 || thresholdPercent > 100) throw new Error('Humidity threshold must be between 0 and 100%.');
  return rh >= thresholdPercent;
}
module.exports = { dewPoint, moistureContext, condensationRisk, humidityAbove };
