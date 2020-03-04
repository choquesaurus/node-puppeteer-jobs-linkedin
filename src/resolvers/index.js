import Jobs from '../models/index'
export default  {
    Query:{
        Jobs:()=>Jobs.find()
    }
}