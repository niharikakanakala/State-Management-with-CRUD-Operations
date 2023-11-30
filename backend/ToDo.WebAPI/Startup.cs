using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using ToDo.WebAPI.Data;
using ToDo.WebAPI.IServices;
using ToDo.WebAPI.Services;

namespace ToDo.WebAPI
{
    public class Startup
    {
        public const string DatabaseFileName = "todo_database.db";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ToDoContext>(options =>
            {
                options.UseLazyLoadingProxies().UseSqlite($"Data Source={DatabaseFileName}");
            });

            services.AddTransient<IToDoService, ToDoService>();
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder => builder.WithOrigins("http://localhost:5000")
                                        .AllowAnyMethod()
                                        .AllowAnyHeader());
            });
        }

         public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseRouting();
            app.UseCors("AllowAllOrigins");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
