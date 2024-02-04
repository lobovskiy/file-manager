import FileManager from './components/FileManager.js';


const { stdin, stdout, argv } = process;
const app = new FileManager(argv, stdin, stdout);

app.welcome();
