import pool from '../utils/pool.js';

export default class guitar_model {
    id;
    manufacturer;
    strings;
    is_electric;

    constructor(row) {
        this.id = row.id;
        this.manufacturer = row.manufacturer;
        this.strings = row.strings;
        this.is_electric = row.is_electric;
    };

    static async insert({ manufacturer, strings, is_electric }) {
        const { rows } = await pool.query(
            'INSERT INTO guitars (manufacturer, strings, is_electric) VALUES ($1, $2, $3) RETURNING *',
            [manufacturer, strings, is_electric]
        
        );

        return new guitar_model(rows[0]);
    }
}; // <--- END OF PARENT CODE BLOCK