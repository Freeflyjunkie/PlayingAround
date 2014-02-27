using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Owin.Hosting;
using Owin;

namespace KatanaDemo
{    
    using AppFunc = Func<IDictionary<string, object>, Task>;
    class Program
    {
        static void Main(string[] args)
        {
            string uri = "http://localhost:8080";

            using (WebApp.Start<Startup>(uri))
            {
                Console.WriteLine("Web Server Started");
                Console.ReadKey();
                Console.WriteLine("Web Server Stopping");
            }
        }
    }

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Piece of Middleware
            //app.Use(async (context, next) =>
            //{
            //    foreach (var pair in context.Environment)
            //    {
            //        Console.WriteLine("{0}: {1}", pair.Key, pair.Value);
            //    }

            //    await next();
            //});

            // Piece of Middleware
            app.Use(async (context, next) =>
            {
                Console.WriteLine("Requesting: {0}", context.Request.Path);
                await next();
                Console.WriteLine("Response: {0}", context.Response.StatusCode);
            });

            ConfigureWebApi(app);

            app.UseHelloWorld();

            //app.UseWelcomePage();

            //app.Run(ctx =>
            //{
            //    return ctx.Response.WriteAsync("Hello World");
            //});
        }

        private void ConfigureWebApi(IAppBuilder app)
        {
            // controls routing rules and serializers and formatters
            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new { id = RouteParameter.Optional });
            app.UseWebApi(config);
        }
    }

    public static class AppBuilderExtensions
    {
        public static void UseHelloWorld(this IAppBuilder app)
        {
            app.Use<HelloWorldComponent>();
        }
    }

    public class HelloWorldComponent
    {
        private AppFunc _next;
        public HelloWorldComponent(AppFunc next)
        {
            _next = next;
        }

        public Task Invoke(IDictionary<string, object> environment)
        {
            var response = environment["owin.ResponseBody"] as Stream;
            using (var writer = new StreamWriter(response))
            {
                return writer.WriteAsync("Hello!!");
            }
            //await _next(environment);
        }
    }
}
