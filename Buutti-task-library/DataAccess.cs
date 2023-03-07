using Buutti_task_library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buutti_task_library
{
    public class DataAccess
    {
        public static IEnumerable<Book> GetBooks()
        {
            var books = new List<Book>();

            return books;
        }

        public static void SaveBook(Book book)
        {

        }
    }
}
