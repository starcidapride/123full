using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tucuongbackend.Models;

namespace tucuongbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantsController : ControllerBase
    {
        private StarCiContext _context = new StarCiContext();

        // GET: api/Plants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlants()
        {
          if (_context.Plants == null)
          {
              return NotFound();
          }
            return await _context.Plants.ToListAsync();
        }

        // GET: api/Plants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlant(string id)
        {
          if (_context.Plants == null)
          {
              return NotFound();
          }
            var plant = await _context.Plants.FindAsync(id);

            if (plant == null)
            {
                return NotFound();
            }

            return plant;
        }

        // PUT: api/Plants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlant(string id, Plant plant)
        {
            if (id != plant.PlantId)
            {
                return BadRequest();
            }

            _context.Entry(plant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlantExists(id))
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

        // POST: api/Plants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Plant>> PostPlant(Plant plant)
        {
          if (_context.Plants == null)
          {
              return Problem("Entity set 'StarCiContext.Plants'  is null.");
          }
            _context.Plants.Add(plant);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PlantExists(plant.PlantId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPlant", new { id = plant.PlantId }, plant);
        }

        // DELETE: api/Plants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlant(string id)
        {
            if (_context.Plants == null)
            {
                return NotFound();
            }
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null)
            {
                return NotFound();
            }

            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlantExists(string id)
        {
            return (_context.Plants?.Any(e => e.PlantId == id)).GetValueOrDefault();
        }
    }
}
