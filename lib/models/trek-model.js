import pool from '../utils/pool.js';

export default class trek_model {
    id;
    name;
    species;
    faction;
    
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.species = row.species;
        this.faction = row.faction;
    };

    static async insert({ name, species, faction }) {
        const { rows } = await pool.query(
            'INSERT INTO trek (name, species, faction) VALUES ($1, $2, $3) RETURNING *',
            [name, species, faction]
        );

        return new trek_model(rows[0]);
    };

}; // <---  END PARENT CODE BLOCK