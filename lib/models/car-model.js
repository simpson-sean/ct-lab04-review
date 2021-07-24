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
    
    static async updateById(id, { make, model, man_year, color }) {
        const existingCar = await car_model.getById(id);
        const newMake = make ?? existingCar.make;
        const newModel = model ?? existingCar.model;
        const newManYear = man_year ?? existingCar.man_year;
        const newColor = color ?? existingCar.color;

        console.log(existingCar, newMake, );

        const { rows } = await pool.query(
            'UPDATE cars SET make=$1, model=$2, man_year=$3, color=$4 WHERE id=$5 RETURNING *',
            [ newMake, newModel, newManYear, newColor, id ]

        );

        console.log(newMake);

        return new car_model(rows[0]);
    }

    static async deleteById(id) {
        const {rows} = await pool.query(
            'DELETE FROM cars WHERE id=$1 RETURNING *',
            [id]
        );

        return new car_model(rows[0]);

    }
    
}; // <--- END PARENT CODE BLOCK