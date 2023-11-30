using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDo.WebAPI.Data;
using ToDo.WebAPI.IServices;
using Microsoft.AspNetCore.Cors;

namespace ToDo.WebAPI.Controllers
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/todo")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoService _toDoService;

        public ToDoController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ToDoTask>>> GetAllTasks()
        {
            var tasks = await _toDoService.GetAllTasks();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoTask>> GetTaskById(int id)
        {
            var task = await _toDoService.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(ToDoTask task)
        {
            await _toDoService.AddTask(task);
            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, ToDoTask task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            var existingTask = await _toDoService.GetTaskById(id);
            if (existingTask == null)
            {
                return NotFound();
            }

            existingTask.Description = task.Description;
            existingTask.IsCompleted = task.IsCompleted;
            existingTask.CreatedAt = task.CreatedAt;

            await _toDoService.UpdateTask(existingTask);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _toDoService.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }

            await _toDoService.DeleteTask(id);

            return NoContent();
        }
    }
}
