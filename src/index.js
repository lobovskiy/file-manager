import LocationService from './components/LocationService/index.js';
import FileManager from './components/FileManager/index.js';


const { stdin, stdout, argv } = process;
const [execPath, appPath, ...args] = argv;

const locationService = new LocationService();
const app = new FileManager(args, stdin, stdout, locationService);

app.start();
