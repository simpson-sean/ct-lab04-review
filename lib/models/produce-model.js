import pool from '../utils/pool.js';

export default class produce_model {
    id;
    name;
    type;
    in_season;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.type = row.type;
        this.in_season = row.in_season;
    };

    static async insert({ name, type, in_season }) {
        const { rows } = await pool.query(
            'INSERT INTO produce (name, type, in_season) VALUES ($1, $2, $3) RETURNING *',
            [ name, type, in_season ]
        );

        return new produce_model(rows[0]);
    };

    static async getProduceById(id) {
        const { rows } = await pool.query('SELECT * FROM produce WHERE id=$1', [id]);

        return new produce_model(rows[0]);
    }

    static async getAllProduce() {
        const { rows } = await pool.query('SELECT * FROM produce');

        return rows.map((row) => new produce_model(row));
    }

    static async updateProduceById(id, { name, type, in_season }) {
        const existingProduce = await produce_model.getProduceById(id);
        const newProduce = name ?? existingProduce.name;
        const newType = type ?? existingProduce.type;
        const newInSeason = in_season ?? existingProduce.in_season;

        const { rows } = await pool.query(
            'UPDATE produce SET name=$1, type=$2, in_season=$3 WHERE id=$4 RETURNING *',
            [ newProduce, newType, newInSeason, id ]
        );

        return new produce_model(rows[0]);
    }

    static async deleteProduceById(id) {
        const { rows } = await pool.query(
            'DELETE FROM produce WHERE id=$1 RETURNING *', [id]
        );

        return new produce_model(rows[0]);
    }

}; // <--- END PARENT CODE BLOCK