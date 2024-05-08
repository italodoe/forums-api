import  express  from "express";
import  morgan  from "morgan";
import  cors  from "cors";

const app = express();


// middlewares
app.use(cors());
app.use(morgan("dev"))
app.use(express.json())

app.get("/", async(request, response)=>{
    response.status(200).json({ok: true, message: "hey, !2!"})
})

// const PORT = process.env.PORT;
const {PORT} = process.env;

app.listen(PORT, ()=>{
    console.log(`Forums API listening ar http://localhost:${PORT}`);
})