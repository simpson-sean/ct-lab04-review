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

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM trek WHERE id=$1', [id]);

        return new trek_model(rows[0]);
    };

    static async getAllCharacters() {
        const { rows } = await pool.query('SELECT * FROM trek');

        return rows.map((row) => new trek_model(row));
    }

    static async updateById(id, { name, species, faction }) {
        const existingCharacter = await trek_model.getById(id);
        const newName = name ?? existingCharacter.name;
        const newSpecies = species ?? existingCharacter.species;
        const newFaction = faction ?? existingCharacter.faction;

        const { rows } = await pool.query(
            'UPDATE trek SET name=$1, species=$2, faction=$3 WHERE id=$4 RETURNING *',
            [ newName, newSpecies, newFaction, id ]
        );

        return new trek_model(rows[0]);
    

    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM trek WHERE id=$1 RETURNING *',
            [id]
        );

        return new trek_model(rows[0]);
    }

}; // <---  END PARENT CODE BLOCK