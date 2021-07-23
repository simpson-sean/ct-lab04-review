import pool from "../utils/pool.js";

export default class bird_model {
    id;
    name;
    breed;
    age;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.breed = row.breed;
        this.age = row.age;

    }

    static async insert({ name, breed, age }) {
        const { rows } = await pool.query(
            'INSERT INTO birds (name, breed, age) VALUES ($1, $2, $3) RETURNING *', 
            [name, breed, age]
        );

        return new bird_model(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM birds WHERE id=$1', [id]);

        return new bird_model(rows[0]);

    }

    static async getAllBirds() {
        const { rows } = await pool.query('SELECT * FROM birds');

        return rows.map((row) => new bird_model(row));
        
    }

}