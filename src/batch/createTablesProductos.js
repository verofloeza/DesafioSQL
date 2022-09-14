import { config } from '../utils/productos/config.js';
import knex from 'knex';

const knexCli = knex(config.db);

knexCli.schema.dropTableIfExists('mysqlProductos')
    .then(()=>{
        knexCli.schema.createTable('PRODUCTOS', table => {
            table.increments('PR_ID').primary();
            table.string('PR_TITLE', 250).notNullable();
            table.integer('PR_PRICE');
            table.string('PR_THUMBNAILS', 250).notNullable();
        })
            .then(()=> console.log("Tabla creada"))
            .catch(err=> {
                console.log(err); 
                throw err;
            })
            .finally(()=>{
                knexCli.destroy();
            });
        
    });
