import FileManager from './components/FileManager/index.js';


const { stdin, stdout, argv } = process;
const [execPath, appPath, ...args] = argv;
const app = new FileManager(args, stdin, stdout);

app.start();
