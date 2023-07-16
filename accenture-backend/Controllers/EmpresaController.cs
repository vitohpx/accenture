using accenture_backend.DataContext;
using accenture_backend.Migrations;
using accenture_backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace accenture_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class EmpresaController : ControllerBase
    {
        private readonly ApiDbContext _dbContext;

        public EmpresaController(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetEmpresas()
        {
            var empresas = _dbContext.Empresas.ToList();
            return Ok(empresas);
        }

        [HttpGet("{cnpj}")]
        public IActionResult GetEmpresa(string cnpj)
        {
            var empresa = _dbContext.Empresas.FirstOrDefault(e => e.CNPJ == cnpj);
            if (empresa == null)
            {
                return NotFound();
            }
            return Ok(empresa);
        }

        [HttpPost]
        public IActionResult PostEmpresa(Empresa empresa)
        {
            _dbContext.Empresas.Add(empresa);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(GetEmpresa), new { cnpj = empresa.CNPJ }, empresa);
        }

        [HttpPut("{cnpj}")]
        public IActionResult PutEmpresa(string cnpj, Empresa empresa)
        {
            if (cnpj != empresa.CNPJ)
            {
                return BadRequest();
            }

            _dbContext.Entry(empresa).State = EntityState.Modified;
            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Empresas.Any(e => e.CNPJ == cnpj))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{cnpj}")]
        public IActionResult DeleteEmpresa(string cnpj)
        {
            var empresa = _dbContext.Empresas.FirstOrDefault(e => e.CNPJ == cnpj);
            if (empresa == null)
            {
                return NotFound();
            }

            _dbContext.Empresas.Remove(empresa);
            _dbContext.SaveChanges();

            return NoContent();
        }


        [HttpGet("{cnpj}/fornecedores")]
        public IActionResult GetFornecedoresByEmpresa(string cnpj)
        {

            var fornecedores = _dbContext.Fornecedores
                .Where(f => f.EmpresaCNPJ.Any(c => c == cnpj))
                .ToList();

            return Ok(fornecedores);
        }

    }
}
