using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ToDo.WebAPI.Data; // Add this using directive
using ToDo.WebAPI; // Add this using directive
using Xunit;

namespace IntegrationTests.Tests
{
    public class ToDoIntegrationTests
    {
        private TestServer _server;
        private HttpClient _client;

        public ToDoIntegrationTests()
        {
            SetUpClient();
        }

        private void SetUpClient()
        {
            var builder = new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services =>
                {
                    var context = new ToDoContext(new DbContextOptionsBuilder<ToDoContext>()
                        .UseSqlite("DataSource=:memory:")
                        .EnableSensitiveDataLogging()
                        .Options);

                    services.RemoveAll(typeof(ToDoContext));
                    services.AddSingleton(context);

                    context.Database.OpenConnection();
                    context.Database.EnsureCreated();

                    context.SaveChanges();

                    // Clear local context cache
                    foreach (var entity in context.ChangeTracker.Entries().ToList())
                    {
                        entity.State = EntityState.Detached;
                    }
                });

            _server = new TestServer(builder);
            _client = _server.CreateClient();
        }

        [Fact]
        public async Task TestYourIntegrationScenario()
        {
            // Add your integration test scenario here
            // For example:
            var response = await _client.GetAsync("/api/todo");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var content = await response.Content.ReadAsStringAsync();
            var tasks = JsonConvert.DeserializeObject<List<ToDoTask>>(content);
            tasks.Should().NotBeNull();
        }

        [Fact]
        public async Task TestAddTask()
        {
            var newTask = new ToDoTask
            {
                Description = "Test Task",
                IsCompleted = false,
                CreatedAt = DateTime.Now
            };

            var jsonString = JsonConvert.SerializeObject(newTask);
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/api/todo", httpContent);
            response.StatusCode.Should().Be(HttpStatusCode.Created);
        }

        [Fact]
        public async Task TestGetAllTasks()
        {
            // Add test data to the database
            var context = _server.Host.Services.GetRequiredService<ToDoContext>();
            context.Tasks.Add(new ToDoTask { Description = "Task 1", IsCompleted = false });
            context.Tasks.Add(new ToDoTask { Description = "Task 2", IsCompleted = true });
            context.SaveChanges();

            var response = await _client.GetAsync("/api/todo");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var content = await response.Content.ReadAsStringAsync();
            var tasks = JsonConvert.DeserializeObject<List<ToDoTask>>(content);
            tasks.Should().HaveCount(2);
        }

        [Fact]
        public async Task TestUpdateTask()
        {
            // Add test data to the database
            var context = _server.Host.Services.GetRequiredService<ToDoContext>();
            var task = new ToDoTask { Description = "Test Task", IsCompleted = false };
            context.Tasks.Add(task);
            context.SaveChanges();

            task.Description = "Updated Task";
            var jsonString = JsonConvert.SerializeObject(task);
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");

            var response = await _client.PutAsync($"/api/todo/{task.Id}", httpContent);
            response.StatusCode.Should().Be(HttpStatusCode.NoContent); // Change this line

            var updatedTask = await context.Tasks.FindAsync(task.Id);
            updatedTask.Description.Should().Be("Updated Task");
        }

        [Fact]
        public async Task TestDeleteTask()
        {
            // Add test data to the database
            var context = _server.Host.Services.GetRequiredService<ToDoContext>();
            var task = new ToDoTask { Description = "Task to be deleted", IsCompleted = false };
            context.Tasks.Add(task);
            context.SaveChanges();

            var response = await _client.DeleteAsync($"/api/todo/{task.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);

            var deletedTask = await context.Tasks.FindAsync(task.Id);
            deletedTask.Should().BeNull();
        }
    }
}
