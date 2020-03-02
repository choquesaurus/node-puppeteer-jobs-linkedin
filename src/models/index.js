import {Schema,model} from 'mongoose';
export default model('jobs',new Schema({
    cargo:String,
    logo:String,
    empresa:String,
    ubicacion:String,
    status:String
},{collection:'jobs'}))
