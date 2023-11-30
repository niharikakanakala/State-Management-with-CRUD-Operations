using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.WebAPI.Data;

namespace ToDo.WebAPI.IServices
{
    public interface IToDoService
    {
        Task<List<ToDoTask>> GetAllTasks();
        Task<ToDoTask> GetTaskById(int id);
        Task AddTask(ToDoTask task);
        Task UpdateTask(ToDoTask task);
        Task DeleteTask(int id);

        // Additional CRUD operations for updating and deleting tasks can be defined here.
    }
}
