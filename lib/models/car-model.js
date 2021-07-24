import pool from '../utils/pool.js';

export default class car_model {
    id;
    make;
    model;
    man_year;
    color;

    constructor(row) {
        this.id = row.id;
        this.make = row.make;
        this.model = row.model;
        this.man_year = row.man_year;
        this.color = row.color;
    };

    static async insert({ make, model, man_year, color }) {
        const { rows } = await pool.query(
            'INSERT INTO cars (make, model, man_year, color) VALUES ($1, $2, $3, $4) RETURNING *',
            [make, model, man_year, color]
        );

        return new car_model(rows[0]);
    };

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
        
        return new car_model(rows[0]);
    };

    static async getAllCars() {
        const { rows } = await pool.query('SELECT * FROM cars');

        return rows.map((row) => new car_model(row));
    };
    
    
}; // <--- END PARENT CODE BLOCK