/**
 * @param {Object} params Params of function call
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export async function cd(params, ...args) {
  if (args.length !== 1) {
    params.onInvalidArgs();

    return;
  }

  const { locationService, onFinish } = params;
  const directoryPath = args[0];

  await locationService.goToDirectory(directoryPath).then(() => {
    onFinish();
  }).catch(() => {
    onFinish('Error: Couldn\'t find this directory');
  });
}
