using MyAddressBook.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyAddressBook.Controllers
{
    public class JQueryUIController : Controller
    {
        AddressBookContext _db = new AddressBookContext();

        //
        // GET: /JQueryUI/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAddressBooks(string term)
        {
          var addressbooks = _db.AddressBooks
                                    .Where(ab => ab.Description.Contains(term))
                                    .Select(ab => new { label = ab.Description });
            return Json(addressbooks, JsonRequestBehavior.AllowGet);
        }
	}
}