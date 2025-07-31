using System;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var Context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to get StoreContext from service provider.");
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to get User Manager from service provider.");
        await SeedData(Context, userManager);
    }

    private static async Task SeedData(StoreContext context, UserManager<User> userManager)
    {
        context.Database.Migrate();

        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "bob@test.com",
                Email = "bob@test.com"
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new User
            {
                UserName = "admin@test.com",
                Email = "admin@test.com"
            };
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, ["Member","Admin"]);
        }

        if (context.Products.Any()) return;

        var products = new List<Product>
        {
            // Snowboards
            new() {
                Name = "Alpine Pro Speedster 2000",
                Description = "Professional-grade snowboard designed for advanced riders seeking maximum speed and control. Features carbon fiber construction with responsive flex pattern for aggressive all-mountain riding.",
                Price = 89900, // $899.00
                PictureUrl = "/images/products/sb-ang1.png",
                Brand = "Alpine",
                Type = "Boards",
                QuantityInStock = 15
            },
            new() {
                Name = "Alpine Green Thunder",
                Description = "All-terrain snowboard perfect for intermediate to advanced riders. Directional twin shape with medium flex for versatile performance in powder and groomed runs.",
                Price = 67500, // $675.00
                PictureUrl = "/images/products/sb-ang2.png",
                Brand = "Alpine",
                Type = "Boards",
                QuantityInStock = 22
            },
            new() {
                Name = "Burton Speed Rush 3",
                Description = "High-performance racing board engineered for carving and speed. Stiff flex and directional shape deliver unmatched edge hold and stability at high speeds.",
                Price = 79900, // $799.00
                PictureUrl = "/images/products/sb-core1.png",
                Brand = "Burton",
                Type = "Boards",
                QuantityInStock = 18
            },
            new() {
                Name = "Burton Super Board",
                Description = "Premium all-mountain snowboard crafted with sustainable materials. Bamboo core and recycled edges provide exceptional pop and environmental consciousness.",
                Price = 129900, // $1299.00
                PictureUrl = "/images/products/sb-core2.png",
                Brand = "Burton",
                Type = "Boards",
                QuantityInStock = 8
            },
            new() {
                Name = "K2 Whizzy Fast",
                Description = "Park and freestyle snowboard built for jumps, rails, and creative riding. True twin shape with soft-medium flex makes it perfect for progression and style.",
                Price = 54900, // $549.00
                PictureUrl = "/images/products/sb-react1.png",
                Brand = "K2",
                Type = "Boards",
                QuantityInStock = 35
            },
            new() {
                Name = "K2 Entry Board",
                Description = "Forgiving snowboard designed for new riders learning the basics. Soft flex and catch-free edges help build confidence while developing fundamental skills.",
                Price = 39900, // $399.00
                PictureUrl = "/images/products/sb-ts1.png",
                Brand = "K2",
                Type = "Boards",
                QuantityInStock = 45
            },

            // Winter Hats
            new() {
                Name = "Burton Blue Wool Beanie",
                Description = "Premium merino wool beanie with moisture-wicking properties and odor resistance. Classic fit with fold-over cuff for versatile styling and maximum warmth.",
                Price = 3499, // $34.99
                PictureUrl = "/images/products/hat-core1.png",
                Brand = "Burton",
                Type = "Hats",
                QuantityInStock = 78
            },
            new() {
                Name = "K2 Green Thermal Hat",
                Description = "Technical winter hat with fleece lining and wind-resistant outer shell. Perfect for skiing, snowboarding, and other winter activities.",
                Price = 4599, // $45.99
                PictureUrl = "/images/products/hat-react1.png",
                Brand = "K2",
                Type = "Hats",
                QuantityInStock = 92
            },
            new() {
                Name = "Volcom Purple Beanie",
                Description = "Stylish knit beanie with soft acrylic blend construction. Features embroidered logo and comfortable stretch fit for all-day wear.",
                Price = 2799, // $27.99
                PictureUrl = "/images/products/hat-react2.png",
                Brand = "Volcom",
                Type = "Hats",
                QuantityInStock = 156
            },

            // Winter Gloves
            new() {
                Name = "Alpine Blue Pro Gloves",
                Description = "Professional-grade ski gloves with Gore-Tex waterproof membrane and Thinsulate insulation. Reinforced palms and touchscreen compatible fingertips.",
                Price = 8999, // $89.99
                PictureUrl = "/images/products/glove-code1.png",
                Brand = "Alpine",
                Type = "Gloves",
                QuantityInStock = 64
            },
            new() {
                Name = "Alpine Green Winter Gloves",
                Description = "Versatile winter gloves with synthetic leather palms and fleece lining. Water-resistant coating and adjustable wrist straps for secure fit.",
                Price = 4999, // $49.99
                PictureUrl = "/images/products/glove-code2.png",
                Brand = "Alpine",
                Type = "Gloves",
                QuantityInStock = 87
            },
            new() {
                Name = "K2 Purple Performance Gloves",
                Description = "Women's ski gloves with stylish design and technical performance. Features breathable insulation and ergonomic pre-curved fingers.",
                Price = 6799, // $67.99
                PictureUrl = "/images/products/glove-react1.png",
                Brand = "K2",
                Type = "Gloves",
                QuantityInStock = 43
            },
            new() {
                Name = "Volcom Green Sustainable Gloves",
                Description = "Environmentally conscious winter gloves made from recycled materials. Maintains warmth and dexterity while reducing environmental impact.",
                Price = 5599, // $55.99
                PictureUrl = "/images/products/glove-react2.png",
                Brand = "Volcom",
                Type = "Gloves",
                QuantityInStock = 71
            },

            // Winter Boots
            new() {
                Name = "Volcom Red Adventure Boots",
                Description = "Heavy-duty winter boots built for extreme conditions. Insulated to -40°F with waterproof construction and aggressive tread pattern for superior traction.",
                Price = 24999, // $249.99
                PictureUrl = "/images/products/boot-redis1.png",
                Brand = "Volcom",
                Type = "Boots",
                QuantityInStock = 28
            },
            new() {
                Name = "Burton Red Mountain Boots",
                Description = "Professional mountaineering boots with crampon compatibility and insulated liner. Built for technical climbing and extreme alpine conditions.",
                Price = 45999, // $459.99
                PictureUrl = "/images/products/boot-core2.png",
                Brand = "Burton",
                Type = "Boots",
                QuantityInStock = 12
            },
            new() {
                Name = "Burton Purple Trail Boots",
                Description = "Versatile hiking and snow boots with waterproof breathable membrane. Comfortable for daily wear with excellent ankle support and traction.",
                Price = 17999, // $179.99
                PictureUrl = "/images/products/boot-core1.png",
                Brand = "Burton",
                Type = "Boots",
                QuantityInStock = 35
            },
            new() {
                Name = "Alpine Purple Expedition Boots",
                Description = "Extreme cold weather boots rated for harsh winter conditions. Double insulation system and moisture management keep feet warm and dry.",
                Price = 32999, // $329.99
                PictureUrl = "/images/products/boot-ang2.png",
                Brand = "Alpine",
                Type = "Boots",
                QuantityInStock = 19
            },
            new() {
                Name = "Alpine Blue Winter Boots",
                Description = "Stylish winter boots combining fashion and function. Waterproof leather upper with cozy fleece lining and slip-resistant sole.",
                Price = 14999, // $149.99
                PictureUrl = "/images/products/boot-ang1.png",
                Brand = "Alpine",
                Type = "Boots",
                QuantityInStock = 52
            }
        };

        context.Products.AddRange(products);
        context.SaveChanges();
    }
}