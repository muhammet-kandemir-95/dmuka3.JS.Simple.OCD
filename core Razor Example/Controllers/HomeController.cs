using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using core_Razor_Example.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace core_Razor_Example.Controllers
{
    public class HomeController : Controller
    {
        int pageRowCount = 10;

        public IActionResult Index([FromQuery]int pageIndex = 0)
        {
            ViewBag.PageCount = (Student.Database.Count / pageRowCount) + (Student.Database.Count % pageRowCount != 0 ? 1 : 0);
            ViewBag.PageIndex = pageIndex;
            return View(Student.Database.Skip(pageIndex * pageRowCount).Take(pageRowCount).ToList());
        }

        public IActionResult Edit([FromRoute]int id)
        {
            return View(Student.Database.First(o => o.Id == id));
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromRoute]int id, Student model)
        {
            model = JsonConvert.DeserializeObject<Student>(await new System.IO.StreamReader(this.Request.Body).ReadToEndAsync());

            var student = Student.Database.First(o => o.Id == id);
            student.Name = model.Name;
            student.Surname = model.Surname;
            student.Birthday = model.Birthday;
            student.Addresses = model.Addresses;

            return Ok();
        }

        [HttpPost]
        public IActionResult List([FromQuery]int pageIndex = 0)
        {
            return Json(new
            {
                pageCount = (Student.Database.Count / pageRowCount) + (Student.Database.Count % pageRowCount != 0 ? 1 : 0),
                rows = Student.Database.Skip(pageIndex * pageRowCount).Take(pageRowCount).Select(o => new
                {
                    id = o.Id,
                    name = o.Name,
                    surname = o.Surname,
                    birthday = o.Birthday.ToString("dd.MM.yyyy")
                }).ToList()
            });
        }

        [HttpDelete]
        public IActionResult Delete([FromRoute]int id)
        {
            Student.Database.Remove(Student.Database.First(o => o.Id == id));
            return Ok();
        }
    }
}
