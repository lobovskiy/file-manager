import FileManager from './components/FileManager.js';
import { parseExecArgs } from './utils.js';
import { EXEC_ARG_PARAMS } from './consts.js';


const { stdin, stdout, argv } = process;
const [execPath, appPath, ...execArgs] = argv;
const args = parseExecArgs(execArgs, EXEC_ARG_PARAMS.Prefix, EXEC_ARG_PARAMS.Separator);
const app = new FileManager(args, stdin, stdout);

app.start();
