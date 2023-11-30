using System;
using System.ComponentModel.DataAnnotations;

namespace ToDo.WebAPI.Data
{
    public class ToDoTask
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
