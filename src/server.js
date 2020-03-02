import conexion from './mongodb/index'
import Jobs from './models/index'
import  { ApolloServer, gql } from 'apollo-server';
import  Init from './app';
import { Model } from 'mongoose';

let arr=[];
const typeDefs = gql`
  type Job {
    cargo:String
    logo:String
    empresa:String
    ubicacion:String
    status:String
  }
  type Query {
    Jobs: [Job]
  }
`;
const resolvers={
    Query:{
        Jobs:()=>Jobs.find()
    }
}
 class Application{
  constructor(){  
    this.server;
    this.loadData();
  }
  async loadData(){
      arr=await Init();
      Jobs.create(arr)
      this.server()
      this.start();
      console.log(`Datos disponibles : ${arr.length}`)
      //console.log(`Datos disponibles :D ${arr.length}`)
  }
   server(){
    this.server=new ApolloServer({typeDefs,resolvers})
  }
  start(){
    this.server.listen().then(({url})=>{     
   
      console.log(`🚀  Server ready at ${url}`);
      
    })
  }
}
new Application()