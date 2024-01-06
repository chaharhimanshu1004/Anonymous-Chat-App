
const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/UserRoute');
const PORT = process.env.PORT || 6001;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Running !!!');
});

mongoose.connect(process.env.MONGO_URI,
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

app.use('/api/users',userRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on : ${PORT}`);
})
