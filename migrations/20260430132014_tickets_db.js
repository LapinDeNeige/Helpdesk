/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) 
{
  return knex.schema.createTable('tickets',(table)=>
  {
		table.increments('Id').primary(),
		table.string('FIO',150),
		table.string('Email',90),
		table.integer('Number'),
		table.string('Problem',150),
		table.string('Description',255),
		table.string('Status',90),
		table.timestamp('Date')
	}); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) 
{
  return knex.schema.dropTable('tickets');
};
