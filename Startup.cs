#region snippet_all
// Unused usings removed
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TodoApi.Models;

namespace TodoApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        readonly string MyAllowSpecificOrigins = "AllowSpecificOrigin";

        // This method gets called by the runtime. Use this method to add services to the 
        //container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(opt =>
                opt.UseInMemoryDatabase("TodoList"));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSwaggerGen();
            
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP 
        //request pipeline.
        #region snippet_configure
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for 
                // production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // app.UseDefaultFiles();
            // app.UseStaticFiles();
            app.UseHttpsRedirection();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");
            });
            app.UseCors(
                options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
            );
            app.UseMvc();
            
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                spa.UseAngularCliServer(npmScript: "start");
                spa.Options.StartupTimeout =
                    TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
                if (env.IsDevelopment())
                {
                    var proxyToSpaDevelopmentServer = Configuration.GetValue<string>("ProxyToSpaDevelopmentServer", null);
                    if (string.IsNullOrEmpty(proxyToSpaDevelopmentServer))
                    {
                        spa.UseAngularCliServer(npmScript: "start");
                        spa.Options.StartupTimeout =
                            TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
                    }
                    else
                    {
                        spa.UseProxyToSpaDevelopmentServer(proxyToSpaDevelopmentServer); // Use this instead to use the angular cli server
                    }
                }
            });
        }
        #endregion
    }
}
#endregion
