import app from "./app"; 
import Configuration from "./config";
import Constant from "./constant";

app.listen(Configuration.serverPort , () => console.log(Constant.messages.serverUp))