import FileManager from './components/FileManager.js';


const { stdin, stdout, argv } = process;
const [execPath, appPath, ...args] = argv;
const app = new FileManager(args, stdin, stdout);

app.start();
