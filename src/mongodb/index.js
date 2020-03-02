import {connect} from 'mongoose';
require('dotenv').config()
export default connect(process.env.conexiondb,{useNewUrlParser:true,useUnifiedTopology:true})
.then(db=>console.log(`db is running`))
.catch(err=>console.log(`el error  es ${err}`))