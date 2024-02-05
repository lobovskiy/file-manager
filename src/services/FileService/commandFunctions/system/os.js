import { EOL, cpus, homedir, userInfo, arch } from 'node:os';


/**
 * @param {Object} params Params of function call
 * @param {LocationService} params.locationService service to operate with current location
 * @param {Function} params.onInvalidArgs callback called when arguments of the function call are invalid
 * @param {function(arg0?:string)} params.onFinish callback called when function execution is finished
 * @param {string[]} args arguments of the function call
 */
export function os(params, ...args) {
  if (args.length !== 1) {
    params.onInvalidArgs();

    return;
  }

  const { onFinish } = params;
  const param = args[0];

  switch (param) {
    case '--EOL':
      console.log(JSON.stringify(EOL));

      break;
    case '--cpus':
      console.log(cpus());

      break;
    case '--homedir':
      console.log(homedir());

      break;
    case '--username':
      console.log(userInfo().username);

      break;
    case '--architecture':
      console.log(arch());

      break;

    default:
      console.log('Invalid parameter of the "os" command. Try again.');
  }

  onFinish();
}
