using System.Text.Json.Serialization;

namespace Buutti_task_library.Models
{
    public class Book
    {
        [JsonPropertyName("id")]
        public int? Id { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("author")]
        public string Author { get; set; } = string.Empty;
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;
    }
}
