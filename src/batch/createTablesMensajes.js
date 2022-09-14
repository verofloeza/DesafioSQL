import { config } from '../utils/mensajes/config.js';
import knex from 'knex';

const knexCli = knex(config.db);

knexCli.schema.dropTableIfExists('mysqlMensajes')
    .then(()=>{
        knexCli.schema.createTable('MENSAJES', table => {
            table.increments('ME_ID').primary();
            table.string('ME_EMAIL', 250);
            table.string('ME_FECHA', 250);
            table.string('ME_MENSAJE', 250).notNullable();
        })
            .then(()=> console.log("Tabla Mensaje creada"))
            .catch(err=> {
                console.log(err); 
                throw err;
            })
            .finally(()=>{
                knexCli.destroy();
            });
        
    });
