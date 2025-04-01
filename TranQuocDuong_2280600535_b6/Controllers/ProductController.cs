using Microsoft.AspNetCore.Mvc;
using TranQuocDuong_2280600535_b6.Models;

namespace TranQuocDuong_2280600535_b6.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
