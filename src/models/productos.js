import { config } from '../utils/productos/config.js';
import knex from 'knex';

export class Productos {
    constructor(tableName){
        this.knexCli = knex(config.db);
        this.tableName = tableName;
    }

    async listarAll(){
        try {
            return await this.knexCli.from(this.tableName).select('*').orderBy('PR_ID', 'asc');
        } catch (error) {
            throw error;
        }
    }

    async insertar(obj){
        try {
            return await this.knexCli(this.tableName).insert(obj);
        } catch (error) {
            throw error;
        }
    }

    cerrarConexion(){
        this.knexCli.destroy();
    }

}
