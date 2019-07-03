using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddressListApi.Models;

namespace AddressListApi.Controllers
{
    [Route("api/addresslist")]
    [ApiController]
    public class AddressListController : ControllerBase
    {
        private readonly AddressListContext _context;

        public AddressListController(AddressListContext context)
        {
            _context = context;

            if (_context.AddressListItems.Count() == 0)
            {
                _context.AddressListItems.Add(new AddressListItem { Firstname = "Firstname", Lastname = "Lastname", City = "City" });
                _context.SaveChanges();
            }
        }
        // GET: api/AddressList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressListItem>>> GetAddressListItems()
        {
            return await _context.AddressListItems.ToListAsync();
        }

        // GET: api/AddressList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressListItem>> GetAddressListItem(long id)
        {
            var addressListItem = await _context.AddressListItems.FindAsync(id);

            if (addressListItem == null)
            {
                return NotFound();
            }

            return addressListItem;
        }

        // POST: api/AddressList
        [HttpPost]
        public async Task<ActionResult<AddressListItem>> PostAddressListItem(AddressListItem item)
        {
            _context.AddressListItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAddressListItem), new { id = item.Id }, item);
        }

        // PUT: api/AddressList/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddressListItem(long id, AddressListItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/AddressList/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddressListItem(long id)
        {
            var addressListItem = await _context.AddressListItems.FindAsync(id);

            if (addressListItem == null)
            {
                return NotFound();
            }

            _context.AddressListItems.Remove(addressListItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}