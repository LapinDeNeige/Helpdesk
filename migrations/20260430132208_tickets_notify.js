/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) 
{
	return knex.schema.createTable('tickets_notify',(table)=>{
		table.increments('Id').primary(),
		table.string('notify_message',255),
		table.integer('notify_status'),
		table.integer('TicketsId').unsigned()
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
	return knex.schema.dropTable('tickets_notify');  
};
