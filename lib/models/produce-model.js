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
    }

}; // <--- END PARENT CODE BLOCK