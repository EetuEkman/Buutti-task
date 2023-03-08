using Buutti_task_library;
using Buutti_task_library.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Buutti_task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private SqliteDataAccess dataAccess;

        public BookController(IConfiguration configuration)
        {
            dataAccess = new SqliteDataAccess(configuration);
        }

        // GET: api/<BookController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Book> books;

            try
            {
                books = await dataAccess.GetBooks();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            var json = JsonSerializer.Serialize(books);

            return Content(json, "application/json", System.Text.Encoding.UTF8);
        }

        // POST api/<BookController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Book book)
        {
            try
            {
                await dataAccess.SaveBook(book);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok();
        }

        // PUT api/<BookController>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Book book)
        {
            if (book.Id is null)
            {
                return BadRequest("Book id is required.");
            }

            try
            {
                await dataAccess.UpdateBook(book);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok();
        }

        // DELETE api/<BookController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await dataAccess.DeleteBook(id);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok();
        }
    }
}
