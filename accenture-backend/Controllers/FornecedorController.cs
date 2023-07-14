using accenture_backend.DataContext;
using accenture_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using System.Text;

namespace accenture_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedorController : ControllerBase
    {
        private readonly ApiDbContext _dbContext;

        public FornecedorController(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetFornecedores()
        {

            try
            {
                var fornecedores = _dbContext.Fornecedores.ToList();
                var json = JsonConvert.SerializeObject(fornecedores);

                if (fornecedores.Count == 0)
                {
                    return NotFound("Nenhum fornecedor encontrado.");
                }
                var jsonBytes = Encoding.UTF8.GetBytes(json);

                return new FileContentResult(jsonBytes, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("{cnpjcpf}")]
        public IActionResult GetFornecedor(string cnpjcpf)
        {
            var fornecedor = _dbContext.Fornecedores.FirstOrDefault(f => f.CNPJCPF == cnpjcpf);
            if (fornecedor == null)
            {
                return NotFound();
            }
            return Ok(fornecedor);
        }

        [HttpPost]
        public async Task<IActionResult> PostFornecedor(Fornecedor fornecedor)
        {
            if (_dbContext.Fornecedores.Any(f => f.CNPJCPF == fornecedor.CNPJCPF))
            {
                return Conflict("O CNPJ/CPF já está cadastrado.");
            }

            var cepValidationResult = await Utils.FornecedorUtils.ValidateCepAsync(fornecedor.CEP);
            if (!cepValidationResult)
            {
                return BadRequest("CEP inválido.");
            }

            var empresaFornecedor = fornecedor.EmpresaCNPJ.FirstOrDefault();
            var empresa = _dbContext.Empresas.FirstOrDefault(e => e.CNPJ == empresaFornecedor);
            if (empresa != null && await Utils.FornecedorUtils.IsParanaEmpresaAsync(empresa) && !Utils.FornecedorUtils.IsFornecedorMaiorIdade(fornecedor.DataNascimento))
            {
                return BadRequest("Não é permitido cadastrar um fornecedor menor de idade para empresas do Paraná.");
            }
            _dbContext.Fornecedores.Add(fornecedor);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(GetFornecedor), new { cnpjcpf = fornecedor.CNPJCPF }, fornecedor);
        }

        [HttpPut("{cnpjcpf}")]
        public async Task<IActionResult> PutFornecedor(string cnpjcpf, Fornecedor fornecedor)
        {
            if (cnpjcpf != fornecedor.CNPJCPF)
            {
                return BadRequest();
            }

            var existingFornecedor = _dbContext.Fornecedores.FirstOrDefault(f => f.CNPJCPF == cnpjcpf);
            if (existingFornecedor == null)
            {
                return NotFound();
            }

            if (existingFornecedor.CNPJCPF != fornecedor.CNPJCPF && _dbContext.Fornecedores.Any(f => f.CNPJCPF == fornecedor.CNPJCPF))
            {
                return Conflict("O CNPJ/CPF já está cadastrado.");
            }

            var cepValidationResult = await Utils.FornecedorUtils.ValidateCepAsync(fornecedor.CEP);
            if (!cepValidationResult)
            {
                return BadRequest("CEP inválido.");
            }

            var empresaFornecedor = fornecedor.EmpresaCNPJ.FirstOrDefault();
            var empresa = _dbContext.Empresas.FirstOrDefault(e => e.CNPJ == empresaFornecedor);
            var isParanaEmpresa = await Utils.FornecedorUtils.IsParanaEmpresaAsync(empresa);
            var isFornecedorMaiorIdade = Utils.FornecedorUtils.IsFornecedorMaiorIdade(fornecedor.DataNascimento);

            if (empresa != null && isParanaEmpresa && !isFornecedorMaiorIdade)
            {
                return BadRequest("Não é permitido cadastrar um fornecedor menor de idade para empresas do Paraná.");
            }

            _dbContext.Entry(existingFornecedor).CurrentValues.SetValues(fornecedor);
            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{cnpjcpf}")]
        public IActionResult DeleteFornecedor(string cnpjcpf)
        {
            var fornecedor = _dbContext.Fornecedores.FirstOrDefault(f => f.CNPJCPF == cnpjcpf);
            if (fornecedor == null)
            {
                return NotFound();
            }

            _dbContext.Fornecedores.Remove(fornecedor);
            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpGet("fornecedores")]
        public IActionResult GetFornecedoresByNameAndCPF(string nome, string cpfcnpj)
        {
            var fornecedores = _dbContext.Fornecedores.AsQueryable();

            if (!string.IsNullOrEmpty(nome))
            {
                fornecedores = fornecedores.Where(f => f.Nome.Contains(nome));
            }

            if (!string.IsNullOrEmpty(cpfcnpj))
            {
                fornecedores = fornecedores.Where(f => f.CNPJCPF.Contains(cpfcnpj));
            }

            return Ok(fornecedores.ToList());
        }
    }
    
}
