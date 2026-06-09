/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) 
{
	return knex.schema.createTable('tickets_upload',(table)=>
  	{
		table.increments('id').primary(),
		table.string('Path',150),
		table.integer('ticketId').unsigned()
		.references('Id')
		.inTable('tickets')
		
	});  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) 
{
	return knex.schema.dropTable('tickets_upload');  
};
