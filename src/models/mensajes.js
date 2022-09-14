import { config } from '../utils/mensajes/config.js';
import knex from 'knex';

export class Mensajes {
    constructor(tableName){
        this.knexCli = knex(config.db);
        this.tableName = tableName;
    }

    async listarAll(){
        try {
            return await this.knexCli.from(this.tableName).select('*').orderBy('ME_ID', 'asc');
        } catch (error) {
            throw error;
        }
    }

    async insertar(obj){
        var date = new Date();
        obj ={
            ...obj,
            ME_FECHA: date.toLocaleString()
        }
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
