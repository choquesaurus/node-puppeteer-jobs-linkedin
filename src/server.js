import conexion from './mongodb/index'
import Jobs from './models/index'
import  { ApolloServer } from 'apollo-server';
import  Init from './app';

import typeDefs from './typedefs/index'
import resolvers from './resolvers/index'

let arr=[];
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