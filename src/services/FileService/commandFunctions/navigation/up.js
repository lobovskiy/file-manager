/**
 * @param {Object} params Params of function call
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export function up(params, ...args) {
  const { locationService, onInvalidArgs, onFinish } = params;

  if (args.length) {
    onInvalidArgs();

    return;
  }

  locationService.goUp();
  onFinish();
}
