import app from "./app.js";

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
});