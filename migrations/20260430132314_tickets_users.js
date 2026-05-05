/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) 
{
  return knex.schema.createTable('tickets_users',(table)=>{
		table.increments('Id').primary(),
		table.string('user',70),
		table.string('password',150)
	});   
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) 
{
	return knex.schema.dropTable('tickets_users');  
};
