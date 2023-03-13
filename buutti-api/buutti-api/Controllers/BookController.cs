using Buutti_task_library;
using Buutti_task_library.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace buutti_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private PostgresqlDataAccess dataAccess;

        public BookController(IConfiguration configuration)
        {
            dataAccess = new PostgresqlDataAccess(configuration);
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Book book)
        {
            if (book.Id is null)
            {
                ModelState.AddModelError("Id", "Book id is required.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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
