using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using tucuongbackend.Models;

namespace tucuongbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {

        // thêm 2 thằng dưới đây vào
        //
        private readonly IConfiguration _config;
        public AccountsController(IConfiguration config)
        {
            _config = config;
        }
        //

        // sửa dòng này
        //private readonly StarCiContext _context;
        //public AccountsController(StarCiContext context)
        //{
        //    _context = context;
        //}


        private StarCiContext _context = new StarCiContext();

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            return await _context.Accounts.ToListAsync();
        }

        private string GetCurrentEmail()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                Console.Write(userClaims.Count());

                foreach (var claim in userClaims)
                {
                    Console.WriteLine(claim.ToString());
                }

                return userClaims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            }
            return null;
        }


        // xác thực bởi token, và sẽ lấy body token ra làm dữ diệu 
        [Authorize]
        [HttpGet("Launch")]
        public async Task<ActionResult<Account>> Launch()
        {   
            var extractedEmail = GetCurrentEmail();

            if (extractedEmail == null) return NotFound("Token hết hạn");

            var result = await _context.Accounts.FirstOrDefaultAsync(row => row.Email == extractedEmail);

            return Ok(result);
        }


        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(string id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(string id, Account account)
        {
            if (id != account.Email)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // đăng nhập thì phải xài post, post nó sẽ có body của request, get thì không có body
        // body là nội dung của request,

        // là đánh dấu hàm dưới sẽ xử lý  cho http post

        public class SignInBody
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class SignInResponse
        {
            public Account Account { get; set; }
            public string AccessToken { get; set; }
        }

        // tạo ra token dựa trên account
        private string GenerateToken(Account account)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // claim này dựa trên email trong tham số account
            var claims = new List<Claim>
            {
                new Claim("email", account.Email)
            };

            // tạo ra token
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                // có thời gian chết, 15 phút
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // cho phép nặc danh, ai cũng có thể gọi vào route này mà không cần jwt
        [AllowAnonymous]
        [HttpPost("SignIn")]
        // dòng Task<ActionResult<Account>> hơi dài, nhưng mà ta chỉ cần để ý tới cái trong cùng, tức là Account
        // hàm này sẽ trả về 1 cái tài khoản
        public async Task<ActionResult<SignInResponse>> SignIn(SignInBody body)
        {
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'StarCiContext.Accounts'  is null.");
            }

            //Account là cái bảng Account trong db
            //First Or Default Async là hàm tìm cái đầu tiên trong db, nếu có thì trả về Account, còn nếu không trả về null
            var result = await _context.Accounts.FirstOrDefaultAsync(

                // code trong xanh là cây
                // sẽ kiểm tra mỗi row trong cái bảng Account
                // nếu thuộc tính email của nó == thuộc tính email trong body + thuộc tính password của nó == thuộc tính password trong body
                // thì sẽ trả về cái row đó => LINQ 
                row =>
                row.Email == body.Email && row.Password == body.Password
                //
                );

            if (result != null)
                // trả về mã 200, và với kết quả thành công
                return Ok( new SignInResponse()
                {
                    Account = result,

                    // tạo ra accessToken dựa trên tài khoản
                    AccessToken = GenerateToken(result)
                });

            // trả về mã lỗi 404
            return NotFound("The account is not existed");
        }



        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754        

        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {

            if (_context.Accounts == null)
            {
                return Problem("Entity set 'StarCiContext.Accounts'  is null.");
            }
            _context.Accounts.Add(account);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountExists(account.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.Email }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(string id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(string id)
        {
            return (_context.Accounts?.Any(e => e.Email == id)).GetValueOrDefault();
        }
    }
}
