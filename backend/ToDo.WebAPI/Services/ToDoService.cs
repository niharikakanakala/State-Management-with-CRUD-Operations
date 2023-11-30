using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDo.WebAPI.Data;
using ToDo.WebAPI.IServices;

namespace ToDo.WebAPI.Services
{
    public class ToDoService : IToDoService
    {
        private readonly ToDoContext _toDoContext;

        public ToDoService(ToDoContext toDoContext)
        {
            _toDoContext = toDoContext;
        }

        public async Task<List<ToDoTask>> GetAllTasks()
        {
            return await _toDoContext.Tasks.ToListAsync();
        }

        public async Task<ToDoTask> GetTaskById(int id)
        {
            return await _toDoContext.Tasks.FindAsync(id);
        }

        public async Task AddTask(ToDoTask task)
        {
            _toDoContext.Tasks.Add(task);
            await _toDoContext.SaveChangesAsync();
        }

        public async Task UpdateTask(ToDoTask task)
        {
            _toDoContext.Tasks.Update(task);
            await _toDoContext.SaveChangesAsync();
        }

        public async Task DeleteTask(int id)
        {
            var task = await _toDoContext.Tasks.FindAsync(id);
            if (task != null)
            {
                _toDoContext.Tasks.Remove(task);
                await _toDoContext.SaveChangesAsync();
            }
        }
    }
}
