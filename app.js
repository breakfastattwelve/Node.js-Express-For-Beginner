import express from 'express';
import chalk from 'chalk';
import createDebug from 'debug';
import morgan from 'morgan';
const debug = createDebug('app')
const app = express();
const port = 3000;


app.use(morgan('combined'));
// app.get ใช้จัดการเกี่ยวกับ request ที่เข้ามา
// ถ้าเข้ามาใน "/" จะตอบกลับผู้ใช้ยังไงดี ตอบใน {}
app.get("/", (req,res)=>{

    res.send('Hello borntoDev')

})

app.listen(port, ()=>{

    debug("Listening on port" + chalk.green(" : " +port));
})

