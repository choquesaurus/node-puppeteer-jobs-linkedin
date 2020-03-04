import  { gql } from 'apollo-server';
export default  gql`
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