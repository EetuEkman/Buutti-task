using Buutti_task_library.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Buutti_task_library
{
    public class PostgresqlDataAccess
    {
        private readonly IConfiguration configuration;

        public PostgresqlDataAccess(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<List<Book>> GetBooks()
        {
            var connectionString = configuration.GetConnectionString("BookDb");

            using (var connection = new NpgsqlConnection(connectionString))
            {
                var query = "SELECT * FROM books;";

                var books = (await connection.QueryAsync<Book>(query)).ToList();

                return books;
            }
        }

        public async Task SaveBook(Book book)
        {
            var connectionString = configuration.GetConnectionString("BookDb");

            using (var connection = new NpgsqlConnection(connectionString))
            {
                var query = "INSERT INTO books (title, author, description) " +
                    "VALUES (@Title, @Author, @Description);";

                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("Title", book.Title, System.Data.DbType.String, System.Data.ParameterDirection.Input);
                dynamicParameters.Add("Author", book.Author, System.Data.DbType.String, System.Data.ParameterDirection.Input);
                dynamicParameters.Add("Description", book.Description, System.Data.DbType.String, System.Data.ParameterDirection.Input);

                await connection.ExecuteAsync(query, dynamicParameters);
            }
        }

        public async Task UpdateBook(Book book)
        {
            var connectionString = configuration.GetConnectionString("BookDb");

            using (var connection = new NpgsqlConnection(connectionString))
            {
                var query = $@"UPDATE books
                SET title = @Title, author = @Author, description = @Description 
                WHERE id = @Id";

                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("Id", book.Id, System.Data.DbType.Int64, System.Data.ParameterDirection.Input);
                dynamicParameters.Add("Title", book.Title, System.Data.DbType.String, System.Data.ParameterDirection.Input);
                dynamicParameters.Add("Author", book.Author, System.Data.DbType.String, System.Data.ParameterDirection.Input);
                dynamicParameters.Add("Description", book.Description, System.Data.DbType.String, System.Data.ParameterDirection.Input);

                await connection.ExecuteAsync(query, dynamicParameters);
            }
        }

        public async Task DeleteBook(int id)
        {
            var connectionString = configuration.GetConnectionString("BookDb");

            using (var connection = new NpgsqlConnection(connectionString))
            {
                var query = "DELETE FROM books WHERE id = @Id";

                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("Id", id, System.Data.DbType.Int64, System.Data.ParameterDirection.Input);

                await connection.ExecuteAsync(query, dynamicParameters);
            }
        }
    }
}
