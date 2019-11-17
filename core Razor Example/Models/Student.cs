using System;
using System.Collections.Generic;

namespace core_Razor_Example.Models
{
    public class Student
    {
        #region Variables
        public static List<Student> Database = new List<Student>();

        private static int __SId = 0;
        public int Id { get; private set; } = ++__SId;
        public string Name { get; set; } = "";
        public string Surname { get; set; } = "";
        public DateTime Birthday { get; set; } = DateTime.Now;
        public List<string> Addresses { get; set; } = new List<string>();
        #endregion

        #region Constructors
        static Student()
        {
            for (int i = 0; i < 106; i++)
            {
                Database.Add(new Student()
                {
                    Name = "Muhammet" + (i + 1),
                    Surname = "Kandemir" + (i + 1),
                    Birthday = new DateTime(1995, 8, 11).AddDays(i + 1),
                    Addresses = new List<string>()
                    {
                        "MuKa Address 1",
                        "MuKa Address 2",
                        "MuKa Address 3"
                    }
                });
            }
        }
        #endregion
    }
}