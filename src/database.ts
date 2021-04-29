import {connect} from 'mongoose'


export async function startConnection(){
   await connect('mongodb://localhost/fotos-galery-db',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    console.log('Database is connected')

}